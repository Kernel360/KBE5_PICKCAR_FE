import React, { useEffect, useRef, useState } from 'react'

interface KakaoMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: { lat: number; lng: number; label: string }[]
  polylinePath?: { lat: number; lng: number }[]
}

/**
 * 카카오맵과 오버레이를 렌더링하는 범용 지도 컴포넌트.
 */
function KakaoMap({ center, zoom, markers, polylinePath }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null) // 지도 인스턴스를 state로 관리
  const overlaysRef = useRef<any[]>([]) // 마커, 폴리라인 등 오버레이를 저장할 ref

  // 1: 지도 인스턴스 생성 (최초 한 번만 실행)
  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps?.load) return

    window.kakao.maps.load(() => {
      const mapContainer = mapRef.current
      if (!mapContainer) return

      const kakaoMaps = window.kakao.maps
      const mapOptions = {
        center: new kakaoMaps.LatLng(37.5665, 126.978),
        level: 9
      }
      const newMap = new kakaoMaps.Map(mapContainer, mapOptions)
      setMap(newMap)
    })
  }, []) // 의존성 배열이 비어있어 최초 1회만 실행

  // 2: 지도 중심과 줌 레벨 제어 (center, zoom prop이 명시적으로 바뀔 때만 실행)
  useEffect(() => {
    if (!map || !center || !zoom) return

    const newCenter = new window.kakao.maps.LatLng(center.lat, center.lng)
    map.setCenter(newCenter)
    map.setLevel(zoom)
  }, [map, center, zoom])

  // 3: 마커와 Polyline 등 오버레이 제어 (markers, polylinePath prop이 바뀔 때만 실행)
  useEffect(() => {
    if (!map) return

    const kakaoMaps = window.kakao.maps

    // --- 1. 기존 오버레이 모두 제거 (클린업) ---
    overlaysRef.current.forEach(overlay => overlay.setMap(null))
    overlaysRef.current = []

    const newOverlays: any[] = []

    // --- 2. 새로운 마커 생성 ---
    if (markers && markers.length > 0) {
      markers.forEach(markerInfo => {
        const marker = new kakaoMaps.Marker({
          position: new kakaoMaps.LatLng(markerInfo.lat, markerInfo.lng),
          map: map,
          title: markerInfo.label
        })
        newOverlays.push(marker)
      })
    }

    // --- 3. 새로운 Polyline 및 출발/도착 마커 생성 ---
    if (polylinePath && polylinePath.length > 0) {
      const linePath = polylinePath.map(
        pos => new kakaoMaps.LatLng(pos.lat, pos.lng)
      )

      const polyline = new kakaoMaps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      })
      polyline.setMap(map)
      newOverlays.push(polyline)

      // 출발/도착 마커 로직... (이전 코드와 동일)
      const startMarkerSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png'
      const endMarkerSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png'
      const imageSize = new kakaoMaps.Size(20, 34)
      const imageOption = { offset: new kakaoMaps.Point(10, 34) }
      const startMarkerImage = new kakaoMaps.MarkerImage(
        startMarkerSrc,
        imageSize,
        imageOption
      )
      const endMarkerImage = new kakaoMaps.MarkerImage(
        endMarkerSrc,
        imageSize,
        imageOption
      )

      const startMarker = new kakaoMaps.Marker({
        map,
        position: linePath[0],
        image: startMarkerImage,
        title: '출발'
      })
      const endMarker = new kakaoMaps.Marker({
        map,
        position: linePath[linePath.length - 1],
        image: endMarkerImage,
        title: '도착'
      })
      newOverlays.push(startMarker, endMarker)

      // 부모가 zoom을 직접 제어하고 있지 않을 때만 자동 경계 조절 실행
      if (!zoom) {
        const bounds = new kakaoMaps.LatLngBounds()
        linePath.forEach(point => bounds.extend(point))
        map.setBounds(bounds)
      }
    }

    // 새로 그린 오버레이들을 ref에 저장
    overlaysRef.current = newOverlays
  }, [map, markers, polylinePath])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default KakaoMap
