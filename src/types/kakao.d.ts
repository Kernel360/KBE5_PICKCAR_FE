export interface KakaoLatLng {
  getLat(): number
  getLng(): number
}

export interface KakaoMap {
  setCenter(latLng: KakaoLatLng): void
  setLevel(level: number): void
  setBounds(bounds: KakaoLatLngBounds): void
}

export interface KakaoMarker {
  setMap(map: KakaoMap | null): void
  setPosition(position: KakaoLatLng): void
}

export interface KakaoCustomOverlay {
  setMap(map: KakaoMap | null): void
}

export interface KakaoPolyline {
  setMap(map: KakaoMap | null): void
}

export interface KakaoSize {
  width: number
  height: number
}

export interface KakaoPoint {
  x: number
  y: number
}

export interface KakaoMarkerImage {
  src: string
  size: KakaoSize
  options: { offset: KakaoPoint }
}

export interface KakaoLatLngBounds {
  extend(latLng: KakaoLatLng): void
}

export interface KakaoMapOptions {
  center: KakaoLatLng
  level: number
}

export interface KakaoMarkerOptions {
  position: KakaoLatLng
  map?: KakaoMap
  title?: string
  image?: KakaoMarkerImage
}

export interface KakaoPolylineOptions {
  path: KakaoLatLng[]
  strokeWeight: number
  strokeColor: string
  strokeOpacity: number
  strokeStyle: string
}

export interface KakaoCustomOverlayOptions {
  position: KakaoLatLng
  content: string
  yAnchor?: number
}

export interface KakaoMaps {
  load: (callback: () => void) => void
  LatLng: new (lat: number, lng: number) => KakaoLatLng
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker
  Polyline: new (options: KakaoPolylineOptions) => KakaoPolyline
  Size: new (width: number, height: number) => KakaoSize
  Point: new (x: number, y: number) => KakaoPoint
  MarkerImage: new (
    src: string,
    size: KakaoSize,
    options: { offset: KakaoPoint }
  ) => KakaoMarkerImage
  LatLngBounds: new () => KakaoLatLngBounds
  CustomOverlay: new (options: KakaoCustomOverlayOptions) => KakaoCustomOverlay
}

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps
    }
  }
}
