interface TopBarProps {
  searchTerm: string
  setSearchTerm: (v: string) => void
}
const DrivingHistoryTopBar = ({ searchTerm, setSearchTerm }: TopBarProps) => (
  <div className="mb-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-gray-800">운행일지</h1>
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="운행일지 검색..."
        className="rounded border border-gray-300 bg-white px-3 py-3 text-sm"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ minWidth: 200 }}
      />
      <select className="rounded border border-gray-300 bg-white px-3 py-3 text-sm">
        <option>모든 차량12313</option>
      </select>
    </div>
  </div>
)
export default DrivingHistoryTopBar
