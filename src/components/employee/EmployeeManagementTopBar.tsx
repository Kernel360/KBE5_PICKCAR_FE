import React from 'react'

interface EmployeeManagementTopBarProps {
  onAddEmployee: () => void
}

const EmployeeManagementTopBar: React.FC<EmployeeManagementTopBarProps> = ({
  onAddEmployee
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">사원 관리</h1>
      <button
        onClick={onAddEmployee}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        사원 추가
      </button>
    </div>
  )
}

export default EmployeeManagementTopBar
