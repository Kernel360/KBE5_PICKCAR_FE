import React from 'react'

interface RegisterCarInfoSectionProps {
  carNumber: string
  setCarNumber: (v: string) => void
  model: string
  setModel: (v: string) => void
  carType: string
  setCarType: (v: string) => void
  customCarType: string
  setCustomCarType: (v: string) => void
  manufacturer: string
  setManufacturer: (v: string) => void
  customManufacturer: string
  setCustomManufacturer: (v: string) => void
  year: string
  setYear: (v: string) => void
  color: string
  setColor: (v: string) => void
  fuelType: string
  setFuelType: (v: string) => void
  hasGps: string
  setHasGps: (v: string) => void
}

export default function RegisterCarInfoSection({
  carNumber,
  setCarNumber,
  model,
  setModel,
  carType,
  setCarType,
  customCarType,
  setCustomCarType,
  manufacturer,
  setManufacturer,
  customManufacturer,
  setCustomManufacturer,
  year,
  setYear,
  color,
  setColor,
  fuelType,
  setFuelType,
  hasGps,
  setHasGps
}: RegisterCarInfoSectionProps) {
  return (
    <div className="mb-8">
      <div className="mb-4 text-lg font-semibold text-gray-900">차량 정보</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="carNumber"
            className="text-sm font-medium text-gray-900">
            차량번호 <span className="text-blue-600">*</span>
          </label>
          <input
            id="carNumber"
            name="carNumber"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="차량번호 입력"
            value={carNumber}
            onChange={e => setCarNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="model"
            className="text-sm font-medium text-gray-900">
            모델명 <span className="text-blue-600">*</span>
          </label>
          <input
            id="model"
            name="model"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="모델명 입력 (예: 현대 아반떼, 기아 스포티지)"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="carType"
            className="text-sm font-medium text-gray-900">
            차종 <span className="text-blue-600">*</span>
          </label>
          <select
            id="carType"
            name="carType"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 focus:outline-none"
            value={carType}
            onChange={e => setCarType(e.target.value)}>
            <option
              value=""
              disabled={carType !== ''}
              hidden={carType !== ''}>
              차종 선택
            </option>
            <option value="소형">소형</option>
            <option value="준중형">준중형</option>
            <option value="중형">중형</option>
            <option value="대형 세단">대형 세단</option>
            <option value="해치백">해치백</option>
            <option value="SUV">SUV</option>
            <option value="밴">밴</option>
            <option value="custom">직접 입력</option>
          </select>
          {carType === 'custom' && (
            <input
              id="customCarType"
              name="customCarType"
              className="mt-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
              placeholder="차종 직접 입력"
              value={customCarType}
              onChange={e => setCustomCarType(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="manufacturer"
            className="text-sm font-medium text-gray-900">
            제조사 <span className="text-blue-600">*</span>
          </label>
          <select
            id="manufacturer"
            name="manufacturer"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 focus:outline-none"
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}>
            <option
              value=""
              disabled={manufacturer !== ''}
              hidden={manufacturer !== ''}>
              제조사 선택
            </option>
            <option value="현대">현대</option>
            <option value="기아">기아</option>
            <option value="쌍용">쌍용</option>
            <option value="custom">직접 입력</option>
          </select>
          {manufacturer === 'custom' && (
            <input
              id="customManufacturer"
              name="customManufacturer"
              className="mt-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
              placeholder="제조사 직접 입력"
              value={customManufacturer}
              onChange={e => setCustomManufacturer(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="year"
            className="text-sm font-medium text-gray-900">
            연식 <span className="text-blue-600">*</span>
          </label>
          <input
            id="year"
            name="year"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="연식 입력 (예: 2023)"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="color"
            className="text-sm font-medium text-gray-900">
            색상
          </label>
          <input
            id="color"
            name="color"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="색상 입력"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="fuelType"
            className="text-sm font-medium text-gray-900">
            연료 타입
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 focus:outline-none"
            value={fuelType}
            onChange={e => setFuelType(e.target.value)}>
            <option
              value=""
              disabled={fuelType !== ''}
              hidden={fuelType !== ''}>
              연료 타입 선택
            </option>
            <option value="LPG">LPG</option>
            <option value="휘발유">휘발유</option>
            <option value="경유">경유</option>
            <option value="전기">전기</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="hasGps"
            className="text-sm font-medium text-gray-900">
            GPS 여부
          </label>
          <select
            id="hasGps"
            name="hasGps"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 focus:outline-none"
            value={hasGps}
            onChange={e => setHasGps(e.target.value)}>
            <option
              value=""
              disabled={hasGps !== ''}
              hidden={hasGps !== ''}>
              GPS 여부 선택
            </option>
            <option value="예">예</option>
            <option value="아니오">아니오</option>
          </select>
        </div>
      </div>
    </div>
  )
}
