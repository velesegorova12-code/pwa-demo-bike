import distance from '@turf/distance'
import { point } from '@turf/helpers'
import { useRef, useMemo, useEffect, useState } from 'react'

export interface Position {
  latitude: number
  longitude: number
}

export interface RouteTrackingState {
  displayPosition: Position | null
  isOffRoute: boolean
  shouldReroute: boolean
  hasArrived: boolean
}

const ARRIVAL_RADIUS_METERS = 20

export const useRouteTracking = (
  position: Position | null,
  route: unknown,
  isNavigating: boolean,
): RouteTrackingState => {
  const hasArrivedRef = useRef(false)
  const [hasArrived, setHasArrived] = useState(false)

  const coords = useMemo(() => {
    const r = route as { geometry?: { type?: string; coordinates?: unknown[] } } | null
    if (r?.geometry?.type === 'LineString') {
      return r.geometry.coordinates as number[][]
    }
    return []
  }, [route])

  const destination = coords.length > 0 ? coords[coords.length - 1] : null

  useEffect(() => {
    if (!isNavigating || !position || !destination || hasArrivedRef.current) return
    try {
      const from = point([position.longitude, position.latitude])
      const to = point(destination)
      const dist = distance(from, to, { units: 'meters' })
      if (dist <= ARRIVAL_RADIUS_METERS) {
        hasArrivedRef.current = true
        setTimeout(() => setHasArrived(true), 0)
      }
    } catch {
      // Silently catch calculation errors
    }
  }, [isNavigating, position, destination])

  return {
    displayPosition: position,
    isOffRoute: false,
    shouldReroute: false,
    hasArrived,
  }
}
