import React from 'react'
import type { Company } from '@/types/tracking'

/**
 * 차량 검색 필터
 * 차량목록을 필터링 하도록 ( 회사 선택, 검색어 입력)
 */

interface CarFiltersProps {
  companies: Company[]
  selectedCompany: string
  searchTerm: string
  onCompanyChange: (companyId: string) => void
  onSearchTermChange: (term: string) => void
}

function CarFilters({
  companies,
  selectedCompany,
  searchTerm,
  onCompanyChange,
  onSearchTermChange
}: CarFiltersProps): React.ReactElement {
  const companyList = companies || []
  return (
    <div className="mb-3 flex gap-2">
      <select
        className="w-32 rounded border p-2 text-sm"
        value={selectedCompany}
        onChange={e => onCompanyChange(e.target.value)}>
        {companyList.map(company => (
          <option
            key={company.id}
            value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="flex-1 rounded border p-2 text-sm"
        placeholder="차량번호 또는 모델 검색..."
        value={searchTerm}
        onChange={e => onSearchTermChange(e.target.value)}
      />
    </div>
  )
}

export default CarFilters
