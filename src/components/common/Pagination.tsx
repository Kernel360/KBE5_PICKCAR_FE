import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationProps {
  current: number // 현재 페이지 (0부터 시작)
  total: number // 전체 페이지 개수 (1-base)
  onChange: (page: number) => void
}

const Pagination = ({ current, total, onChange }: PaginationProps) => (
  <div className="flex gap-2">
    <button
      className="btn flex h-10 w-12 justify-center rounded-xl bg-blue-200 text-base"
      onClick={() => onChange(current - 1)}
      disabled={current === 0}>
      <FontAwesomeIcon
        icon={faCaretLeft as IconProp}
        size="2xl"
        color="#111111"
      />
    </button>
    <button
      className="btn flex h-10 w-12 items-center justify-center rounded-xl bg-blue-200 text-base"
      onClick={() => onChange(current + 1)}
      disabled={current >= total - 1}>
      <FontAwesomeIcon
        icon={faCaretRight as IconProp}
        size="2xl"
        color="#111111"
      />
    </button>
  </div>
)

export default Pagination
