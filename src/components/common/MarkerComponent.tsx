import React, { useEffect, useRef } from 'react'

interface MarkerComponentProps {
  map: kakao.maps.Map
  lat: number
  lng: number
  label: string
}

function MarkerComponent({ map, lat, lng, label }: MarkerComponentProps): null {
  // 마커와 커스텀 오버레이 인스턴스를 ref로 관리
  const markerRef = useRef<kakao.maps.Marker | null>(null)
  const customOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null)

  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error('지도 아직 안뜸')
      return
    }
    const kakaoMaps = window.kakao.maps
    const position = new kakaoMaps.LatLng(lat, lng)

    // 이전에 생성된 마커와 오버레이가 있다면 지도에서 제거 (업데이트 시)
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    if (customOverlayRef.current) {
      customOverlayRef.current.setMap(null)
    }

    // 새로운 마커를 생성하고 지도에 추가
    const newMarker = new kakaoMaps.Marker({
      position: position
    })
    newMarker.setMap(map)
    markerRef.current = newMarker

    // 차량 번호를 표시할 커스텀 오버레이를 생성하고 지도에 추가
    const newCustomOverlay = new kakaoMaps.CustomOverlay({
      position: position,
      content: `<div style="padding:5px;background-color:rgba(255,255,255,0.9);border:1px solid #888;border-radius:3px;font-size:12px;font-weight:bold;color:#333;box-shadow: 0px 1px 3px rgba(0,0,0,0.2);">${label}</div>`,
      yAnchor: 2.3
    })
    newCustomOverlay.setMap(map)
    customOverlayRef.current = newCustomOverlay

    // 컴포넌트가 언마운트되거나 props (위치, 라벨 등)가 변경되기 전에 cleanup 함수를 실행
    return () => {
      if (newMarker) {
        newMarker.setMap(null)
      }
      if (newCustomOverlay) {
        newCustomOverlay.setMap(null)
      }
    }
  }, [map, lat, lng, label]) // map, lat, lng, label이 변경될 때마다 다시 실행

  return null
}

export default MarkerComponent
