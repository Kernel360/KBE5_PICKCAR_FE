import Pagination from '@/components/common/Pagination'

interface BottomBarProps {
  page: number
  setPage: (v: number) => void
  totalPage: number
  filteredCount: number
}
const PAGE_SIZE = 10
const DrivingHistoryBottomBar = ({
  page,
  setPage,
  totalPage,
  filteredCount
}: BottomBarProps) => (
  <div className="mt-auto flex items-center justify-between pt-5 text-sm text-gray-500">
    <div>
      총 {filteredCount}개 중 {(page - 1) * PAGE_SIZE + 1}-
      {Math.min(page * PAGE_SIZE, filteredCount)} 표시
    </div>
    <Pagination
      current={page}
      total={totalPage}
      onChange={setPage}
    />
  </div>
)
export default DrivingHistoryBottomBar
