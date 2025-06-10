import type { DrivingHistoryDetail } from '@/types/drivingHistory'
import KakaoMap from '@/components/common/KakaoMap'
import carSampleImg from '@/components/common/car_sample.jpg'

interface Props {
  open: boolean
  onClose: () => void
  detail: DrivingHistoryDetail | null
}

const statusMap: Record<string, { label: string; color: string }> = {
  RESERVED: { label: '운행 중', color: 'bg-green-100 text-green-600' },
  RETURNED: { label: '반납 완료', color: 'bg-red-100 text-black-600' },
  CANCELLED: { label: '취소됨', color: 'bg-gray-100 text-gray-600' }
}

const INIT_CENTER = { lat: 37.5665, lng: 126.978 }

const DrivingHistoryDetailModal = ({ open, onClose, detail }: Props) => {
  if (!open || !detail) return null

  const status = statusMap[detail.reservationStatus] || {
    label: detail.reservationStatus,
    color: 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-[900px] max-w-full rounded-2xl bg-white p-10 shadow-xl">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}>
          ×
        </button>
        <div className="mb-6 flex items-center gap-3">
          <img
            src={carSampleImg}
            alt="차량 샘플"
            className="h-20 w-20 rounded-full object-contain"
          />
          <div>
            <div className="text-lg font-bold">
              {detail.licensePlate} 상세 정보
            </div>
            <div className="text-gray-500">{detail.model}</div>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 rounded-xl bg-[#f7fafc] p-6 shadow-sm">
            <div className="mb-2 font-semibold text-gray-700">차량 정보</div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">차량번호</span>
              <span className="font-semibold text-gray-800">
                {detail.licensePlate}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">제조사/모델</span>
              <span className="font-semibold text-gray-800">
                {detail.model}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">연식</span>
              <span className="font-semibold text-gray-800">
                {detail.carAge}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">상태</span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-[#f7fafc] p-6 shadow-sm">
            <div className="mb-2 font-semibold text-gray-700">
              현재 운행 정보
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">운행 시작</span>
              <span className="font-semibold text-gray-800">
                {new Date(detail.drivingStartedAt).toLocaleString('ko-KR')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">운행 시간</span>
              <span className="font-semibold text-gray-800">
                {detail.totalDrivingTime}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">이동 거리</span>
              <span className="font-semibold text-gray-800">
                {detail.totalDistance.toFixed(1)} km
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">운전자</span>
              <span className="font-semibold text-gray-800">
                {detail.driverName}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold text-gray-700">이동 경로</div>
          <div className="flex h-70 items-center justify-center rounded-lg bg-[#eaf3fb] text-gray-400">
            <KakaoMap
              center={INIT_CENTER}
              zoom={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrivingHistoryDetailModal
