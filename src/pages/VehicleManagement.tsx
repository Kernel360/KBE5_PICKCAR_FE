import React, { useState } from 'react'
import Header from '@/components/common/Header'
import VehicleRentalTable from '@/components/management/VehicleRentalTable'

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

export default function VehicleManagement() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fb]">
      {/* 상단 헤더 */}
      <Header activeMenu="vehicle-rental" />
      {/* 헤더를 제외한 나머지 */}
      <div className="flex min-h-0 flex-1">
        {/* 좌측 메뉴 */}
        <aside className="w-60 bg-white px-6 py-8 shadow">
          <div className="mb-8 text-lg font-bold">차량 관리</div>
          <nav className="flex flex-col gap-2 text-gray-600">
            <a
              className="rounded px-3 py-2 hover:bg-gray-100"
              href="#">
              차량 등록/해지
            </a>
            <a
              className="rounded bg-blue-50 px-3 py-2 font-semibold text-blue-600"
              href="#">
              차량 대여/회수
            </a>
            <a
              className="rounded px-3 py-2 hover:bg-gray-100"
              href="#">
              차량 할당/해지
            </a>
            <a
              className="rounded px-3 py-2 hover:bg-gray-100"
              href="#">
              차량 상태변경
            </a>
          </nav>
        </aside>
        {/* 메인 */}
        <main className="flex-1 px-12 py-10">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xl font-bold">차량 대여/회수</h2>
            <input
              className="ml-8 rounded border border-gray-300 bg-white px-3 py-2 text-sm"
              placeholder="차량번호 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm"
              value={filter}
              onChange={e => setFilter(e.target.value)}>
              <option value="">상태 필터</option>
              <option value="대여중">대여중</option>
              <option value="이용가능">이용가능</option>
            </select>
          </div>
          {/* 테이블 */}
          <VehicleRentalTable
            vehicles={vehicleList}
            onAction={(number, action) => {
              // 회수/대여 버튼 클릭 시 처리
              console.log(number, action)
            }}
          />
        </main>
      </div>
    </div>
  )
}
