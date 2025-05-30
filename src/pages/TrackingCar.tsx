import KakaoMap from '@/components/common/KakaoMap'
import CarFilters from '@/components/tracking/CarFilters'
import CarList from '@/components/tracking/CarList'
import MapControls from '@/components/tracking/MapControls'
import type { Company, Car } from '@/types/tracking'
import { useEffect, useMemo, useState } from 'react'

/**
 * 1. 상태 관리: 차량 전체 목록 데이터(initialCars), 회사 목록 데이터(initialCompanies), 현재 선택된 필터 값(selectedCompany, searchTerm),
 * 현재 선택된 차량 번호(selectedCarNumber), 지도의 중심 좌표(mapCenter) 및 줌 레벨(mapZoom) 등의 상태를 useState로 관리
 * 2. 데이터 처리/가공: selectedCompany와 searchTerm 상태에 따라 initialCars를 필터링하여 filteredCars 배열을 만듬
 * 이 filteredCars를 바탕으로 KakaoMap에 전달할 carMarkers 데이터를 생성(useMemo를 사용해 최적화).
 * 3. 이벤트 핸들러 구현: VehicleFilters에서 회사나 검색어가 변경되었을 때 호출될 setSelectedCompany, setSearchTerm과 같은 함수를 실제로 구현
 * CarList에서 차량이 선택되었을 때 호출될 handleSelectCar 함수 (예: 선택된 차량 정보 업데이트, 지도 중심 이동 등)를 구현
 * 4. 자식 컴포넌트에 Props 전달: 관리하고 있는 상태나 가공된 데이터를 각 자식 컴포넌트(VehicleFilters, VehicleList, MapControls, KakaoMap)에 필요한 props로 전달
 * 5. 화면 레이아웃 구성: 좌측 패널(필터, 차량 목록)과 우측 패널(지도 컨트롤, 지도)의 전체적인 화면 배치를 담당
 */

const initialCompanies: Company[] = [
  { id: 'all', name: '모든 회사' },
  { id: 'hyundai', name: '현대' },
  { id: 'kia', name: '기아' },
  { id: 'ssangyong', name: '쌍용' }
]

const initialCars: Car[] = [
  {
    number: '12가 3456',
    model: '현대 아반떼',
    location: '서울',
    lat: 37.619285,
    lng: 126.921028
  },
  {
    number: '34나 5678',
    model: '기아 K5',
    location: '부산',
    lat: 35.1796,
    lng: 129.0756
  },
  {
    number: '56다 7890',
    model: '쌍용 코란도',
    location: '인천',
    lat: 37.4563,
    lng: 126.7052
  },
  {
    number: '78라 1234',
    model: '현대 투싼',
    location: '대구',
    lat: 35.8714,
    lng: 128.6014
  },
  {
    number: '90마 5678',
    model: '기아 스포티지',
    location: '광주',
    lat: 35.1601,
    lng: 126.8514
  }
]

const SIMUL_CAR_NUMBER = '12가 3456'
const SIMUL_LATLNG = [
  { lat: 37.6129317, lng: 126.9278844 },
  { lat: 37.607525, lng: 126.932515 },
  { lat: 37.602822, lng: 126.935169 },
  { lat: 37.526039, lng: 126.8351948 }
]
const SIMUL_INTEVER = 5000

