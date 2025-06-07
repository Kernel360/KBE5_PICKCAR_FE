import React from 'react'

interface ReservationTopBarProps {
  search: string
  setSearch: (value: string) => void
  filter: string
  setFilter: (value: string) => void
}

export default function ReservationTopBar({
  search,
  setSearch,
  filter,
  setFilter
}: ReservationTopBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold">차량 대여/회수</h2>
      <div className="flex items-center gap-4">
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
    </div>
  )
}
