import Pagination from '@/components/common/Pagination'

interface VehicleBottomBarProps {
  filteredCount: number
  startIndex: number
  endIndex: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function VehicleBottomBar({
  filteredCount,
  startIndex,
  endIndex,
  currentPage,
  totalPages,
  onPageChange
}: VehicleBottomBarProps) {
  return (
    <div className="my-2 flex h-12 w-full items-center justify-between gap-4 border-t border-gray-100 px-4">
      <div className="text-sm text-gray-500">
        총 {filteredCount}개 중 {startIndex + 1}-
        {Math.min(endIndex, filteredCount)} 개 표시
      </div>
      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
    </div>
  )
}
