import React from 'react'

interface RegisterCheckModalProps {
  carNumber: string
  model: string
  carType: string
  customCarType: string
  manufacturer: string
  customManufacturer: string
  year: string
  color: string
  fuelType: string
  hasGps: string
  onConfirm: () => void
  onCancel: () => void
}

export default function RegisterCheckModal({
  carNumber,
  model,
  carType,
  customCarType,
  manufacturer,
  customManufacturer,
  year,
  color,
  fuelType,
  hasGps,
  onConfirm,
  onCancel
}: RegisterCheckModalProps) {
  const getCarTypeLabel = () => (carType === 'custom' ? customCarType : carType)
  const getManufacturerLabel = () =>
    manufacturer === 'custom' ? customManufacturer : manufacturer

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          입력하신 내용으로 등록하시겠습니까?
        </h3>
        <ul className="mb-6 space-y-2 text-sm text-gray-700">
          <li>
            <b>차량번호:</b> {carNumber}
          </li>
          <li>
            <b>모델명:</b> {model}
          </li>
          <li>
            <b>차종:</b> {getCarTypeLabel()}
          </li>
          <li>
            <b>제조사:</b> {getManufacturerLabel()}
          </li>
          <li>
            <b>연식:</b> {year}
          </li>
          <li>
            <b>색상:</b> {color || '-'}
          </li>
          <li>
            <b>연료 타입:</b> {fuelType}
          </li>
          <li>
            <b>GPS 여부:</b> {hasGps}
          </li>
        </ul>
        <div className="flex justify-end gap-2">
          <button
            className="rounded border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50"
            onClick={onCancel}>
            취소
          </button>
          <button
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
