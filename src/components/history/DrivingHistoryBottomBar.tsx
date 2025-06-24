import Pagination from '@/components/common/Pagination'

interface BottomBarProps {
  page: number // 0-base
  setPage: (v: number) => void
  totalPage: number // 전체 페이지 수 (0-base)
  totalElements: number
}
const PAGE_SIZE = 10
const DrivingHistoryBottomBar = ({
  page,
  setPage,
  totalPage,
  totalElements
}: BottomBarProps) => {
  const start = totalElements === 0 ? 0 : page * PAGE_SIZE + 1
  const end =
    totalElements === 0 ? 0 : Math.min((page + 1) * PAGE_SIZE, totalElements)

  return (
    <div className="mt-auto flex items-center justify-between pt-5 text-sm text-gray-500">
      <div>
        총 {totalElements}개 중 {start}-{end} 표시
      </div>
      <Pagination
        current={page}
        total={totalPage}
        onChange={setPage}
      />
    </div>
  )
}
export default DrivingHistoryBottomBar
