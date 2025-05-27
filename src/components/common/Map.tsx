import { useEffect, useRef, useState } from 'react'

interface Window {
  kakao: any
}

interface MapProps {
  center?: { lat: number; lng: number }
  level?: number
}

function Map({ center = { lat: 37.5665, lng: 126.978 }, level = 7 }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkKakao = () => {
      if (window.kakao && window.kakao.maps) {
        setIsLoaded(true)
      } else {
        setTimeout(checkKakao, 100)
      }
    }
    checkKakao()
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    window.kakao.maps.load(() => {
      const mapCenter = new window.kakao.maps.LatLng(center.lat, center.lng)
      new window.kakao.maps.Map(mapRef.current, {
        center: mapCenter,
        level
      })
    })
  }, [isLoaded, center, level])
  return (
    <div
      ref={mapRef}
      className="h-[500px] w-[500px] rounded-xl"
    />
  )
}

export default Map
