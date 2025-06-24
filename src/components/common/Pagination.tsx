interface PaginationProps {
  current: number // 현재 페이지 (0부터 시작)
  total: number // 전체 페이지 개수 (1-base)
  onChange: (page: number) => void
}

const Pagination = ({ current, total, onChange }: PaginationProps) => (
  <div className="flex gap-2">
    <button
      className="btn btn-soft btn-default flex h-10 w-17 items-center justify-center rounded-xl text-base"
      onClick={() => onChange(current - 1)}
      disabled={current === 0}>
      이전
    </button>
    <button
      className="btn btn-soft btn-default flex h-10 w-17 items-center justify-center rounded-xl text-base"
      onClick={() => onChange(current + 1)}
      disabled={current >= total - 1}>
      다음
    </button>
  </div>
)

export default Pagination
