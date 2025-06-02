import React, { useEffect, useRef, useState } from 'react'
import MarkerComponent from './MarkerComponent'

interface KakaoMapProps {
  center: { lat: number; lng: number }
  zoom: number
  markers?: { lat: number; lng: number; label: string }[]
}

function KakaoMap({ center, zoom, markers }: KakaoMapProps) {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<kakao.maps.Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false) // 지도 준비 완료 상태

  useEffect(() => {
    const initializeOrUpdateMap = () => {
      if (!mapElement.current) {
        console.error('mapElement ref가 현재 유효하지 않음.')
        return
      }

      if (
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.LatLng &&
        window.kakao.maps.Map
      ) {
        const kakaoMaps = window.kakao.maps
        const mapCenter = new kakaoMaps.LatLng(center.lat, center.lng)

        if (!mapInstance.current) {
          const mapOptions: kakao.maps.MapOptions = {
            center: mapCenter,
            level: zoom
          }
          try {
            const newMap = new kakaoMaps.Map(mapElement.current, mapOptions)
            mapInstance.current = newMap
            setIsMapReady(true) // 지도 인스턴스 생성 후 상태 업데이트!
            console.log('Kakao Map instance created:', newMap)
          } catch (error) {
            console.error('Kakao Map 인스턴스 생성 중 오류:', error)
            setIsMapReady(false) // 오류 발생 시 false로 설정 (선택적)
          }
        } else {
          // 이미 인스턴스가 있으면 중심과 줌 레벨만 업데이트
          mapInstance.current.setCenter(mapCenter)
          mapInstance.current.setLevel(zoom)
          if (!isMapReady) setIsMapReady(true) // 혹시 모를 경우 대비
        }
      } else {
        console.error('카카오 지도 API의 객체 없음.')
        setIsMapReady(false) // API 접근 불가 시 false로 설정 (선택적)
      }
    }

    // Kakao Maps SDK 로드 로직은 동일하게 유지
    const scriptId = 'kakao-map-script'
    const kakaoScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null
    console.log('-----')
    console.log(kakaoScript)
    let scriptLoadHandler: (() => void) | null = null

    if (
      window.kakao &&
      window.kakao.maps &&
      typeof window.kakao.maps.load === 'function'
    ) {
      window.kakao.maps.load(initializeOrUpdateMap)
    } else if (kakaoScript) {
      scriptLoadHandler = () => {
        if (
          window.kakao &&
          window.kakao.maps &&
          typeof window.kakao.maps.load === 'function'
        ) {
          window.kakao.maps.load(initializeOrUpdateMap)
        } else if (window.kakao && window.kakao.maps) {
          initializeOrUpdateMap()
        } else {
          console.error('스크립트 로드 후에도 kakao.maps API를 사용할 수 없음.')
          setIsMapReady(false)
        }
      }
      console.log(scriptLoadHandler)
      kakaoScript.addEventListener('load', scriptLoadHandler)
    } else {
      console.error(
        `ID가 '${scriptId}'인 카카오 지도 스크립트 태그를 찾을 수 없습니다. HTML을 확인해주세요.`
      )
      setIsMapReady(false)
    }

    return () => {
      if (kakaoScript && scriptLoadHandler) {
        kakaoScript.removeEventListener('load', scriptLoadHandler)
      }
    }
  }, [center, zoom])

  return (
    <div
      ref={mapElement}
      className="h-full w-full">
      {/* isMapReady 상태와 mapInstance.current가 모두 유효할 때만 마커를 렌더링 */}
      {isMapReady &&
        mapInstance.current &&
        markers &&
        markers.map(
          (
            markerInfo // index는 key가 label로 고유하면 불필요
          ) => (
            <MarkerComponent
              key={markerInfo.label} // 차량 번호가 고유하다고 가정
              map={mapInstance.current!}
              lat={markerInfo.lat}
              lng={markerInfo.lng}
              label={markerInfo.label}
            />
          )
        )}
    </div>
  )
}

export default KakaoMap
