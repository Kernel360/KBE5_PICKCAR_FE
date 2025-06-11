import { useState } from 'react'
import Header from '@/components/common/Header'
import RentalTable from '@/components/vehicle/rental/RentalTable'
import ManagementAsideBar from '@/components/vehicle/common/VehicleAsideBar'
import RentalTopBar from '@/components/vehicle/rental/RentalTopBar'
import ReturnConfirmModal from '@/components/vehicle/rental/ReturnConfirmModal'
import SelectCompanyModal from '@/components/vehicle/rental/SelectCompanyModal'
import ChangeStatusModal from '@/components/vehicle/rental/ChangeStatusModal'
import {
  VehicleListResponse,
  VehicleStatus,
  updateVehicleStatus
} from '@/types/vehicle'

const COMPANY_LIST = ['ABC 렌터카', 'XYZ 렌터카', 'DEF 렌터카', 'GHI 렌터카']

interface ModalState {
  isOpen: boolean
  vehicle: VehicleListResponse | null
}

export default function Rental() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [returnModal, setReturnModal] = useState<ModalState>({
    isOpen: false,
    vehicle: null
  })
  const [selectCompanyModal, setSelectCompanyModal] = useState<ModalState>({
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
  const [companySearch, setCompanySearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')

  // 회사명 검색 필터
  const filteredCompanyList = COMPANY_LIST.filter(company =>
    company.toLowerCase().includes(companySearch.toLowerCase())
  )

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

  const handleCompanyConfirm = () => {
    if (selectCompanyModal.vehicle && selectedCompany) {
      console.log(
        '대여 처리:',
        selectCompanyModal.vehicle,
        '→',
        selectedCompany
      )
      // TODO: 대여 API 호출
    }
    setSelectCompanyModal({ isOpen: false, vehicle: null })
    setSelectedCompany('')
    setCompanySearch('')
  }

  const handleCompanyCancel = () => {
    setSelectCompanyModal({ isOpen: false, vehicle: null })
    setSelectedCompany('')
    setCompanySearch('')
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
      <Header activeMenu="vehicle-rental" />
      <div className="flex min-h-0 flex-1">
        <ManagementAsideBar />
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
      {/* 대여 회사 선택 모달 */}
      {selectCompanyModal.isOpen && selectCompanyModal.vehicle && (
        <SelectCompanyModal
          companyList={filteredCompanyList}
          selected={selectedCompany}
          onSelect={setSelectedCompany}
          onConfirm={handleCompanyConfirm}
          onCancel={handleCompanyCancel}
          search={companySearch}
          setSearch={setCompanySearch}
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
