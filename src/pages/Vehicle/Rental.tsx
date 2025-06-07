import React, { useState } from 'react'
import Header from '@/components/common/Header'
import VehicleRentalTable from '@/components/vehicle/rental/RentalTable'
import ManagementAsideBar from '@/components/vehicle/common/VehicleAsideBar'
import ReservationTopBar from '@/components/vehicle/rental/RentalTopBar'
import ReturnConfirmModal from '@/components/vehicle/rental/ReturnConfirmModal'
import SelectCompanyModal from '@/components/vehicle/rental/SelectCompanyModal'
import ChangeStatusModal from '@/components/vehicle/rental/ChangeStatusModal'

const vehicleList = [
  {
    number: '12가 3456',
    info: '현대 아반떼 (흰색)',
    status: '대여중',
    company: '롯데이찌로지스',
    date: '2023-05-15',
    action: '회수'
  },
  {
    number: '34나 5678',
    info: '기아 K5 (검정)',
    status: '이용가능',
    company: '-',
    date: '-',
    action: '대여'
  },
  {
    number: '56다 7890',
    info: '쌍용 코란도 (회색)',
    status: '대여중',
    company: '패스트캠퍼스',
    date: '2023-06-01',
    action: '회수'
  },
  {
    number: '78라 1234',
    info: '현대 투싼 (파랑)',
    status: '이용가능',
    company: '-',
    date: '-',
    action: '대여'
  },
  {
    number: '90마 5678',
    info: '기아 스포티지 (검정)',
    status: '대여중',
    company: 'AAAA주식회사',
    date: '2023-05-20',
    action: '회수'
  },
  {
    number: '11나 1111',
    info: '현대 그랜저 (검정)',
    status: '이용가능',
    company: '-',
    date: '-',
    action: '대여'
  },
  {
    number: '22다 2222',
    info: '기아 쏘렌토 (흰색)',
    status: '대여중',
    company: '삼성물산',
    date: '2023-06-10',
    action: '회수'
  },
  {
    number: '33라 3333',
    info: '쌍용 티볼리 (회색)',
    status: '이용가능',
    company: '-',
    date: '-',
    action: '대여'
  },
  {
    number: '44마 4444',
    info: '현대 싼타페 (검정)',
    status: '대여중',
    company: 'LG전자',
    date: '2023-06-05',
    action: '회수'
  },
  {
    number: '55바 5555',
    info: '기아 카니발 (흰색)',
    status: '이용가능',
    company: '-',
    date: '-',
    action: '대여'
  }
]

const companyListData = ['ABC 렌터카', 'XYZ 렌터카', 'DEF 렌터카', 'GHI 렌터카']

export default function Rental() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof vehicleList)[0] | null
  >(null)
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false)
  const [isSelectCompanyModalOpen, setIsSelectCompanyModalOpen] =
    useState(false)
  const [companySearch, setCompanySearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false)
  const [changeStatusVehicle, setChangeStatusVehicle] = useState<
    (typeof vehicleList)[0] | null
  >(null)
  const [changeStatusValue, setChangeStatusValue] = useState('')

  // 검색 및 필터 적용
  const filteredList = vehicleList.filter(vehicle => {
    const matchesSearch = search === '' || vehicle.number.includes(search)
    const matchesFilter = filter === '' || vehicle.status === filter
    return matchesSearch && matchesFilter
  })

  // 회사명 검색 필터
  const filteredCompanyList = companyListData.filter(company =>
    company.toLowerCase().includes(companySearch.toLowerCase())
  )

  const handleAction = (number: string, action: string) => {
    const vehicle = vehicleList.find(v => v.number === number)
    if (!vehicle) return
    if (action === '회수') {
      setSelectedVehicle(vehicle)
      setIsReturnModalOpen(true)
    } else if (action === '대여') {
      setSelectedVehicle(vehicle)
      setIsSelectCompanyModalOpen(true)
      setSelectedCompany('')
      setCompanySearch('')
    } else if (action === '상태변경') {
      handleChangeStatusClick(number)
    } else {
      console.log(number, action)
    }
  }

  // 상태 변경 버튼 핸들러
  const handleChangeStatusClick = (number: string) => {
    const vehicle = vehicleList.find(v => v.number === number)
    if (!vehicle) return
    setChangeStatusVehicle(vehicle)
    setChangeStatusValue(vehicle.status)
    setIsChangeStatusModalOpen(true)
  }

  // 회수 모달 핸들러
  const handleReturnConfirm = () => {
    if (selectedVehicle) {
      console.log('회수 처리:', selectedVehicle)
      // 회수 처리 로직
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
      // 대여 처리 로직
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
  const handleChangeStatusConfirm = () => {
    if (changeStatusVehicle && changeStatusValue) {
      console.log(
        '상태 변경:',
        changeStatusVehicle.number,
        '→',
        changeStatusValue
      )
      // 상태 변경 처리 로직
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
          <ReservationTopBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
          <div className="flex min-h-0 flex-1">
            <div className="max-w-8xl w-full">
              <VehicleRentalTable
                vehicles={filteredList}
                onAction={handleAction}
                onChangeStatus={handleChangeStatusClick}
              />
            </div>
          </div>
        </main>
      </div>
      {/* 회수 모달 */}
      {isReturnModalOpen && selectedVehicle && (
        <ReturnConfirmModal
          company={selectedVehicle.company}
          number={selectedVehicle.number}
          info={selectedVehicle.info}
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
          carNumber={changeStatusVehicle.number}
          selectedStatus={changeStatusValue}
          onSelect={setChangeStatusValue}
          onConfirm={handleChangeStatusConfirm}
          onCancel={handleChangeStatusCancel}
        />
      )}
    </div>
  )
}
