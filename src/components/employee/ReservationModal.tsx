import { useState } from 'react'
import { AvailableVehicleResponse } from '@/types/employee'
import axios from '../../axiosConfig'
import { isAxiosError } from 'axios'

interface ReservationModalProps {
  vehicles: AvailableVehicleResponse[]
  employeeId: number
  onClose: () => void
  onAssigned: () => void // 추가
}

export default function ReservationModal({
  vehicles,
  employeeId,
  onClose,
  onAssigned // 추가
}: ReservationModalProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dueDate, setDueDate] = useState<string>('')

  const handleAssign = async () => {
    if (!selectedVehicleId) {
      setError('차량을 선택해주세요.')
      return
    }

    if (!dueDate) {
      setError('할당 마감일을 선택해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      await axios.post('/api/v1/reservation', {
        employeeId,
        vehicleId: selectedVehicleId,
        dueDate // 추가
      })

      alert('할당에 성공하였습니다')
      onAssigned() // 데이터 새로고침
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        const errorMsg =
          error.response.data.errorReason?.reason || '차량 할당에 실패했습니다.'
        setError(errorMsg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date().toISOString().slice(0, 10)
  const maximumDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[900px] max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">차량 할당</h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="닫기">
            &times;
          </button>
        </div>
        <div className="mb-5 flex items-center justify-center">
          <h2 className="mr-3 font-bold text-gray-500">
            할당 마감일을 선택해주세요 (최대 60일)
          </h2>
          <input
            type="date"
            max={maximumDate}
            min={today}
            className="input w-40 rounded border px-3 py-3 text-sm"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="max-h-96 overflow-y-auto rounded-2xl">
          <table className="table-zebra table w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">차량번호</th>
                <th className="px-4 py-2">모델</th>
                <th className="px-4 py-2">연식</th>
                <th className="px-4 py-2">색상</th>
                <th className="px-4 py-2">선택</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.vehicleId}>
                  <td className="px-4 py-2">{vehicle.licensePlate}</td>
                  <td className="px-4 py-2">{vehicle.model}</td>
                  <td className="px-4 py-2">{vehicle.carAge}</td>
                  <td className="px-4 py-2">{vehicle.color}</td>
                  <td className="px-4 py-2">
                    <input
                      type="radio"
                      name="selectVehicle"
                      className="radio"
                      checked={selectedVehicleId === vehicle.vehicleId}
                      onChange={() => setSelectedVehicleId(vehicle.vehicleId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        <div className="mt-10 flex justify-center">
          <button
            className="btn bg-blue-500 text-white"
            onClick={handleAssign}
            disabled={isLoading}>
            {isLoading ? '할당 중...' : '할당'}
          </button>
        </div>
      </div>
    </div>
  )
}
