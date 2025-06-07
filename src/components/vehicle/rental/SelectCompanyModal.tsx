import React from 'react'

interface SelectCompanyModalProps {
  companyList: string[]
  selected: string
  onSelect: (company: string) => void
  onConfirm: () => void
  onCancel: () => void
  search: string
  setSearch: (value: string) => void
}

export default function SelectCompanyModal({
  companyList,
  selected,
  onSelect,
  onConfirm,
  onCancel,
  search,
  setSearch
}: SelectCompanyModalProps) {
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">
            대여 회사 선택
          </h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={onCancel}
            aria-label="닫기">
            &times;
          </button>
        </div>
        {/* 검색창 */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"
                />
              </svg>
            </span>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="회사명 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* 회사 리스트 */}
        <div className="mb-8 space-y-2">
          {companyList.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : (
            companyList.map(company => (
              <button
                key={company}
                className={`flex w-full items-center justify-between rounded-xl px-6 py-4 text-lg font-medium text-gray-900 transition ${selected === company ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-50`}
                onClick={() => onSelect(company)}
                type="button">
                <span>{company}</span>
                <span
                  className={`ml-2 flex h-6 w-6 items-center justify-center rounded-full border-2 ${selected === company ? 'border-blue-500' : 'border-gray-200'}`}>
                  {selected === company ? (
                    <span className="block h-3 w-3 rounded-full bg-blue-500" />
                  ) : null}
                </span>
              </button>
            ))
          )}
        </div>
        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2">
          <button
            className="rounded border border-gray-300 bg-white px-8 py-3 text-lg text-gray-700 hover:bg-gray-50"
            onClick={onCancel}>
            취소
          </button>
          <button
            className="rounded bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700 disabled:bg-blue-200"
            onClick={onConfirm}
            disabled={!selected}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
