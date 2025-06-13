/**
 * 지도 위에 표시될 간단한 조작
 */

interface MapControlsProps {
  title: string
  onReset: () => void
  // 필요에 따라 필터 옵션, 현재 필터 값, 이벤트 핸들러 등을 props로 추가
  // onFilterChange?: (filterValue: string) => void;
  // onZoomIn?: () => void;
  // onZoomOut?: () => void;
}

function MapControls({ title, onReset }: MapControlsProps): React.ReactElement {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-lg font-bold">{title}</span>
      <div className="flex items-center gap-2">
        {/** todo: 동적으로 구현  */}
        <select
          className="rounded border p-2 text-sm"
          disabled>
          <option>전체 지역</option>
        </select>
        <button
          onClick={onReset}
          className="rounded border p-2 text-gray-400 hover:text-blue-500"
          title="초기화">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24">
            <path
              d="M12 4v16m8-8H4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MapControls
