import React from 'react'

interface RentalTopBarProps {
  search: string
  setSearch: (value: string) => void
  filter: string
  setFilter: (value: string) => void
}

const inputStyles = 'rounded border border-gray-300 bg-white px-3 py-2 text-sm'

export default function RentalTopBar({
  search,
  setSearch,
  filter,
  setFilter
}: RentalTopBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold">차량 대여/회수</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <label
            htmlFor="vehicle-search"
            className="sr-only">
            차량번호 검색
          </label>
          <input
            id="vehicle-search"
            className={`${inputStyles} ml-8`}
            placeholder="차량번호 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <label
            htmlFor="status-filter"
            className="sr-only">
            상태 필터
          </label>
          <select
            id="status-filter"
            className={inputStyles}
            value={filter}
            onChange={e => setFilter(e.target.value)}>
            <option value="">상태 필터</option>
            <option value="대여중">대여중</option>
            <option value="이용가능">이용가능</option>
          </select>
        </div>
      </div>
    </div>
  )
}
