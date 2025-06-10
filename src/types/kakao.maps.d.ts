// Kakao Maps API의 타입들을 TypeScript에 알려줍니다.
// 전역적으로 kakao.maps.LatLng 같은 타입을 사용할 수 있게 됩니다.
declare namespace kakao {
  namespace maps {
    export class LatLng {
      constructor(lat: number, lng: number)
      getLat(): number
      getLng(): number
    }

    export interface MapOptions {
      center: LatLng
      level: number
    }

    export class Map {
      constructor(container: HTMLElement, options: MapOptions)
      getCenter(): LatLng
      setCenter(latlng: LatLng): void
      setLevel(level: number): void
    }

    export interface MarkerOptions {
      position: LatLng
      map?: Map
      title?: string
    }

    export class Marker {
      constructor(options: MarkerOptions)
      setMap(map: Map | null): void
    }

    export interface CustomOverlayOptions {
      position: LatLng
      content: HTMLElement | string
      yAnchor?: number
    }

    export class CustomOverlay {
      constructor(options: CustomOverlayOptions)
      setMap(map: Map | null): void
    }

    export class Polyline {
      constructor(options: PolylineOptions)
      setMap(map: Map | null): void
    }

    export class LatLngBounds {
      constructor()
      extend(latlng: LatLng): void
    }

    // kakao.maps.load 함수 타입 정의 (컴포넌트에서 사용되므로 추가)
    export function load(callback: () => void): void
  }
}

// 전역 Window 인터페이스를 확장하여 kakao 객체와 그 하위 maps API의 타입을 명시합니다.
// 이 d.ts 파일에 함께 두어 Kakao Maps 관련 전역 타입을 한 곳에서 관리합니다.
declare global {
  interface Window {
    kakao?: {
      // kakao 객체는 외부 스크립트에 의해 로드되므로 옵셔널로 선언
      maps: {
        // kakao.maps 네임스페이스에 정의된 클래스들의 생성자를 참조
        LatLng: typeof kakao.maps.LatLng
        Map: typeof kakao.maps.Map
        Marker: typeof kakao.maps.Marker
        CustomOverlay: typeof kakao.maps.CustomOverlay
        Polyline: typeof kakao.maps.Polyline
        LatLngBounds: typeof kakao.maps.LatLngBounds
        // kakao.maps.load 함수 참조
        load: typeof kakao.maps.load
      }
    }
  }
}

// 이 파일이 모듈로 취급되도록 export {}를 추가합니다.
// 전역 타입 선언(declare global)이 올바르게 적용되도록 하는 데 도움이 됩니다.
export {}
