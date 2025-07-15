import type { DrivingHistoryEntry } from '@/types/drivingHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCompass } from '@fortawesome/free-regular-svg-icons'

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
      <p className="py-12 text-center text-lg font-semibold text-red-300 dark:text-red-400">
        {error}
      </p>
    )
  }
  if (!logs || logs.length === 0) {
    return (
      <p className="items-center justify-center py-4 text-center text-gray-500 dark:text-gray-400">
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
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">
      <table className="table-zebra text-m table">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              ID
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              차량번호
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              운전자
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              시작 시간
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              종료 시간
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              운행 시간
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              이동 거리
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
          {logs.map(log => (
            <tr
              key={log.historyId}
              className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {log.historyId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {log.licensePlate}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {log.driverName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {formatDateTime(log.drivingStartedAt)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {formatDateTime(log.drivingEndedAt)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {log.totalDrivingTime}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {formatDistance(log.totalDistance)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                <FontAwesomeIcon
                  icon={faCompass as IconProp}
                  size="xl"
                  color="#111111"
                  onClick={() => onViewDetails(log.historyId)}
                  className="rounded-2xl p-1 hover:bg-gray-200 dark:hover:bg-gray-600"
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
