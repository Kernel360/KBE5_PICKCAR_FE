import React, { useState } from 'react'
import Header from '@/components/common/Header'
import VehicleRentalTable from '@/components/vehicle/rental/RentalTable'
import ManagementAsideBar from '@/components/vehicle/common/VehicleAsideBar'
import ReservationTopBar from '@/components/vehicle/rental/RentalTopBar'

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

export default function Rental() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  // 검색 및 필터 적용
  const filteredList = vehicleList.filter(vehicle => {
    const matchesSearch = search === '' || vehicle.number.includes(search)
    const matchesFilter = filter === '' || vehicle.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fb]">
      {/* 상단 헤더 */}
      <Header activeMenu="vehicle-rental" />
      {/* 헤더를 제외한 나머지 */}
      <div className="flex min-h-0 flex-1">
        {/* 좌측 메뉴 */}
        <ManagementAsideBar />
        {/* 메인 */}
        <main className="mx-32 flex min-h-0 flex-1 flex-col px-12 py-10">
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
                onAction={(number, action) => {
                  // 회수/대여 버튼 클릭 시 처리
                  console.log(number, action)
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
