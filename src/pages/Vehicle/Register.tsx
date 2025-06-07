import React, { useState } from 'react'
import Header from '@/components/common/Header'
import VehicleAsideBar from '@/components/vehicle/common/VehicleAsideBar'
import RegisterCarInfoSection from '@/components/vehicle/register/RegisterCarInfoSection'

export default function VehicleRegisterPage() {
  const [manufacturer, setManufacturer] = useState('')
  const [customManufacturer, setCustomManufacturer] = useState('')
  const [carType, setCarType] = useState('')
  const [customCarType, setCustomCarType] = useState('')
  const [carNumber, setCarNumber] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [hasGps, setHasGps] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const requiredFields = [
      { value: carNumber, message: '차량번호를 입력해 주세요.' },
      { value: model, message: '모델명을 입력해 주세요.' },
      {
        value: carType && (carType !== 'custom' || customCarType),
        message: '차종을 입력해 주세요.'
      },
      {
        value:
          manufacturer && (manufacturer !== 'custom' || customManufacturer),
        message: '제조사를 입력해 주세요.'
      },
      { value: year, message: '연식을 입력해 주세요.' },
      { value: fuelType, message: '연료 타입을 선택해 주세요.' },
      { value: hasGps, message: 'GPS 여부를 선택해 주세요.' }
    ]
    const firstInvalid = requiredFields.find(f => !f.value)
    if (firstInvalid) {
      alert(firstInvalid.message)
      return
    }
    // 실제 등록 처리 로직...
    alert('등록이 완료되었습니다!')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fb]">
      <Header activeMenu="vehicle" />
      <div className="flex min-h-0 flex-1">
        <VehicleAsideBar />
        <main className="flex flex-1 items-center justify-center px-12 py-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white px-14 py-12 shadow-xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">차량 등록</h2>
            <form onSubmit={handleSubmit}>
              {/* 차량 정보 */}
              <RegisterCarInfoSection
                carNumber={carNumber}
                setCarNumber={setCarNumber}
                model={model}
                setModel={setModel}
                carType={carType}
                setCarType={setCarType}
                customCarType={customCarType}
                setCustomCarType={setCustomCarType}
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
                customManufacturer={customManufacturer}
                setCustomManufacturer={setCustomManufacturer}
                year={year}
                setYear={setYear}
                color={color}
                setColor={setColor}
                fuelType={fuelType}
                setFuelType={setFuelType}
                hasGps={hasGps}
                setHasGps={setHasGps}
              />
              {/* 버튼 */}
              <div className="flex justify-end gap-3">
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
