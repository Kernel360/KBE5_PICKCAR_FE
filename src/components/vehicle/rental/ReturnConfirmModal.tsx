import React from 'react'

interface ReturnConfirmModalProps {
  company: string
  number: string
  info: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ReturnConfirmModal({
  company,
  number,
  info,
  onConfirm,
  onCancel
}: ReturnConfirmModalProps) {
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h3 className="mb-6 text-center text-lg font-bold text-gray-900">
          "{company}"으로부터
          <br />"{number}({info})"을(를) 회수 처리 하시겠습니까?
        </h3>
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
