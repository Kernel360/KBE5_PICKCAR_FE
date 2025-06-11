import { useEffect, useRef } from 'react'

// 컴포넌트가 받을 props의 타입을 정의
interface KakaoMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: { lat: number; lng: number; label: string }[]
  polylinePath?: { lat: number; lng: number }[]
}

/**
 * 카카오맵과 마커, Polyline을 렌더링하는 범용적인 지도 컴포넌트.
 */
function KakaoMap({ center, zoom, markers, polylinePath }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // window.kakao와 load 함수, 그리고 지도를 그릴 div가 준비되었는지 확인
    if (!mapRef.current || !window.kakao?.maps?.load) {
      return
    }

    // kakao.maps.load를 사용하여 라이브러리가 완전히 로드된 후 지도 관련 로직 실행
    window.kakao.maps.load(() => {
      const mapContainer = mapRef.current
      if (!mapContainer || !window.kakao?.maps) return

      const kakaoMaps = window.kakao.maps

      // 1. 지도 생성
      const mapOptions = {
        center: new kakaoMaps.LatLng(
          center?.lat || 37.5665,
          center?.lng || 126.978
        ),
        level: zoom || 9
      }
      const map = new kakaoMaps.Map(mapContainer, mapOptions)

      // 2. 마커 표시 로직
      if (markers && markers.length > 0) {
        markers.forEach(markerInfo => {
          new kakaoMaps.Marker({
            position: new kakaoMaps.LatLng(markerInfo.lat, markerInfo.lng),
            map: map,
            title: markerInfo.label
          })
        })
      }

      // 3. Polyline(선) 표시 로직
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

        // Todo : 이미지 파일로
        // 마커 이미지 URL 정의
        const startMarkerSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png'
        const endMarkerSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png'
        const imageSize = new kakaoMaps.Size(20, 34)
        const imageOption = { offset: new kakaoMaps.Point(10, 34) }

        // [추가] 출발 지점과 도착 지점 좌표 추출
        const startPoint = linePath[0]
        const endPoint = linePath[linePath.length - 1]

        // [추가] 출발/도착 마커 이미지 생성
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

        // [추가] 출발 마커 생성 및 표시
        new kakaoMaps.Marker({
          map: map,
          position: startPoint,
          image: startMarkerImage,
          title: '출발'
        })

        // [추가] 도착 마커 생성 및 표시
        new kakaoMaps.Marker({
          map: map,
          position: endPoint,
          image: endMarkerImage,
          title: '도착'
        })

        // Polyline이 있을 경우, 지도가 해당 경로를 모두 포함하도록
        // 경계(bounds)를 조정하여 자동으로 중심과 줌 레벨을 맞춤
        const bounds = new kakaoMaps.LatLngBounds()
        linePath.forEach(point => bounds.extend(point))
        map.setBounds(bounds)
      }
    })
  }, [center, zoom, markers, polylinePath]) // props가 변경될 때마다 이 effect를 다시 실행

  // 지도를 렌더링할 div
  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default KakaoMap
