import React, { useState } from 'react'
import Header from '@/components/common/Header'
import VehicleAsideBar from '@/components/vehicle/common/VehicleAsideBar'
import RegisterCarInfoSection from '@/components/vehicle/register/RegisterCarInfoSection'
import RegisterCheckModal from '@/components/vehicle/register/RegisterCheckModal'
import { registerVehicle } from '@/types/vehicle'

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
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

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
    setShowConfirmModal(true)
  }

  const handleConfirm = async () => {
    try {
      // fuelType 매핑
      const fuelTypeMap: { [key: string]: string } = {
        LPG: 'LPG',
        휘발유: 'PETROL',
        경유: 'DIESEL',
        전기: 'ELECTRIC',
        기타: 'PETROL' // 기타는 기본값으로 휘발유로 설정
      }

      const request = {
        vehicleInfo: {
          model: model,
          color: color,
          licensePlate: carNumber,
          carAge: year,
          brandName:
            manufacturer === 'custom' ? customManufacturer : manufacturer,
          fuelType: fuelTypeMap[fuelType] || 'PETROL'
        },
        hasGps: hasGps === '예'
      }

      await registerVehicle(request)
      setShowConfirmModal(false)
      setIsRegistered(true)
      setTimeout(() => setIsRegistered(false), 1500)
    } catch (error) {
      console.error('차량 등록 실패:', error)
      alert(
        error instanceof Error ? error.message : '차량 등록에 실패했습니다.'
      )
    }
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
            {/* 등록 확인 모달 */}
            {showConfirmModal && (
              <RegisterCheckModal
                carNumber={carNumber}
                model={model}
                carType={carType}
                customCarType={customCarType}
                manufacturer={manufacturer}
                customManufacturer={customManufacturer}
                year={year}
                color={color}
                fuelType={fuelType}
                hasGps={hasGps}
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirmModal(false)}
              />
            )}
            {/* 등록 완료 안내 */}
            {isRegistered && (
              <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
                <div className="rounded-xl bg-white px-8 py-6 text-center text-lg font-semibold text-blue-600 shadow-xl">
                  등록이 완료되었습니다!
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
