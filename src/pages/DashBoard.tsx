import React from 'react'
import '../main.css'
import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const doughnutData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }
  ]
}

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
}

const DashBoard: React.FC = () => {
  return (
    <div className="bg-[#f5f8fa] dark:bg-gray-900">
      <header>
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 p-6">
          <div className="flex"></div>
          <div className="mt-5 mr-3 flex h-full min-h-0 w-full flex-col justify-between">
            <div className="flex w-full flex-none flex-row items-center justify-between">
              <div className="stats flex flex-1 flex-row bg-white py-4 shadow dark:bg-gray-800 dark:shadow-gray-700">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FontAwesomeIcon
                      icon={faPerson}
                      size="xl"
                      color="#448dc5"
                    />
                  </div>
                  <div className="stat-title">총 등록 차량</div>
                  <div className="stat-value text-blue-500">120대</div>
                  <div className="stat-desc">전일 대비 00% 증가(감소)</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-blue-500">
                    <FontAwesomeIcon
                      icon={faPerson}
                      size="xl"
                      color="#53b295"
                    />
                  </div>
                  <div className="stat-title">예약된 차량</div>
                  <div className="stat-value text-success">76대</div>
                  <div className="stat-desc">전일 대비 00% 증가(감소)</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-warning">
                    <FontAwesomeIcon
                      icon={faPerson}
                      size="xl"
                      color="#e6c341"
                    />
                  </div>
                  <div className="stat-title">점검중인 차량</div>
                  <div className="stat-value text-warning">8대</div>
                  <div className="stat-desc">전일 대비 00% 증가(감소)</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary"></div>
                  <div className="stat-value">추가 예정</div>
                  <div className="stat-title">추가 예정</div>
                  <div className="stat-desc text-secondary">
                    31 tasks remaining
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5 flex min-h-0 flex-1 flex-row gap-14">
              <div className="bg-base-100 flex h-full flex-1 items-center justify-center rounded-2xl dark:bg-gray-800">
                <Doughnut data={doughnutData} />
              </div>
              <div className="bg-base-100 flex h-full flex-1 items-center justify-center rounded-2xl dark:bg-gray-800">
                <Line data={lineData} />
              </div>
            </div>

            <div className="mb-5 flex flex-none flex-row justify-between">
              <ul className="list bg-base-100 rounded-box flex pr-40 shadow-md dark:bg-gray-800 dark:shadow-gray-700">
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

              <ul className="list bg-base-100 rounded-box mx-10 flex flex-1 pr-40 shadow-md dark:bg-gray-800 dark:shadow-gray-700">
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
