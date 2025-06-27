import { useState, useEffect } from 'react'
import Header from '@/components/common/Header'
import RentalTable from '@/components/vehicle/rental/RentalTable'
import RentalTopBar from '@/components/vehicle/rental/RentalTopBar'
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
  const [changeStatusModal, setChangeStatusModal] = useState<
    ModalState & { status: string }
  >({
    isOpen: false,
    vehicle: null,
    status: ''
  })
  const [vehicles, setVehicles] = useState<VehicleListResponse[]>([])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('/api/v1/vehicles')
        setVehicles(response.data.data)
      } catch {
        // 에러 무시 (필요시 alert 등 처리 가능)
      }
    }
    fetchVehicles()
  }, [])

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.licensePlate
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesFilter = !filter || vehicle.vehicleStatus === filter
    return matchesSearch && matchesFilter
  })

  const handleChangeStatusConfirm = async () => {
    if (changeStatusModal.vehicle && changeStatusModal.status) {
      try {
        await updateVehicleStatus({
          vehicleId: changeStatusModal.vehicle.vehicleId,
          vehicleStatus: changeStatusModal.status as VehicleStatus
        })
        window.location.reload()
      } catch (error) {
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
    <div className="flex flex-col bg-[#f5f8fa]">
      <header className="flex bg-white">
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />
        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col p-6">
          <RentalTopBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          <div className="h-full min-h-0 flex-1">
            <RentalTable
              search={search}
              filter={filter}
              onChangeStatus={handleChangeStatus}
              vehicles={filteredVehicles}
            />
          </div>
        </main>
      </div>
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
