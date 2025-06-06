import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // useNavigate 임포트
import DrivingHistoryTable from '@/components/history/DrivingHistoryTable'
import type { DrivingHistoryEntry } from '@/types/drivingHistory'

const sampleDrivingHistoryData: DrivingHistoryEntry[] = [
  {
    id: 'T001',
    vehicleNumber: '12가 3456',
    startTime: '2023-06-10 08:30',
    endTime: '2023-06-10 17:45',
    duration: '9시간 15분',
    distance: '78.5 km',
    location: '서울'
  },
  {
    id: 'T002',
    vehicleNumber: '34나 5678',
    startTime: '2023-06-11 09:15',
    endTime: '2023-06-11 16:30',
    duration: '7시간 15분',
    distance: '62.3 km',
    location: '부산'
  },
  {
    id: 'T003',
    vehicleNumber: '56다 7890',
    startTime: '2023-06-12 07:45',
    endTime: '2023-06-12 18:20',
    duration: '10시간 35분',
    distance: '112.7 km',
    location: '인천'
  },
  {
    id: 'T004',
    vehicleNumber: '78라 1234',
    startTime: '2023-06-13 10:00',
    endTime: '2023-06-13 15:30',
    duration: '5시간 30분',
    distance: '45.2 km',
    location: '대구'
  },
  {
    id: 'T005',
    vehicleNumber: '90마 5678',
    startTime: '2023-06-14 08:15',
    endTime: '2023-06-14 16:45',
    duration: '8시간 30분',
    distance: '67.8 km',
    location: '광주'
  }
]

function DrivingHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [historyLogs, setHistoryLogs] = useState<DrivingHistoryEntry[]>(
    sampleDrivingHistoryData
  )
  const navigate = useNavigate()

  const handleViewHistoryDetails = (logId: string) => {
    console.log('상세보기 클릭 (라우팅 예정):', logId)
    navigate(`/driving-history/${logId}`)
  }

  const filteredHistoryLogs = historyLogs.filter(
    log =>
      log.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-[calc(100vh-96px)] bg-[#f5f8fa] p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">운행 기록</h1>{' '}
        {/* 타이틀 변경 */}
      </header>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="운행 기록 검색 (차량번호, 위치, ID)..." // 플레이스홀더 변경
            className="w-full rounded-md border-gray-300 p-2.5 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </div>
      </div>

      <DrivingHistoryTable
        logs={filteredHistoryLogs}
        onViewDetails={handleViewHistoryDetails}
      />

      <div className="mt-6 text-sm text-gray-500">
        총 {filteredHistoryLogs.length}개 중 1-
        {Math.min(filteredHistoryLogs.length, 10)} 표시
      </div>
    </div>
  )
}

export default DrivingHistoryPage
