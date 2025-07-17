import { useState, useEffect } from 'react'
import DrivingHistoryTable from '@/components/history/DrivingHistoryTable'
import type {
  DrivingHistoryEntry,
  DrivingHistoryDetail,
  DrivingHistoryFilter
} from '@/types/drivingHistory'
import type { PaginationState } from '@/types/common/Pagination'
import axios from '../axiosConfig'
import { isAxiosError } from 'axios'
import DrivingHistoryDetailModal from '@/components/history/DrivingHistoryDetailModal'
// import Header from '@/components/common/Header'
import LoadingScreen from '@/components/common/LoadingScreen'
import DrivingHistoryTopBar from '@/components/history/DrivingHistoryTopBar'
import DrivingHistoryBottomBar from '@/components/history/DrivingHistoryBottomBar'
import SideMenuBar from '@/components/common/SideMenuBar'

function DrivingHistoryPage() {
  // 오늘 날짜 계산
  const today = new Date()
  const toDate = today.toISOString().slice(0, 10) + 'T23:59:59'
  const fromDateObj = new Date(today)
  fromDateObj.setDate(today.getDate() - 30)
  const fromDate = fromDateObj.toISOString().slice(0, 10) + 'T00:00:00' //from은 30일 전 00:00, to는 오늘 11:59

  const [filter, setFilter] = useState<DrivingHistoryFilter>({
    from: fromDate,
    to: toDate,
    driverName: ''
  })
  const [historyLogs, setHistoryLogs] = useState<DrivingHistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detail, setDetail] = useState<DrivingHistoryDetail | null>(null)
  const [page, setPage] = useState(1)
  const [size] = useState(10)
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0
  })

  // 임시사용을 위한 주석처리, 변수 호출
  // [추가] 2. 모달에 표시할 이동 경로 데이터를 위한 상태
  const [detailPath, setDetailPath] = useState<{ lat: number; lng: number }[]>(
    []
  )

  // API 호출
  const fetchHistoryLogs = async (pageParam = page) => {
    setIsLoading(true)
    try {
      console.log(filter.driverName)

      const response = await axios.get('/api/v1/history/list', {
        params: {
          from: filter.from,
          to: filter.to,
          driverName: filter.driverName || undefined,
          page: pageParam,
          size
        }
      })

      const resData = response.data.data
      setHistoryLogs(resData.content || [])
      setPagination({
        page: resData.page.number,
        size: resData.page.size,
        totalPages: resData.page.totalPages,
        totalElements: resData.page.totalElements
      })
      setError(null)
    } catch (error) {
      console.error('운행 기록을 가져오는데 실패했습니다:', error)
      if (isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data
          if (data && data.errorReason && data.errorReason.reason) {
            setError(data.errorReason.reason)
          } else {
            setError(
              `서버 오류: ${error.response.status} - ${data.message || '알 수 없는 오류'}`
            )
          }
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
      // 에러 발생 시에도 pagination을 안전하게 초기화
      setPagination({
        page: 0,
        size: 10,
        totalPages: 1,
        totalElements: 0
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 최초 마운트 시 1회 호출
  useEffect(() => {
    fetchHistoryLogs(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TopBar에서 검색 버튼 클릭 시 호출
  const handleSearch = () => {
    setPage(0)
    fetchHistoryLogs(0)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    fetchHistoryLogs(newPage)
  }

  const handleViewHistoryDetails = async (historyId: number) => {
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

      console.log(responseData.paths)
      const polylineData =
        responseData.paths?.map(
          (point: { latitude: number; longitude: number }) => ({
            lat: point.latitude,
            lng: point.longitude
          })
        ) || []

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

  return (
    <div className="flex flex-col bg-[#f5f8fa] dark:bg-gray-900">
      {/* <header className="bg-white dark:bg-gray-800">
        <Header />
      </header> */}

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-3 flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col p-6">
          <DrivingHistoryTopBar
            filter={filter}
            setFilter={setFilter}
            onSearch={handleSearch}
          />
          <div
            className={`min-h-[400px] flex-1 flex-col rounded-2xl bg-white p-0 shadow dark:bg-gray-800 dark:shadow-gray-700`}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <DrivingHistoryTable
                logs={historyLogs}
                onViewDetails={handleViewHistoryDetails}
                error={error}
              />
            )}
          </div>
          <DrivingHistoryBottomBar
            page={pagination?.page ?? 1}
            setPage={handlePageChange}
            totalPage={pagination?.totalPages ?? 1}
            totalElements={pagination?.totalElements ?? 0}
          />
          <DrivingHistoryDetailModal
            open={isModalOpen}
            onClose={handleCloseModal}
            detail={detail}
            polylinePath={detailPath}
          />
        </main>
      </div>
    </div>
  )
}

export default DrivingHistoryPage
