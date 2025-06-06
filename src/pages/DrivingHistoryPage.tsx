import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DrivingHistoryTable from '@/components/history/DrivingHistoryTable'
import type {
  DrivingHistoryEntry,
  DrivingHistoryDetail
} from '@/types/drivingHistory'
import axios from 'axios'
import DrivingHistoryDetailModal from '@/components/history/DrivingHistoryDetailModal'

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

function DrivingHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [historyLogs, setHistoryLogs] = useState<DrivingHistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [selectedEntry, setSelectedEntry] =
    useState<DrivingHistoryEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detail, setDetail] = useState<DrivingHistoryDetail | null>(null)

  useEffect(() => {
    const fetchHistoryLogs = async () => {
      try {
        const response = await axios.get('/api/v1/history/list')
        console.log('API 응답:', response.data)
        setHistoryLogs(response.data.data)
        setError(null)
      } catch (error) {
        console.error('운행 기록을 가져오는데 실패했습니다:', error)
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              `서버 오류: ${error.response.status} - ${error.response.data.message || '알 수 없는 오류'}`
            )
          } else if (error.request) {
            setError(
              '서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.'
            )
          } else {
            setError('요청을 보내는 중 오류가 발생했습니다.')
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoryLogs()
  }, [])

  const handleViewHistoryDetails = async (logId: number) => {
    try {
      const res = await axios.get(`/api/v1/history/${logId}/detail`)
      console.log('상세 정보 응답:', res.data)
      setDetail(res.data.data)
      setIsModalOpen(true)
    } catch (error) {
      console.error('상세 정보 요청 실패:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEntry(null)
  }

  const filteredHistoryLogs = historyLogs.filter(
    log =>
      log.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.historyId.toString().includes(searchTerm)
  )

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-[#f5f8fa]">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-[#f5f8fa]">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-96px)] bg-[#f5f8fa] p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">운행 기록</h1>
      </header>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="운행 기록 검색 (차량번호, 운전자, ID)..."
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

      <DrivingHistoryDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        detail={detail}
      />
    </div>
  )
}

export default DrivingHistoryPage
