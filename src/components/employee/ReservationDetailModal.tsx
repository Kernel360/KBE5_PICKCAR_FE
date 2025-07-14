import React, { useEffect, useState } from 'react'
import axios from '../../axiosConfig'
import carSampleImg from '@/components/common/car_sample.jpg'

interface VehicleInfo {
  licensePlate: string
  model: string
  color: string
  carAge: string
}

interface ReservationDetailResponse {
  reservationId: number
  employeeName: string
  phoneNumber: string
  vehicleInfo: VehicleInfo
  dueDate: string
  rentedAt: string
}

interface Props {
  reservationId: number
  onClose: () => void
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return dateStr.slice(0, 10)
}

export default function ReservationDetailModal({
  reservationId,
  onClose
}: Props) {
  const [data, setData] = useState<ReservationDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `/api/v1/reservation/${reservationId}/detail`
        )
        setData(res.data.data)
        setError(null)
      } catch {
        setError('상세 정보를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [reservationId])

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="rounded-xl bg-white p-8">로딩 중...</div>
      </div>
    )
  if (error)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="rounded-xl bg-white p-8">{error}</div>
      </div>
    )
  if (!data) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-[700px] max-w-full rounded-2xl bg-white p-10 shadow-xl">
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
              {data.vehicleInfo.licensePlate} 상세 정보
            </div>
            <div className="text-gray-500">{data.vehicleInfo.model}</div>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 rounded-xl bg-[#f7fafc] p-6 shadow-sm">
            <div className="mb-2 font-semibold text-gray-700">차량 정보</div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">차량번호</span>
              <span className="font-semibold text-gray-800">
                {data.vehicleInfo.licensePlate}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">모델</span>
              <span className="font-semibold text-gray-800">
                {data.vehicleInfo.model}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">연식</span>
              <span className="font-semibold text-gray-800">
                {data.vehicleInfo.carAge}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">색상</span>
              <span className="font-semibold text-gray-800">
                {data.vehicleInfo.color}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-[#f7fafc] p-6 shadow-sm">
            <div className="mb-2 font-semibold text-gray-700">예약 정보</div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">사원명</span>
              <span className="font-semibold text-gray-800">
                {data.employeeName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">연락처</span>
              <span className="font-semibold text-gray-800">
                {data.phoneNumber}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">대여일</span>
              <span className="font-semibold text-gray-800">
                {formatDate(data.rentedAt)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">반납 예정일</span>
              <span className="font-semibold text-gray-800">
                {formatDate(data.dueDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
