import KakaoMap from '@/components/common/KakaoMap'
import CarFilters from '@/components/tracking/CarFilters'
import CarList from '@/components/tracking/CarList'
import MapControls from '@/components/tracking/MapControls'
import Header from '@/components/common/Header'
import type { Company, Car } from '@/types/tracking'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import LoadingScreen from '@/components/common/LoadingScreen'
import ErrorScreen from '@/components/common/ErrorScreen'
import SideMenuBar from '@/components/common/SideMenuBar'

// 1. 서버(8080)용 인스턴스
const mainApi = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

// 2. 서버(8081)용 인스턴스
const trackingApi = axios.create({
  baseURL: import.meta.env.VITE_TRACKING_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

/**
 * 실시간 차량 관제 페이지 컴포넌트.
 * API와 WebSocket을 통해 동적으로 데이터를 관리
 */
function TrackingCar() {
  // 1. 상태 관리
  const INIT_CENTER = { lat: 37.5665, lng: 126.978 }
  const INIT_ZOOM_LEVEL = 9
  const DETAIL_ZOOM_LEVEL = 5

  // 데이터 관련 상태
  const [companies, setCompanies] = useState<Company[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 사용자 인터랙션 관련 상태
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  )

  // 지도 제어 관련 상태
  const [mapCenter, setMapCenter] = useState(INIT_CENTER)
  const [mapZoom, setMapZoom] = useState(INIT_ZOOM_LEVEL)

  // 2. 데이터 Fetching 로직 (최초 1회 실행)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [companiesResponse, carsResponse] = await Promise.all([
          mainApi.get('/api/v1/companies'),
          mainApi.get('/api/v1/vehicles')
        ])

        const allCompaniesOption: Company = { id: 'all', name: '모든 회사' }
        setCompanies([allCompaniesOption, ...companiesResponse.data.data])
        setCars(carsResponse.data.data || [])
      } catch (err) {
        console.error('초기 데이터 로딩 실패:', err)
        setError('데이터를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  // 3. 실시간 위치 업데이트 WebSocket 로직
  useEffect(() => {
    // 초기 데이터 로딩이 끝나고, 차량 데이터가 있을 때만 웹소켓 연결
    if (isLoading || cars.length === 0) {
      return
    }

    const trackingBaseURL = import.meta.env.VITE_TRACKING_API_URL
    const wsURL = `${trackingBaseURL.replace(/^http/, 'ws')}/connect`
    const ws = new WebSocket(wsURL)

    ws.onopen = () => {
      console.log('WebSocket 서버에 연결되었습니다.')
      trackingApi
        .get('/api/v1/trackingcars')
        .then(response =>
          console.log('스트리밍 시작 요청 결과:', response.data.message)
        )
        .catch(error => console.error('스트리밍 시작 요청 오류:', error))
    }

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) // { id: 'track1.gpx', lat: ..., lon: ... }

      const match = data.id.match(/\d+/)
      if (!match) return console.log('11111')

      const gpxNumber = parseInt(match[0], 10)

      setCars(prevCars =>
        prevCars.map(car =>
          car.vehicleId === gpxNumber
            ? { ...car, lat: data.lat, lng: data.lon } // lon -> lng
            : car
        )
      )
    }

    ws.onclose = () => console.log('WebSocket 연결이 종료되었습니다.')
    ws.onerror = (error: Event) => console.error('WebSocket 오류:', error)

    // 컴포넌트가 사라질 때 웹소켓 연결을 반드시 정리합니다.
    return () => {
      ws.close()
    }
  }, [isLoading, cars.length]) // isLoading과 cars.length를 의존성으로 두어 데이터 로딩 후에 실행되도록 함

  // 4. 데이터 가공 (필터링된 차량, 지도 마커)
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const companyMatch =
        selectedCompany === 'all' || car.companyId === selectedCompany

      const term = searchTerm.toLowerCase()
      const termMatch =
        term === '' ||
        car.licensePlate.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term)

      return companyMatch && termMatch
    })
  }, [cars, selectedCompany, searchTerm, companies])

  const carMarkers = useMemo(() => {
    return filteredCars.map(car => ({
      lat: car.lat,
      lng: car.lng,
      label: car.licensePlate
    }))
  }, [filteredCars])

  // 5. 이벤트 핸들러
  const handleSelectCar = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId)
    const car = cars.find(c => c.vehicleId === vehicleId)
    if (car) {
      setMapCenter({ lat: car.lat, lng: car.lng })
      setMapZoom(DETAIL_ZOOM_LEVEL)
    }
  }

  const handleFilterReset = () => {
    setSelectedCompany('all')
    setSearchTerm('')
    setSelectedVehicleId(null) // [수정]
    setMapCenter(INIT_CENTER)
    setMapZoom(INIT_ZOOM_LEVEL)
  }

  const mapTitle = useMemo(() => {
    const company = companies.find(c => c.id === selectedCompany)
    const companyName = company && company.id !== 'all' ? company.name : '전체'
    return `차량 위치 - ${companyName}`
  }, [selectedCompany, companies])

  if (isLoading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  // 6. 화면 렌더링
  return (
    <>
      <Header />
      <div className="flex min-h-screen gap-6 bg-[#f5f8fa]">
        <SideMenuBar />

        <div className="my-10 flex flex-1 flex-col rounded-2xl bg-[#eaf1fb] p-6 shadow">
          <div className="relative min-h-[300px] flex-1 md:min-h-0">
            <KakaoMap
              center={mapCenter}
              zoom={mapZoom}
              markers={carMarkers}
            />
            <span className="absolute right-4 bottom-2 text-xs text-gray-400">
              {`[${mapTitle} 지도]`}
            </span>
          </div>
        </div>

        <div className="my-10 flex w-full flex-col rounded-2xl bg-white p-6 shadow md:w-96">
          <div className="mb-4 text-lg font-bold">
            운행 중인 차량 ({filteredCars.length})
          </div>
          <CarFilters
            companies={companies}
            selectedCompany={selectedCompany}
            searchTerm={searchTerm}
            onCompanyChange={setSelectedCompany}
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
