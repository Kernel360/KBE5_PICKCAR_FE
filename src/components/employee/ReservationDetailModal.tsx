import { useEffect, useState } from 'react'
import axios from '../../axiosConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import DrivingHistoryDetailModal from '@/components/history/DrivingHistoryDetailModal'
import type { DrivingHistoryDetail } from '@/types/drivingHistory'

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
  relatedHistoryContexts?: {
    driveHistoryId: number
    drivingDate: string
  }[]
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
  const [openHistoryDetail, setOpenHistoryDetail] = useState(false)
  const [historyDetail, setHistoryDetail] =
    useState<DrivingHistoryDetail | null>(null)
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([])

  const handleViewHistoryDetail = async (historyId: number) => {
    try {
      const res = await axios.get(`/api/v1/history/${historyId}/detail`)
      setHistoryDetail(res.data.data)
      if (res.data.data.path) {
        setPolylinePath(
          res.data.data.path.map(
            (p: { latitude: number; longitude: number }) => ({
              lat: p.latitude,
              lng: p.longitude
            })
          )
        )
      } else {
        setPolylinePath([])
      }
      setOpenHistoryDetail(true)
    } catch {
      alert('운행일지 상세 정보를 불러오지 못했습니다.')
    }
  }

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
      <div className="relative h-[700px] w-[700px] max-w-full rounded-2xl bg-white p-10 shadow-xl dark:bg-gray-800">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}>
          ×
        </button>
        <h1 className="text-xl font-bold">상세 정보</h1>
        <div className="mt-10 mb-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 rounded-xl bg-[#f7fafc] p-6 shadow-sm dark:bg-gray-700">
            <div className="mb-2 font-semibold text-gray-700 dark:text-gray-400">
              차량 정보
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">차량번호</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {data.vehicleInfo.licensePlate}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">모델</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {data.vehicleInfo.model}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">연식</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {data.vehicleInfo.carAge}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">색상</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {data.vehicleInfo.color}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-[#f7fafc] p-6 shadow-sm dark:bg-gray-700">
            <div className="mb-2 font-semibold text-gray-700 dark:text-gray-400">
              예약 정보
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">사원명</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {data.employeeName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">연락처</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {data.phoneNumber}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">대여일</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {formatDate(data.rentedAt)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">반납 예정일</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {formatDate(data.dueDate)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center"></div>
        </div>
        {data.relatedHistoryContexts &&
          data.relatedHistoryContexts.length > 0 && (
            <div className="mt-8">
              <div className="mb-2 font-semibold text-gray-700 dark:text-gray-400">
                연관 운행 기록
              </div>
              <div className="max-h-60 overflow-y-auto">
                <table className="table-zebra dark:bg-base-300 table w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 dark:text-white">운행일자</th>
                      <th className="px-4 py-2 dark:text-white">상세보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.relatedHistoryContexts.map((ctx, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 dark:text-gray-300">
                          {ctx.drivingDate}
                        </td>
                        <td className="px-4 py-2 dark:text-gray-300">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            size="xl"
                            color="#4c7b6d"
                            className="cursor-pointer rounded-xl p-2 hover:bg-gray-300"
                            onClick={() =>
                              handleViewHistoryDetail(ctx.driveHistoryId)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
      <DrivingHistoryDetailModal
        open={openHistoryDetail}
        onClose={() => setOpenHistoryDetail(false)}
        detail={historyDetail}
        polylinePath={polylinePath}
      />
    </div>
  )
}
