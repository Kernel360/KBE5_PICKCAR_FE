import React from 'react'

const CAR_TYPES = [
  '소형',
  '준중형',
  '중형',
  '대형 세단',
  '해치백',
  'SUV',
  '밴',
  'custom'
] as const

const MANUFACTURERS = ['현대', '기아', '쌍용', 'custom'] as const

const FUEL_TYPES = ['LPG', '휘발유', '경유', '전기', '기타'] as const
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
  React.useEffect(() => {
    if (!carType) setCarType(CAR_TYPES[0])
    if (!manufacturer) setManufacturer(MANUFACTURERS[0])
    if (!year) setYear('2025')
    if (!fuelType) setFuelType(FUEL_TYPES[0])
    if (!color) setColor('검정색')
    if (hasGps !== '예') setHasGps('예')
  }, [])
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="carNumber"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            차량번호 <span className="text-blue-600 dark:text-blue-400">*</span>
          </label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            className="input dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="차량번호 입력"
            value={carNumber}
            onChange={e => setCarNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="model"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            모델명 <span className="text-blue-600 dark:text-blue-400">*</span>
          </label>
          <input
            id="model"
            name="model"
            className="input dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="모델명 입력 (예: 현대 아반떼, 기아 스포티지)"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="carType"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            차종 <span className="text-blue-600 dark:text-blue-400">*</span>
          </label>
          <select
            id="carType"
            name="carType"
            className="select dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={carType}
            onChange={e => setCarType(e.target.value)}>
            {CAR_TYPES.map(type => (
              <option
                key={type}
                value={type}>
                {type === 'custom' ? '직접 입력' : type}
              </option>
            ))}
          </select>
          {carType === 'custom' && (
            <input
              id="customCarType"
              name="customCarType"
              className="input dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="차종 직접 입력"
              value={customCarType}
              onChange={e => setCustomCarType(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="manufacturer"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            제조사 <span className="text-blue-600 dark:text-blue-400">*</span>
          </label>
          <select
            id="manufacturer"
            name="manufacturer"
            className="select dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}>
            {MANUFACTURERS.map(maker => (
              <option
                key={maker}
                value={maker}>
                {maker === 'custom' ? '직접 입력' : maker}
              </option>
            ))}
          </select>
          {manufacturer === 'custom' && (
            <input
              id="customManufacturer"
              name="customManufacturer"
              className="input dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="제조사 직접 입력"
              value={customManufacturer}
              onChange={e => setCustomManufacturer(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="year"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            연식 <span className="text-blue-600 dark:text-blue-400">*</span>
          </label>
          <select
            id="year"
            name="year"
            className="select dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={year}
            onChange={e => setYear(e.target.value)}>
            {Array.from({ length: 30 }, (_, i) => {
              const y = 2025 - i
              return (
                <option
                  key={y}
                  value={y}>
                  {y}
                </option>
              )
            })}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="color"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            색상
          </label>
          <input
            id="color"
            name="color"
            className="input dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="색상 입력"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="fuelType"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            연료 타입
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className="select dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={fuelType}
            onChange={e => setFuelType(e.target.value)}>
            <option
              value=""
              disabled={fuelType !== ''}
              hidden={fuelType !== ''}>
              연료 타입 선택
            </option>
            {FUEL_TYPES.map(type => (
              <option
                key={type}
                value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="hasGps"
            className="text-sm font-medium text-gray-900 dark:text-gray-300">
            GPS 여부
          </label>
          <select
            id="hasGps"
            name="hasGps"
            className="select dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={hasGps}
            onChange={e => setHasGps(e.target.value)}
            disabled>
            <option value="예">예</option>
          </select>
        </div>
      </div>
    </div>
  )
}