function TrackingCar() {
  const INIT_CENTER = { lat: 37.5665, lng: 126.978 }
  const INIT_ZOOM_LEVEL = 9
  const DETAIL_ZOOM_LEVEL = 3

  const [companies] = useState<Company[]>(initialCompanies)
  const [cars, setCars] = useState<Car[]>(initialCars)

  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [selectedCarNumber, setSelectedCarNumber] = useState<string | null>(
    null
  )
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: INIT_CENTER.lat,
    lng: INIT_CENTER.lng
  })
  const [mapZoom, setMapZoom] = useState<number>(INIT_ZOOM_LEVEL)

  // --- 차량 위치 시뮬레이션 로직 ---
  useEffect(() => {
    let currentCoordinateIndex = 0

    const intervalId = setInterval(() => {
      setCars(prevCars =>
        prevCars.map(car => {
          if (car.number === SIMUL_CAR_NUMBER) {
            const newCoords = SIMUL_LATLNG[currentCoordinateIndex]
            console.log(
              `차량 [${SIMUL_CAR_NUMBER}] 이동: (${newCoords.lat}, ${newCoords.lng})`
            )
            return { ...car, lat: newCoords.lat, lng: newCoords.lng }
          }
          return car
        })
      )

      currentCoordinateIndex =
        (currentCoordinateIndex + 1) % SIMUL_LATLNG.length // 다음 좌표로 순환
    }, SIMUL_INTEVER)

    return () => {
      clearInterval(intervalId)
      console.log('차량 시뮬레이션 인터벌이 정리되었습니다.')
    }
  }, [])

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const companyName = car.model.split(' ')[0].toLowerCase() // 예: '현대' -> 'hyundai'
      const companyMatch =
        selectedCompany === 'all' ||
        companyName.includes(selectedCompany.toLowerCase())

      const term = searchTerm.toLowerCase()
      const termMatch =
        searchTerm === '' ||
        car.number.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term)
      return companyMatch && termMatch
    })
  }, [cars, selectedCompany, searchTerm])

  const carMarkers = useMemo(() => {
    return filteredCars.map((car, index) => ({
      // 필터된 차량만 마커로 표시
      lat: car.lat,
      lng: car.lng,
      label: car.number
    }))
  }, [filteredCars])

  const handleSelectCar = (carNumber: string) => {
    setSelectedCarNumber(carNumber)
    const car = cars.find(c => c.number === carNumber)
    if (car) {
      setMapCenter({ lat: car.lat, lng: car.lng })
      setMapZoom(DETAIL_ZOOM_LEVEL)
    }
    console.log('선택 차량 :', carNumber)
  }

  const mapTitle = useMemo(() => {
    const company = companies.find(c => c.id === selectedCompany)
    const companyName = company && company.id !== 'all' ? company.name : '전체'
    return `차량 위치 - ${companyName}`
  }, [selectedCompany, companies])

  return (
    <div className="flex min-h-[calc(100vh-96px)] flex-col gap-6 bg-[#f5f8fa] p-6 md:flex-row">
      {' '}
      {/* 반응형 레이아웃 추가 */}
      {/* 좌측: 차량 리스트 */}
      <div className="flex w-full flex-col rounded-2xl bg-white p-6 shadow md:w-96">
        <div className="mb-4 text-lg font-bold">
          운행 중인 차량 ({filteredCars.length})
        </div>
        <CarFilters
          companies={companies}
          selectedCompany={selectedCompany}
          searchTerm={searchTerm}
          onCompanyChange={companyId => {
            setSelectedCompany(companyId)
            setSelectedCarNumber(null) // 회사 필터 변경 시 차량 선택 해제
            setMapCenter(INIT_CENTER) // 전체 보기로
            setMapZoom(INIT_ZOOM_LEVEL)
          }}
          onSearchTermChange={term => {
            setSearchTerm(term)
            setSelectedCarNumber(null) // 검색어 변경 시 차량 선택 해제
            setMapCenter(INIT_CENTER) // 전체 보기로
            setMapZoom(INIT_ZOOM_LEVEL)
          }}
        />
        <CarList
          cars={filteredCars}
          selectedCarNumber={selectedCarNumber}
          onSelectCar={handleSelectCar}
        />
      </div>
      <div className="flex flex-1 flex-col rounded-2xl bg-[#eaf1fb] p-6 shadow">
        <MapControls title={mapTitle} />
        <div className="relative min-h-[300px] flex-1 md:min-h-0">
          {' '}
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
    </div>
  )
}

export default TrackingCar
