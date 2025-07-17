import { useEffect, useState } from 'react'
import axios from '@/axiosConfig'
import '../main.css'
// import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import VehicleReservationStat from '@/components/dailyreport/VehicleReservationStat'
import {
  DailyReportPreInfoResponse,
  VehicleReservationStat as VehicleReservationStatType
} from '@/types/dailyReport'
import ReportGraph from '@/components/dailyreport/ReportGraph'
import TotalDistanceRanking from '@/components/dailyreport/TotalDistanceRanking'

const DashBoard: React.FC = () => {
  const [dailyReportData, setDailyReportData] =
    useState<DailyReportPreInfoResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStat, setCurrentStat] =
    useState<VehicleReservationStatType | null>(null)

  useEffect(() => {
    const fetchDailyReportData = async () => {
      try {
        const response = await axios.get('/api/v1/report/pre-info')
        setDailyReportData(response.data)
        setCurrentStat(response.data.currentStat)
      } catch (error) {
        console.error('Failed to fetch daily report data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDailyReportData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-[#f5f8fa] dark:bg-gray-900">
      {/* <header>
        <Header />
      </header> */}

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 p-6">
          <div className="flex"></div>
          <div className="mt-5 mr-3 flex h-full min-h-0 w-full flex-col justify-between">
            {dailyReportData && currentStat && (
              <VehicleReservationStat
                currentData={currentStat}
                yesterdayData={dailyReportData.yesterdayStat}
                onRefreshCurrentStat={setCurrentStat}
              />
            )}

            {dailyReportData && (
              <ReportGraph
                destinationStats={
                  dailyReportData.yesterdayDynamicInfo.destinationStats
                }
                movedDistances={dailyReportData.movedDistances}
                yesterday={dailyReportData.yesterday}
              />
            )}

            <div className="mb-5 flex flex-none flex-row justify-between">
              {dailyReportData && (
                <TotalDistanceRanking
                  drivers={
                    dailyReportData.yesterdayDynamicInfo.top3DriversContext
                  }
                />
              )}

              <ul className="list bg-base-100 rounded-box mx-10 flex flex-1 pr-40 shadow-md dark:bg-gray-800 dark:text-white dark:shadow-gray-700">
                <li className="p-4 pb-2 text-sm font-bold tracking-wide text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                  공지사항
                </li>

                <li className="list-row">
                  <div>
                    <p className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      06.30
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      사원 관리 시스템 점검 관련 건
                    </div>
                  </div>
                </li>

                <li className="list-row">
                  <div>
                    <p className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      06.30
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      운행일지 시스템 점검 관련 건
                    </div>
                  </div>
                </li>

                <li className="list-row">
                  <div>
                    <p className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      06.30
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      관제 시스템 점검 관련 건
                    </div>
                  </div>
                </li>

                <li className="list-row">
                  <div>
                    <p className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      06.30
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-700 opacity-60 dark:bg-gray-800 dark:text-gray-200">
                      차량 시스템 점검 관련 건
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </div>
  )
}

export default DashBoard
