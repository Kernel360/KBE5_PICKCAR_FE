import React, { useState } from 'react'
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

const companyListData = ['ABC 렌터카', 'XYZ 렌터카', 'DEF 렌터카', 'GHI 렌터카']

export default function Rental() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [selectedVehicle, setSelectedVehicle] =
    useState<VehicleListResponse | null>(null)
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false)
  const [isSelectCompanyModalOpen, setIsSelectCompanyModalOpen] =
    useState(false)
  const [companySearch, setCompanySearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false)
  const [changeStatusVehicle, setChangeStatusVehicle] =
    useState<VehicleListResponse | null>(null)
  const [changeStatusValue, setChangeStatusValue] = useState('')

  // 회사명 검색 필터
  const filteredCompanyList = companyListData.filter(company =>
    company.toLowerCase().includes(companySearch.toLowerCase())
  )

  const handleReturn = (vehicle: VehicleListResponse) => {
    setSelectedVehicle(vehicle)
    setIsReturnModalOpen(true)
  }

  // 회수 모달 핸들러
  const handleReturnConfirm = () => {
    if (selectedVehicle) {
      console.log('회수 처리:', selectedVehicle)
      // TODO: 회수 API 호출
    }
    setIsReturnModalOpen(false)
    setSelectedVehicle(null)
  }

  const handleReturnCancel = () => {
    setIsReturnModalOpen(false)
    setSelectedVehicle(null)
  }

  // 대여 모달 핸들러
  const handleCompanyConfirm = () => {
    if (selectedVehicle && selectedCompany) {
      console.log('대여 처리:', selectedVehicle, '→', selectedCompany)
      // TODO: 대여 API 호출
    }
    setIsSelectCompanyModalOpen(false)
    setSelectedVehicle(null)
    setSelectedCompany('')
    setCompanySearch('')
  }

  const handleCompanyCancel = () => {
    setIsSelectCompanyModalOpen(false)
    setSelectedVehicle(null)
    setSelectedCompany('')
    setCompanySearch('')
  }

  // 상태 변경 모달 핸들러
  const handleChangeStatusConfirm = async () => {
    if (changeStatusVehicle && changeStatusValue) {
      try {
        await updateVehicleStatus({
          vehicleId: changeStatusVehicle.vehicleId,
          vehicleStatus: changeStatusValue as VehicleStatus
        })
        // 성공 후 목록 새로고침
        window.location.reload()
      } catch (error) {
        console.error('상태 변경 실패:', error)
        // 서버에서 오는 에러 메시지 사용
        const errorMessage =
          error instanceof Error
            ? error.message
            : '차량 상태 변경에 실패했습니다.'
        alert(errorMessage)
      }
    }
    setIsChangeStatusModalOpen(false)
    setChangeStatusVehicle(null)
    setChangeStatusValue('')
  }

  const handleChangeStatusCancel = () => {
    setIsChangeStatusModalOpen(false)
    setChangeStatusVehicle(null)
    setChangeStatusValue('')
  }

  const handleChangeStatus = (vehicle: VehicleListResponse) => {
    setChangeStatusVehicle(vehicle)
    setChangeStatusValue(vehicle.vehicleStatus)
    setIsChangeStatusModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fb]">
      {/* 상단 헤더 */}
      <Header activeMenu="vehicle-rental" />
      {/* 헤더를 제외한 나머지 */}
      <div className="flex min-h-0 flex-1">
        {/* 좌측 메뉴 */}
        <ManagementAsideBar />
        {/* 메인 */}
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
      {isReturnModalOpen && selectedVehicle && (
        <ReturnConfirmModal
          company={selectedVehicle.rentedCompany || ''}
          number={selectedVehicle.licensePlate}
          info={selectedVehicle.model}
          onConfirm={handleReturnConfirm}
          onCancel={handleReturnCancel}
        />
      )}
      {/* 대여 회사 선택 모달 */}
      {isSelectCompanyModalOpen && selectedVehicle && (
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
      {isChangeStatusModalOpen && changeStatusVehicle && (
        <ChangeStatusModal
          carNumber={changeStatusVehicle.licensePlate}
          selectedStatus={changeStatusValue}
          onSelect={setChangeStatusValue}
          onConfirm={handleChangeStatusConfirm}
          onCancel={handleChangeStatusCancel}
        />
      )}
    </div>
  )
}
