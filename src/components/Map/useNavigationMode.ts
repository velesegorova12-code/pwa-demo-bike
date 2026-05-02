/**
 * Navigation mode hook — manages the "Active ride" state and map view following.
 */
import bbox from '@turf/bbox'
import type { FeatureCollection } from 'geojson'
import { useCallback, useEffect, useState } from 'react'
import type { MapRef } from 'react-map-gl/maplibre'

type Position = { latitude: number; longitude: number }

const NAVIGATION_ZOOM = 16
const NAVIGATION_PITCH = 20
const EASE_DURATION_MS = 1000
const ROUTE_BOUNDS_PADDING = 60

function getNavigationPadding(mapRef: React.RefObject<MapRef | null>) {
  const container = mapRef.current?.getContainer()
  const height = container?.clientHeight ?? 700
  const arrowYFromTop = height - 150 - 30
  const offset = arrowYFromTop - height / 2
  return { top: Math.round(offset * 2), bottom: 0, left: 0, right: 20 }
}

export type NavigationModeState = {
  isNavigating: boolean
  autoFollow: boolean
  startRide: () => void
  stopRide: () => void
  recenter: () => void
  handleUserInteraction: () => void
  showRouteOverview: () => void
}

export function useNavigationMode(
  mapRef: React.RefObject<MapRef | null>,
  position: Position | null,
  heading: number | null,
  route: FeatureCollection | null,
): NavigationModeState {
  const [isNavigating, setIsNavigating] = useState(false)
  const [autoFollow, setAutoFollow] = useState(false)

  const zoomToFullRoute = useCallback(
    (withPanels: boolean) => {
      if (!mapRef.current) return

      mapRef.current.easeTo({
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        duration: 300,
      })

      if (route) {
        const fitPadding = withPanels
          ? { top: 160, bottom: 200, left: 40, right: 40 }
          : ROUTE_BOUNDS_PADDING
        const [minLng, minLat, maxLng, maxLat] = bbox(route)
        setTimeout(() => {
          mapRef.current?.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            { padding: fitPadding, duration: 500 },
          )
        }, 350)
      }
    },
    [mapRef, route],
  )

  const startRide = useCallback(() => {
    setIsNavigating(true)
    setAutoFollow(true)
    window.history.pushState({ activeRide: true }, '')
  }, [])

  const stopRide = useCallback(() => {
    setIsNavigating(false)
    setAutoFollow(false)

    if (mapRef.current) {
      mapRef.current.easeTo({
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        duration: 300,
      })
    }
  }, [mapRef])

  const recenter = useCallback(() => {
    setAutoFollow(true)
  }, [])

  const handleUserInteraction = useCallback(() => {
    setAutoFollow(false)
  }, [])

  const showRouteOverview = useCallback(() => {
    setAutoFollow(false)
    zoomToFullRoute(true)
  }, [zoomToFullRoute])

  useEffect(() => {
    if (!isNavigating || !autoFollow || !position || !mapRef.current) return

    mapRef.current.easeTo({
      center: [position.longitude, position.latitude],
      bearing: heading ?? 0,
      zoom: NAVIGATION_ZOOM,
      pitch: NAVIGATION_PITCH,
      padding: getNavigationPadding(mapRef),
      duration: EASE_DURATION_MS,
    })
  }, [isNavigating, autoFollow, position, heading, mapRef])

  useEffect(() => {
    if (!isNavigating) return

    const onPopState = () => {
      setIsNavigating(false)
      setAutoFollow(false)
      if (mapRef.current) {
        mapRef.current.easeTo({
          pitch: 0,
          bearing: 0,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          duration: 300,
        })
      }
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [isNavigating, mapRef])

  return {
    isNavigating,
    autoFollow,
    startRide,
    stopRide,
    recenter,
    handleUserInteraction,
    showRouteOverview,
  }
}
