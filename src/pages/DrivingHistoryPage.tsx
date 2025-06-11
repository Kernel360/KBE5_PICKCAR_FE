import { useState, useEffect, useMemo } from 'react'
import DrivingHistoryTable from '@/components/history/DrivingHistoryTable'
import type {
  DrivingHistoryEntry,
  DrivingHistoryDetail,
  CycleInfo
} from '@/types/drivingHistory'
import axios from 'axios'
import DrivingHistoryDetailModal from '@/components/history/DrivingHistoryDetailModal'
import Header from '@/components/common/Header'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detail, setDetail] = useState<DrivingHistoryDetail | null>(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  // 임시사용을 위한 주석처리, 변수 호출
  // [추가] 2. 모달에 표시할 이동 경로 데이터를 위한 상태
  const [detailPath, setDetailPath] = useState<{ lat: number; lng: number }[]>(
    []
  )

  useEffect(() => {
    const fetchHistoryLogs = async () => {
      try {
        const response = await axios.get('/api/v1/history/list')
        console.log('API 응답:', response.data)
        setHistoryLogs(response.data.data || [])
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

  // const handleViewHistoryDetails = async (historyId: number) => {
  //   // try {
  //   //   const res = await axios.get(`/api/v1/history/${historyId}/detail`)
  //   //   setDetail(res.data.data)
  //   //   setIsModalOpen(true)
  //   // } catch (error) {
  //   //   console.error('상세 정보 요청 실패:', error)
  //   // }
  //   const detailData = DETAIL_DATA.find(d => d.historyId === historyId)
  //   if (detailData) {
  //     setDetail(detailData)

  //     // historyId가 1일 경우에만 gpxPath를 경로로 설정
  //     if (historyId === 1) {
  //       // gpxPath의 lon을 lng로 변환하여 저장
  //       const polylinePath = gpxPath.map(p => ({ lat: p.lat, lng: p.lng }))
  //       setDetailPath(polylinePath)
  //     } else {
  //       // 다른 항목의 경우 빈 배열로 설정하여 경로가 표시되지 않도록 함
  //       setDetailPath([])
  //     }
  //   }
  //   setIsModalOpen(true)
  // }
  const handleViewHistoryDetails = async (historyId: number) => {
    console.log('111111')
    setIsModalOpen(true)
    setIsLoading(true)
    setDetail(null)
    setDetailPath([])

    try {
      // 1. 백엔드에 상세 정보 API를 호출
      const response = await axios.get(`/api/v1/history/${historyId}/detail`)
      const responseData = response.data.data

      // 2. 응답받은 전체 데이터를 detail state에 저장합니다.
      setDetail(responseData)

      // 3. [수정] 응답의 path (CycleInfo 객체 배열)에서 위도/경도를 추출하여
      //    지도(KakaoMap)가 필요로 하는 { lat, lng } 형태의 배열로 변환합니다.
      const polylineData =
        responseData.path?.map((cycle: CycleInfo) => ({
          lat: cycle.latitude,
          lng: cycle.longitude
        })) || []

      // 4. 변환된 경로 데이터를 detailPath state에 저장합니다.
      setDetailPath(polylineData)
    } catch (error) {
      console.error('상세 정보 요청 실패:', error)
      alert('상세 정보를 불러오는 데 실패했습니다.')
      setIsModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
          polylinePath={detailPath}
        />
      </main>
    </div>
  )
}

export default DrivingHistoryPage
