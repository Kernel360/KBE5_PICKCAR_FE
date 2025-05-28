import KakaoMap from '@/components/common/KakaoMap'

const companies = [
  { id: 'all', name: '모든 회사' },
  { id: 'hyundai', name: '현대' },
  { id: 'kia', name: '기아' },
  { id: 'ssangyong', name: '쌍용' }
]

const cars = [
  {
    number: '12가 3456',
    model: '현대 아반떼',
    location: '서울',
    lat: 37.5665,
    lng: 126.978
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

const carMarkers = cars.map((car, index) => ({
  lat: car.lat,
  lng: car.lng,
  label: `${index + 1}`
}))

function TrackingCar() {
  return (
    <div className="flex min-h-[calc(100vh-96px)] gap-6 bg-[#f5f8fa] p-6">
      {/* 좌측: 차량 리스트 */}
      <div className="flex w-96 flex-col rounded-2xl bg-white p-6 shadow">
        <div className="mb-4 text-lg font-bold">운행 중인 차량</div>
        <div className="mb-3 flex gap-2">
          <select className="w-32 rounded border p-2 text-sm">
            {companies.map(company => (
              <option
                key={company.id}
                value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <input
            className="flex-1 rounded border p-2 text-sm"
            placeholder="차량번호 검색..."
          />
        </div>
        <div className="flex flex-col gap-2">
          {cars.map((car, i) => (
            <div
              key={i}
              className={`flex cursor-pointer items-center justify-between rounded p-3 ${
                i === 1 ? 'bg-blue-50' : 'hover:bg-blue-50'
              }`}>
              <div>
                <div className="font-semibold">{car.number}</div>
                <div className="text-xs text-gray-400">
                  {car.model} · {car.location}
                </div>
              </div>
              <button
                className={`rounded px-3 py-1 text-sm ${
                  i === 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                }`}>
                상세보기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 우측: 지도 */}
      <div className="flex flex-1 flex-col rounded-2xl bg-[#eaf1fb] p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold">차량 위치 - 대한민국</span>
          <div className="flex items-center gap-2">
            <select className="rounded border p-2 text-sm">
              <option>전체</option>
            </select>
            <button className="rounded border p-2 text-gray-400 hover:text-blue-500">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  d="M12 4v16m8-8H4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          <KakaoMap
            center={{ lat: 37.5665, lng: 126.978 }}
            zoom={6}
            markers={carMarkers}
          />
        </div>
      </div>
    </div>
  )
}

export default TrackingCar
