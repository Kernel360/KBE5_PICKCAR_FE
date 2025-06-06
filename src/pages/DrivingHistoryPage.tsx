import React, { useState, useEffect, useMemo } from 'react'
import DrivingHistoryTable from '@/components/history/DrivingHistoryTable'
import type {
  DrivingHistoryEntry,
  DrivingHistoryDetail
} from '@/types/drivingHistory'
import axios from 'axios'
import DrivingHistoryDetailModal from '@/components/history/DrivingHistoryDetailModal'
import Header from '@/components/common/Header'
import Pagination from '@/components/common/Pagination'
import LoadingScreen from '@/components/common/LoadingScreen'
import ErrorScreen from '@/components/common/ErrorScreen'
import DrivingHistoryTopBar from '@/components/history/DrivingHistoryTopBar'
import DrivingHistoryBottomBar from '@/components/history/DrivingHistoryBottomBar'

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

function DrivingHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [historyLogs, setHistoryLogs] = useState<DrivingHistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [setSelectedEntry] = useState<DrivingHistoryEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detail, setDetail] = useState<DrivingHistoryDetail | null>(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10
  const TABLE_MIN_HEIGHT = 400

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

  const handleViewHistoryDetails = async (historyId: number) => {
    try {
      const res = await axios.get(`/api/v1/history/${historyId}/detail`)
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

  const filteredHistoryLogs = useMemo(
    () =>
      historyLogs.filter(
        log =>
          log.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.historyId.toString().includes(searchTerm)
      ),
    [historyLogs, searchTerm]
  )

  const totalPage = Math.ceil(filteredHistoryLogs.length / PAGE_SIZE)
  const pagedLogs = useMemo(
    () => filteredHistoryLogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredHistoryLogs, page]
  )

  if (isLoading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fa]">
      <header className="bg-white">
        <Header activeMenu="driving-history" />
      </header>
      <main className="relative flex flex-1 flex-col p-6">
        <DrivingHistoryTopBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div
          className={`min-h-[400px] flex-1 flex-col rounded-2xl bg-white p-0 shadow`}>
          <DrivingHistoryTable
            logs={pagedLogs}
            onViewDetails={handleViewHistoryDetails}
          />
        </div>
        <DrivingHistoryBottomBar
          page={page}
          setPage={setPage}
          totalPage={totalPage}
          filteredCount={filteredHistoryLogs.length}
        />
        <DrivingHistoryDetailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          detail={detail}
        />
      </main>
    </div>
  )
}

export default DrivingHistoryPage
