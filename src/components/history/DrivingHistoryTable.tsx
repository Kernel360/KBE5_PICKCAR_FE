import type { DrivingHistoryEntry } from '@/types/drivingHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'

interface DrivingHistoryTableProps {
  logs: DrivingHistoryEntry[]
  onViewDetails: (logId: number) => void
  error?: string | null
}

function DrivingHistoryTable({
  logs,
  onViewDetails,
  error
}: DrivingHistoryTableProps) {
  if (error) {
    return (
      <p className="py-12 text-center text-lg font-semibold text-red-300">
        {error}
      </p>
    )
  }
  if (!logs || logs.length === 0) {
    return (
      <p className="items-center justify-center py-4 text-center text-gray-500">
        표시할 운행 기록이 없습니다.
      </p>
    )
  }

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(1)} km`
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="table-zebra text-m table min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              ID
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              차량번호
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              운전자
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              시작 시간
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              종료 시간
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              운행 시간
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              이동 거리
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.map(log => (
            <tr
              key={log.historyId}
              className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {log.historyId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {log.licensePlate}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {log.driverName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {formatDateTime(log.drivingStartedAt)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {formatDateTime(log.drivingEndedAt)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {log.totalDrivingTime}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {formatDistance(log.totalDistance)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                <FontAwesomeIcon
                  icon={faFileLines as IconProp}
                  size="lg"
                  onClick={() => onViewDetails(log.historyId)}
                  className="rounded px-3 py-3 outline hover:bg-gray-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DrivingHistoryTable
