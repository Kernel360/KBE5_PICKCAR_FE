import React, { useEffect } from 'react'

interface ReturnConfirmModalProps {
  company: string
  number: string
  info: string
  onConfirm: () => void
  onCancel: () => void
}

const buttonBaseStyles = 'rounded px-6 py-2 transition-colors duration-200'
const buttonStyles = {
  cancel: `${buttonBaseStyles} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50`,
  confirm: `${buttonBaseStyles} bg-blue-600 text-white hover:bg-blue-700`
}

export default function ReturnConfirmModal({
  company,
  number,
  info,
  onConfirm,
  onCancel
}: ReturnConfirmModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onCancel])

  return (
    <div
      className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm transition-opacity duration-300"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl transition-transform duration-300"
        onClick={e => e.stopPropagation()}>
        <h3
          id="modal-title"
          className="mb-6 text-center text-lg font-bold text-gray-900">
          "{company}"으로부터
          <br />"{number}({info})"을(를) 회수 처리 하시겠습니까?
        </h3>
        <div className="flex justify-end gap-2">
          <button
            className={buttonStyles.cancel}
            onClick={onCancel}
            type="button">
            취소
          </button>
          <button
            className={buttonStyles.confirm}
            onClick={onConfirm}
            type="button"
            autoFocus>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
