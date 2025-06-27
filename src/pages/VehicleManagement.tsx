import { useState } from 'react'
import Header from '@/components/common/Header'
import RentalTable from '@/components/vehicle/rental/RentalTable'
import RentalTopBar from '@/components/vehicle/rental/RentalTopBar'
import ReturnConfirmModal from '@/components/vehicle/rental/ReturnConfirmModal'
import ChangeStatusModal from '@/components/vehicle/rental/ChangeStatusModal'
import {
  VehicleListResponse,
  VehicleStatus,
  UpdateVehicleStatusRequest
} from '@/types/vehicle'
import axios from 'axios'
import SideMenuBar from '@/components/common/SideMenuBar'

interface ModalState {
  isOpen: boolean
  vehicle: VehicleListResponse | null
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const updateVehicleStatus = async (
  request: UpdateVehicleStatusRequest
): Promise<void> => {
  try {
    await axios.patch('/api/v1/vehicles', request)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(
        error.response.data.errorReason?.reason ||
          '차량 상태 변경에 실패했습니다.'
      )
    }
    throw new Error('차량 상태 변경에 실패했습니다.')
  }
}

export default function Rental() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [returnModal, setReturnModal] = useState<ModalState>({
    isOpen: false,
    vehicle: null
  })
  const [changeStatusModal, setChangeStatusModal] = useState<
    ModalState & { status: string }
  >({
    isOpen: false,
    vehicle: null,
    status: ''
  })
  const handleReturn = (vehicle: VehicleListResponse) => {
    setReturnModal({ isOpen: true, vehicle })
  }

  const handleReturnConfirm = () => {
    if (returnModal.vehicle) {
      console.log('회수 처리:', returnModal.vehicle)
      // TODO: 회수 API 호출
    }
    setReturnModal({ isOpen: false, vehicle: null })
  }

  const handleReturnCancel = () => {
    setReturnModal({ isOpen: false, vehicle: null })
  }

  const handleChangeStatusConfirm = async () => {
    if (changeStatusModal.vehicle && changeStatusModal.status) {
      try {
        await updateVehicleStatus({
          vehicleId: changeStatusModal.vehicle.vehicleId,
          vehicleStatus: changeStatusModal.status as VehicleStatus
        })
        // 성공 후 목록 새로고침
        window.location.reload()
      } catch (error) {
        console.error('상태 변경 실패:', error)
        const errorMessage =
          error instanceof Error
            ? error.message
            : '차량 상태 변경에 실패했습니다.'
        alert(errorMessage)
      }
    }
    setChangeStatusModal({ isOpen: false, vehicle: null, status: '' })
  }

  const handleChangeStatusCancel = () => {
    setChangeStatusModal({ isOpen: false, vehicle: null, status: '' })
  }

  const handleChangeStatus = (vehicle: VehicleListResponse) => {
    setChangeStatusModal({
      isOpen: true,
      vehicle,
      status: vehicle.vehicleStatus
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fb]">
      <Header />

      <div className="flex min-h-0 flex-1">
        <SideMenuBar />
        <main className="mx-10 flex min-h-0 flex-1 flex-col px-12 py-10">
          <RentalTopBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
          <div className="flex min-h-0 flex-1">
            <div className="max-w-8xl w-full">
              <RentalTable
                search={search}
                filter={filter}
                onReturn={handleReturn}
                onChangeStatus={handleChangeStatus}
              />
            </div>
          </div>
        </main>
      </div>
      {/* 회수 모달 */}
      {returnModal.isOpen && returnModal.vehicle && (
        <ReturnConfirmModal
          company={returnModal.vehicle.rentedCompany || ''}
          number={returnModal.vehicle.licensePlate}
          info={returnModal.vehicle.model}
          onConfirm={handleReturnConfirm}
          onCancel={handleReturnCancel}
        />
      )}
      {/* 상태 변경 모달 */}
      {changeStatusModal.isOpen && changeStatusModal.vehicle && (
        <ChangeStatusModal
          carNumber={changeStatusModal.vehicle.licensePlate}
          selectedStatus={changeStatusModal.status}
          onSelect={status =>
            setChangeStatusModal(prev => ({ ...prev, status }))
          }
          onConfirm={handleChangeStatusConfirm}
          onCancel={handleChangeStatusCancel}
        />
      )}
    </div>
  )
}
