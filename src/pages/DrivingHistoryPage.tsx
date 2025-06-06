import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DrivingHistoryTable from '@/components/history/DrivingHistoryTable'
import type {
  DrivingHistoryEntry,
  DrivingHistoryDetail
} from '@/types/drivingHistory'
import axios from 'axios'
import DrivingHistoryDetailModal from '@/components/history/DrivingHistoryDetailModal'
import Header from '@/components/common/Header'

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
    <div className="flex min-h-screen flex-col bg-[#f5f8fa]">
      <header className="bg-white">
        <Header activeMenu="driving-history" />
      </header>
      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">운행일지</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="운행일지 검색..."
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ minWidth: 200 }}
            />
            <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
              <option>모든 차량</option>
            </select>
            <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
              <option>최근 30일</option>
              <option>최근 7일</option>
              <option>전체</option>
            </select>
            <button
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              type="button">
              내보내기
            </button>
          </div>
        </div>
        <div className="flex min-h-[400px] flex-col rounded-2xl bg-white p-0 shadow">
          <DrivingHistoryTable
            logs={filteredHistoryLogs}
            onViewDetails={handleViewHistoryDetails}
          />
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="text-sm text-gray-500">
            총 {filteredHistoryLogs.length}개 중 1-
            {Math.min(filteredHistoryLogs.length, 10)} 표시
          </div>
          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50">
              &lt;
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563eb] text-base font-bold text-white shadow">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50">
              &gt;
            </button>
          </div>
        </div>
        <DrivingHistoryDetailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          detail={detail}
        />
      </div>
    </div>
  )
}

export default DrivingHistoryPage
