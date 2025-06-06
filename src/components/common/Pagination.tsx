import React, { useState } from 'react'

interface PaginationProps {
  current: number // 현재 페이지 (1부터 시작)
  total: number // 전체 페이지 수
  onChange: (page: number) => void // 페이지 변경 함수
}

const Pagination = ({ current, total, onChange }: PaginationProps) => {
  // 페이지 번호 배열 생성 (예: [1, 2, 3])
  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className="flex gap-2">
      {/* 이전 버튼 */}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}>
        &lt;
      </button>
      {/* 페이지 번호 버튼 */}
      {pages.map(page => (
        <button
          key={page}
          className={`flex h-8 w-8 items-center justify-center rounded-xl text-base font-bold shadow ${
            current === page
              ? 'bg-[#2563eb] text-white'
              : 'bg-[#f7f9fb] text-gray-500 hover:bg-blue-50'
          }`}
          onClick={() => onChange(page)}>
          {page}
        </button>
      ))}
      {/* 다음 버튼 */}
      <button
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50"
        onClick={() => onChange(current + 1)}
        disabled={current === total}>
        &gt;
      </button>
    </div>
  )
}

export default Pagination
