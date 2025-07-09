import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import KakaoMap from '@/components/common/KakaoMap'
import CarFilters from '@/components/tracking/CarFilters'
import CarList from '@/components/tracking/CarList'
import Header from '@/components/common/Header'
import LoadingScreen from '@/components/common/LoadingScreen'
import ErrorScreen from '@/components/common/ErrorScreen'
import SideMenuBar from '@/components/common/SideMenuBar'
import type { Car } from '@/types/tracking'

const trackingApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

function TrackingCar() {
  const INIT_CENTER = { lat: 37.5665, lng: 126.978 }
  const INIT_ZOOM_LEVEL = 9
  const DETAIL_ZOOM_LEVEL = 5

  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPathLoading, setIsPathLoading] = useState(false); // 경로 수신 전까지 blur 표시
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null)

  const [mapCenter, setMapCenter] = useState(INIT_CENTER)
  const [mapZoom, setMapZoom] = useState(INIT_ZOOM_LEVEL)
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([])

  // 초기 차량 목록 불러오기
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('/api/v1/reservation/vehicles/assignment-completed')
        setCars(res.data.data || [])
      } catch (e) {
        console.error(e)
        setError('차량 목록을 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCars()
  }, [])

  // SSE 연결 및 경로/위치 처리
  useEffect(() => {
    if (!selectedVehicleId || isLoading || cars.length === 0) return

    const sseURL = `${import.meta.env.VITE_SSE_API_URL}/api/v1/sse/connect?vehicleId=${selectedVehicleId}`
    const eventSource = new EventSource(sseURL)

    console.log(`[SSE 연결됨] vehicleId=${selectedVehicleId}`)

    eventSource.addEventListener('vehicle-cycle', (event) => {
      const data = JSON.parse(event.data)
      console.log('[SSE 수신]', data)
    
      const infos = data.cycle_infos
      if (!Array.isArray(infos)) return
    
      const newPoints = infos
        .map((info) => {
          if (
            typeof info.latitude !== 'number' &&
            typeof info.latitude !== 'string'
          ) return null
          if (
            typeof info.longitude !== 'number' &&
            typeof info.longitude !== 'string'
          ) return null
    
          const lat = parseFloat(info.latitude)
          console.log('[info.latitude 수신]', info.latitude)
          console.log('[info.latitude.parseFloat 수신]', lat)
          const lng = parseFloat(info.longitude)
    
          return isNaN(lat) || isNaN(lng) ? null : { lat, lng }
        })
        .filter((p): p is { lat: number; lng: number } => p !== null)
    
      if (newPoints.length === 0) return
    
      setPath((prev) => {
        const updated = [...prev, ...newPoints];
        // 마지막 좌표로 지도 중심 이동
        if (updated.length > 0) {
          const last = updated[updated.length - 1];
          setMapCenter({ lat: last.lat, lng: last.lng });
        }

        setIsPathLoading(false); // ← 데이터 수신되면 blur 해제
        return updated;
      });
    
      const last = newPoints[newPoints.length - 1]
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.vehicleId === selectedVehicleId
            ? { ...car, lat: last.lat, lng: last.lng }
            : car
        )
      )
    })
    

    eventSource.onerror = (err) => {
      console.error('[SSE 오류]', err)
      eventSource.close()
    }

    return () => {
      console.log(`[SSE 종료] vehicleId=${selectedVehicleId}`)
      eventSource.close()
      fetch(`${import.meta.env.VITE_SSE_API_URL}/api/v1/sse/disconnect?vehicleId=${selectedVehicleId}`, {
        method: 'DELETE'
      }).catch(err => console.warn('disconnect 실패:', err.message))

      setPath([]) // 지도 경로 초기화
    }
  }, [selectedVehicleId, isLoading, cars.length])

  const filteredCars = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return cars.filter(car =>
      car.licensePlate.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term)
    )
  }, [cars, searchTerm])

  const carMarkers = useMemo(() => {
    return filteredCars.map(car => ({
      lat: car.lat,
      lng: car.lng,
      label: car.licensePlate
    }))
  }, [filteredCars])

  const handleSelectCar = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
    setIsPathLoading(true); // ← 선택하면 먼저 로딩 상태로

    const car = cars.find(c => c.vehicleId === vehicleId);
    if (car && typeof car.lat === 'number' && typeof car.lng === 'number') {
      setMapCenter({ lat: car.lat, lng: car.lng });
      setMapZoom(DETAIL_ZOOM_LEVEL);
      // 실제 경로가 있다면 setPath(실제경로)로 대체
    } else {
      // lat/lng이 없으면 경로 초기화
      setPath([]);
      setMapZoom(DETAIL_ZOOM_LEVEL);
      // setMapCenter는 필요하다면 기본값으로
      setMapCenter(INIT_CENTER);
      // 이후 SSE에서 데이터가 오면 setPath가 자동으로 실행됨
    }
  };

  if (isLoading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  return (
    <>
      <Header />
      <div className="flex min-h-screen gap-6 bg-[#f5f8fa]">
        <SideMenuBar />
        <div className="my-10 flex flex-1 flex-col rounded-2xl bg-[#eaf1fb] p-6 shadow">
          <h1 className="mb-5 text-xl font-bold">실시간 관제</h1>
          <div className="relative flex-1 md:min-h-0">
            <div
              className="w-full h-full transition-all duration-300"
              style={{ filter: !selectedVehicleId || isPathLoading ? 'blur(4px)' : 'none' }}
            >
              <KakaoMap
                center={mapCenter}
                zoom={mapZoom}
                markers={carMarkers}
                polylinePath={path}
              />
            </div>
            {/* 오버레이 메시지 */}
            {!selectedVehicleId && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-xl font-bold text-gray-700">
                할당된 차량을 선택하세요
              </div>
            )}

            {selectedVehicleId && isPathLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-xl font-bold text-gray-700">
                현재 불러오고 있습니다...
              </div>
            )}
            <span className="absolute right-4 bottom-2 text-xs text-gray-400">
              [실시간 관제 지도]
            </span>
          </div>
        </div>
        <div className="my-10 flex w-96 flex-col rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 text-lg font-bold">
            할당된 차량 리스트 ({filteredCars.length})
            {/* 추후 '운행 중인 차량'으로 변경 예정 */}
          </div>
          <CarFilters
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
          <CarList
            cars={filteredCars}
            selectedVehicleId={selectedVehicleId}
            onSelectCar={handleSelectCar}
          />
        </div>
      </div>
    </>
  )
}

export default TrackingCar