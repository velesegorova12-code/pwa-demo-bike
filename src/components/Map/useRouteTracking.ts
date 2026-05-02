import turfDistance from '@turf/distance'
import { point } from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import type { FeatureCollection, LineString } from 'geojson'
import { useEffect, useRef, useState } from 'react'

import { notifyError } from '../../lib/notify'

type Position = { latitude: number; longitude: number }

const SNAP_LEASH_METERS = 30
const OFF_ROUTE_METERS = 50
const OFF_ROUTE_SECONDS = 10
const ARRIVAL_RADIUS_METERS = 20

export type RouteTrackingState = {
  displayPosition: Position | null
  distanceFromRoute: number | null
  isOffRoute: boolean
  shouldReroute: boolean
  hasArrived: boolean
}

function extractLineString(route: FeatureCollection): LineString | null {
  for (const feature of route.features) {
    if (feature.geometry.type === 'LineString') {
      return feature.geometry as LineString
    }
  }
  return null
}

export function useRouteTracking(
  rawPosition: Position | null,
  route: FeatureCollection | null,
  immediateReroute = false,
): RouteTrackingState {
  const [displayPosition, setDisplayPosition] = useState<Position | null>(null)
  const [distanceFromRoute, setDistanceFromRoute] = useState<number | null>(null)
  const [isOffRoute, setIsOffRoute] = useState(false)
  const [shouldReroute, setShouldReroute] = useState(false)

  const offRouteStartRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [hasArrived, setHasArrived] = useState(false)

  useEffect(() => {
    if (!rawPosition) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayPosition(null)
      setDistanceFromRoute(null)
      setIsOffRoute(false)
      setShouldReroute(false)
      offRouteStartRef.current = null
      return
    }

    if (!route) {
      setDisplayPosition(rawPosition)
      setDistanceFromRoute(null)
      setIsOffRoute(false)
      setShouldReroute(false)
      offRouteStartRef.current = null
      return
    }

    const line = extractLineString(route)
    if (!line) {
      setDisplayPosition(rawPosition)
      setDistanceFromRoute(null)
      return
    }

    const gpsPoint = point([rawPosition.longitude, rawPosition.latitude])
    const snapped = nearestPointOnLine(line, gpsPoint, { units: 'meters' })
    const dist = snapped.properties.dist ?? 0

    setDistanceFromRoute(dist)

    if (!hasArrivedRef.current) {
      const destCoords = line.coordinates[line.coordinates.length - 1]
      const destPoint = point(destCoords)
      const distToDest = turfDistance(gpsPoint, destPoint, { units: 'meters' })
      if (distToDest <= ARRIVAL_RADIUS_METERS) {
        setHasArrived(true)
      }
    }

    if (dist < SNAP_LEASH_METERS) {
      const [lng, lat] = snapped.geometry.coordinates
      setDisplayPosition({ latitude: lat, longitude: lng })
      setIsOffRoute(false)
      setShouldReroute(false)
      offRouteStartRef.current = null
    } else {
      setDisplayPosition(rawPosition)

      if (dist >= OFF_ROUTE_METERS) {
        setIsOffRoute(true)
        if (immediateReroute) {
          setShouldReroute(true)
        } else if (offRouteStartRef.current === null) {
          offRouteStartRef.current = Date.now()
        } else if (Date.now() - offRouteStartRef.current >= OFF_ROUTE_SECONDS * 1000) {
          setShouldReroute(true)
        }
      } else {
        setIsOffRoute(false)
        offRouteStartRef.current = null
      }
    }
  }, [rawPosition, route, immediateReroute])

  useEffect(() => {
    if (!isOffRoute || shouldReroute) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      if (
        offRouteStartRef.current &&
        Date.now() - offRouteStartRef.current >= OFF_ROUTE_SECONDS * 1000
      ) {
        setShouldReroute(true)
      }
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isOffRoute, shouldReroute])

  useEffect(() => {
    if (isOffRoute && !shouldReroute) {
      notifyError('off_course')
    }
    if (shouldReroute) {
      notifyError('rerouting')
    }
  }, [isOffRoute, shouldReroute])

  return { displayPosition, distanceFromRoute, isOffRoute, shouldReroute, hasArrived }
}
