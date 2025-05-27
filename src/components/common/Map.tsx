import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    kakao: any // todo : src/custom.d.ts or npm library 사용하기
  }
}

function Map() {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapContainerRef.current) {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3
        }
        new window.kakao.maps.Map(mapContainerRef.current, mapOption)
      })
    } else {
      console.error(
        'Kakao Maps API 스크립트가 로드되지 않았거나, 지도 컨테이너를 찾을 수 없습니다.'
      )
    }
  }, [])
  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{ width: '500px', height: '400px' }}></div>
  )
}

export default Map
