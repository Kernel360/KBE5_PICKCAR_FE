import React, { useState } from 'react'
import Header from '@/components/common/Header'
import VehicleAsideBar from '@/components/vehicle/common/VehicleAsideBar'

export default function VehicleRegisterPage() {
  const [manufacturer, setManufacturer] = useState('')
  const [customManufacturer, setCustomManufacturer] = useState('')
  const [carType, setCarType] = useState('')
  const [customCarType, setCustomCarType] = useState('')
  const [carNumber, setCarNumber] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')

  // 폼 초기화 함수
  const handleReset = () => {
    setCarNumber('')
    setCarType('')
    setCustomCarType('')
    setManufacturer('')
    setCustomManufacturer('')
    setModel('')
    setYear('')
    setColor('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fb]">
      <Header activeMenu="vehicle" />
      <div className="flex min-h-0 flex-1">
        <VehicleAsideBar />
        <main className="flex flex-1 items-center justify-center px-12 py-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white px-14 py-12 shadow-xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">차량 등록</h2>
            <form>
              {/* 차량 정보 */}
              <div className="mb-8">
                <div className="mb-4 text-lg font-semibold text-gray-900">
                  차량 정보
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      차량번호 <span className="text-blue-600">*</span>
                    </label>
                    <input
                      className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="차량번호 입력"
                      value={carNumber}
                      onChange={e => setCarNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      모델명 <span className="text-blue-600">*</span>
                    </label>
                    <input
                      className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="(예: 현대 아반떼, 기아 스포티지)"
                      value={model}
                      onChange={e => setModel(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      차종 <span className="text-blue-600">*</span>
                    </label>
                    <select
                      className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 focus:outline-none"
                      value={carType}
                      onChange={e => setCarType(e.target.value)}>
                      <option value="">차종 선택</option>
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
                        className="mt-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="차종 직접 입력"
                        value={customCarType}
                        onChange={e => setCustomCarType(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      제조사 <span className="text-blue-600">*</span>
                    </label>
                    <select
                      className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 focus:outline-none"
                      value={manufacturer}
                      onChange={e => setManufacturer(e.target.value)}>
                      <option value="">제조사 선택</option>
                      <option value="현대">현대</option>
                      <option value="기아">기아</option>
                      <option value="쌍용">쌍용</option>
                      <option value="custom">직접 입력</option>
                    </select>
                    {manufacturer === 'custom' && (
                      <input
                        className="mt-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="제조사 직접 입력"
                        value={customManufacturer}
                        onChange={e => setCustomManufacturer(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      연식 <span className="text-blue-600">*</span>
                    </label>
                    <input
                      className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="연식 입력 (예: 2023)"
                      value={year}
                      onChange={e => setYear(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      색상
                    </label>
                    <input
                      className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="색상 입력"
                      value={color}
                      onChange={e => setColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* 단말기 정보 */}
              <div className="mb-8">
                <div className="mb-4 text-lg font-semibold text-gray-900">
                  단말기 정보
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      단말기 ID <span className="text-blue-600">*</span>
                    </label>
                    <input
                      disabled
                      className="cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-400 placeholder-gray-300 focus:outline-none"
                      placeholder="단말기 ID 입력"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-900">
                      단말기 유형 <span className="text-blue-600">*</span>
                    </label>
                    <select
                      disabled
                      className="cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-400 focus:outline-none">
                      <option>단말기 유형 선택</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* 버튼 */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                  onClick={handleReset}>
                  초기화
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700">
                  등록
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
