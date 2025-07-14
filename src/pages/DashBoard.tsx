import { useEffect, useState } from 'react'
import axios from '@/axiosConfig'
import '../main.css'
import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import VehicleReservationStat from '@/components/dailyreport/VehicleReservationStat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { DailyReportPreInfoResponse } from '@/types/dailyReport'
import ReportGraph from '@/components/dailyreport/ReportGraph'

const DashBoard: React.FC = () => {
  const [dailyReportData, setDailyReportData] =
    useState<DailyReportPreInfoResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDailyReportData = async () => {
      try {
        const response = await axios.get('/api/v1/report/pre-info')
        setDailyReportData(response.data)
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
    <div className="bg-[#f5f8fa]">
      <header>
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 p-6">
          <div className="flex"></div>
          <div className="mt-5 mr-3 flex h-full min-h-0 w-full flex-col justify-between">
            {dailyReportData && (
              <VehicleReservationStat
                currentData={dailyReportData.currentStat}
                yesterdayData={dailyReportData.yesterdayStat}
              />
            )}

            {dailyReportData && (
              <ReportGraph
                destinationStats={
                  dailyReportData.yesterdayDynamicInfo.destinationStats
                }
              />
            )}

            <div className="mb-5 flex flex-none flex-row justify-between">
              <ul className="list bg-base-100 rounded-box flex pr-40 shadow-md">
                <li className="p-4 pb-2 text-sm tracking-wide opacity-60">
                  어제 가장 많이 이동한 사원
                </li>

                <li className="list-row">
                  <div className="text-xl tabular-nums opacity-30">01</div>
                  <FontAwesomeIcon
                    icon={faPerson as IconProp}
                    className="rounded-box mt-1.5 ml-2 size-10"
                    size="xl"
                  />
                  <div className="list-col-grow">
                    <div>박총무</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      재무지원팀
                    </div>
                  </div>
                </li>

                <li className="list-row">
                  <div className="text-xl tabular-nums opacity-30">02</div>
                  <FontAwesomeIcon
                    icon={faPerson as IconProp}
                    className="rounded-box mt-1.5 ml-2 size-10"
                    size="xl"
                  />
                  <div className="list-col-grow">
                    <div>박총무</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      재무지원팀
                    </div>
                  </div>
                </li>

                <li className="list-row">
                  <div className="text-xl tabular-nums opacity-30">03</div>
                  <FontAwesomeIcon
                    icon={faPerson as IconProp}
                    className="rounded-box mt-1.5 ml-2 size-10"
                    size="xl"
                  />
                  <div className="list-col-grow">
                    <div>박총무</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      재무지원팀
                    </div>
                  </div>
                </li>
              </ul>

              <ul className="list bg-base-100 rounded-box mx-10 flex flex-1 pr-40 shadow-md">
                <li className="p-4 pb-2 text-sm tracking-wide opacity-60">
                  공지사항
                </li>

                <li className="list-row">
                  <div>
                    <p>06.30</p>
                  </div>
                  <div>
                    <div>사원 관리 시스템 점검 관련 건</div>
                  </div>
                </li>

                <li className="list-row">
                  <div>
                    <p>06.30</p>
                  </div>
                  <div>
                    <div>운행일지 시스템 점검 관련 건</div>
                  </div>
                </li>

                <li className="list-row">
                  <div>
                    <p>06.30</p>
                  </div>
                  <div>
                    <div>관제 시스템 점검 관련 건</div>
                  </div>
                </li>

                <li className="list-row">
                  <div>
                    <p>06.30</p>
                  </div>
                  <div>
                    <div>차량 시스템 점검 관련 건</div>
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
