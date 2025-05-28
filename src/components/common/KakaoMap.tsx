// KakaoMap.tsx
import React, { useEffect, useRef } from 'react' // React 임포트 추가

interface KakaoMapProps {
  center: { lat: number; lng: number }
  zoom: number // Kakao Map에서는 'level'로 사용됨
  markers?: { lat: number; lng: number; label?: string }[]
}

function KakaoMap({ center, zoom, markers }: KakaoMapProps) {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<kakao.maps.Map | null>(null)

  useEffect(() => {
    const initializeMap = () => {
      // 함수 이름 변경 (loadKakaoMap -> initializeMap)
      if (!mapElement.current) {
        console.error('mapElement ref가 현재 유효하지 않습니다.')
        return
      }

      // kakao.maps 네임스페이스와 주요 생성자들이 로드되었는지 확인
      if (
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.LatLng &&
        window.kakao.maps.Map
      ) {
        const kakaoMaps = window.kakao.maps

        const mapCenter = new kakaoMaps.LatLng(center.lat, center.lng)
        console.log(center.lat, center.lng)
        const mapOptions: kakao.maps.MapOptions = {
          center: mapCenter,
          level: zoom
        }

        try {
          // 이전 지도 인스턴스가 있다면 파괴 (props 변경으로 인한 재생성 시)
          // 이 부분은 복잡도에 따라 선택적으로 구현할 수 있습니다.
          // 간단한 마커 표시는 매번 새로 생성해도 무방할 수 있습니다.
          // if (mapInstance.current) { /* mapInstance.current.destroy(); */ }

          const newMap = new kakaoMaps.Map(mapElement.current, mapOptions)
          mapInstance.current = newMap
          console.log('Kakao Map instance created:', newMap)

          // 마커 추가
          if (markers && newMap) {
            markers.forEach(markerInfo => {
              const position = new kakaoMaps.LatLng(
                markerInfo.lat,
                markerInfo.lng
              )

              // 마커 생성 (지도에 바로 추가)
              new kakaoMaps.Marker({
                position: position,
                map: newMap
              })

              // 라벨이 있는 경우 커스텀 오버레이로 표시
              if (markerInfo.label) {
                const customOverlay = new kakaoMaps.CustomOverlay({
                  position: position,
                  content: `<div style="padding:5px;background-color:#fff;border:1px solid #ccc;border-radius:3px;font-size:12px;">${markerInfo.label}</div>`,
                  yAnchor: 2.3
                })
                customOverlay.setMap(newMap)
              }
            })
          }
        } catch (error) {
          console.error(
            'Kakao Map 인스턴스 생성 또는 마커 추가 중 오류:',
            error
          )
        }
      } else {
        console.error(
          '카카오 지도 API의 `maps` 객체 또는 주요 생성자를 찾을 수 없습니다.'
        )
      }
    }

    // Kakao Maps SDK 로드 및 초기화 로직
    const scriptId = 'kakao-map-script'
    const kakaoScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null
    let scriptLoadHandler: (() => void) | null = null

    if (
      window.kakao &&
      window.kakao.maps &&
      typeof window.kakao.maps.load === 'function'
    ) {
      // API가 이미 로드되어 있고, kakao.maps.load 함수가 사용 가능하면 바로 사용
      console.log('Using kakao.maps.load() for initialization.')
      window.kakao.maps.load(initializeMap)
    } else if (kakaoScript) {
      // 스크립트 태그는 있지만 아직 API가 준비되지 않은 경우, load 이벤트를 기다림
      console.log('Kakao script tag found, waiting for it to load...')
      scriptLoadHandler = () => {
        console.log('Kakao script has loaded via event listener.')
        if (
          window.kakao &&
          window.kakao.maps &&
          typeof window.kakao.maps.load === 'function'
        ) {
          window.kakao.maps.load(initializeMap)
        } else if (window.kakao && window.kakao.maps) {
          // kakao.maps.load가 없는 경우 대비
          initializeMap()
        } else {
          console.error(
            '스크립트 로드 후에도 kakao.maps API를 사용할 수 없습니다.'
          )
        }
      }
      kakaoScript.addEventListener('load', scriptLoadHandler)
    } else {
      console.error(
        `ID가 '${scriptId}'인 카카오 지도 스크립트 태그를 찾을 수 없습니다. HTML을 확인해주세요.`
      )
    }

    // useEffect의 cleanup 함수
    return () => {
      if (kakaoScript && scriptLoadHandler) {
        console.log('Removing Kakao script load event listener.')
        kakaoScript.removeEventListener('load', scriptLoadHandler)
      }
    }
  }, [center, zoom, markers])

  return (
    <div
      ref={mapElement}
      className="h-full w-full"
    />
  )
}

export default KakaoMap
