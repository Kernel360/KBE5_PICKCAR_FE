interface PaginationProps {
  current: number // 현재 페이지 (0부터 시작)
  total: number // 전체 페이지 개수 (1-base)
  onChange: (page: number) => void
}

const Pagination = ({ current, total, onChange }: PaginationProps) => (
  <div className="flex gap-2">
    <button
      className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50"
      onClick={() => onChange(current - 1)}
      disabled={current === 0}>
      &lt;
    </button>
    <button
      className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f7f9fb] text-base text-gray-500 hover:bg-blue-50"
      onClick={() => onChange(current + 1)}
      disabled={current >= total - 1}>
      &gt;
    </button>
  </div>
)

export default Pagination
