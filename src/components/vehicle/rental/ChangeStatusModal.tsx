import { VehicleStatus } from '@/types/vehicle'

interface ChangeStatusModalProps {
  carNumber: string
  selectedStatus: string
  onSelect: (status: string) => void
  onConfirm: () => void
  onCancel: () => void
}

const statusOptions = [
  { value: VehicleStatus.OPERABLE, label: '운행 가능' },
  { value: VehicleStatus.UNDER_INSPECTION, label: '점검중' },
  { value: VehicleStatus.DAMAGED, label: '파손됨' }
]

export default function ChangeStatusModal({
  carNumber,
  selectedStatus,
  onSelect,
  onConfirm,
  onCancel
}: ChangeStatusModalProps) {
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">
            차량 상태 변경
          </h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={onCancel}
            aria-label="닫기">
            &times;
          </button>
        </div>
        {/* 차량 번호 */}
        <div className="mb-6 text-base text-gray-400">
          차량 번호: {carNumber}
        </div>
        {/* 상태 선택 */}
        <div className="mb-8 space-y-3">
          {statusOptions.map(option => {
            let selectedClass = ''
            if (selectedStatus === option.value) {
              switch (option.value) {
                case VehicleStatus.OPERABLE:
                  selectedClass = 'bg-green-100 text-green-700'
                  break
                case VehicleStatus.UNDER_INSPECTION:
                  selectedClass = 'bg-yellow-200 text-black-500'
                  break
                case VehicleStatus.DAMAGED:
                  selectedClass = 'bg-red-100 text-red-500'
                  break
                default:
                  selectedClass = ''
              }
            } else {
              selectedClass = 'bg-gray-50 text-gray-400'
            }
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option.value)}
                className={`flex w-full items-center justify-between rounded-xl px-6 py-4 text-lg font-medium transition ${selectedClass}`}>
                <span>{option.label}</span>
                <span className="ml-2 flex h-6 w-6 items-center justify-center">
                  {selectedStatus === option.value ? (
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#22C55E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
              </button>
            )
          })}
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
            disabled={!selectedStatus}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
