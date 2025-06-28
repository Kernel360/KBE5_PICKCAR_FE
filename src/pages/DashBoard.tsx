import React from 'react'
import '../main.css'
import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const DashBoard: React.FC = () => {
  return (
    <div className="bg-[#f5f8fa]">
      <header>
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 p-6">
          <div className="flex"></div>
          <div className="mt-5 mr-3 flex min-h-0 w-full flex-col justify-between">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="stats flex flex-1 flex-row bg-white py-4 shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FontAwesomeIcon
                      icon={faPerson}
                      size="xl"
                    />
                  </div>
                  <div className="stat-title">Total Likes</div>
                  <div className="stat-value text-primary">25.6K</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <FontAwesomeIcon icon={faPerson} />
                  </div>
                  <div className="stat-title">Page Views</div>
                  <div className="stat-value text-secondary">2.6M</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <FontAwesomeIcon icon={faPerson} />
                  </div>
                  <div className="stat-title">Page Views</div>
                  <div className="stat-value text-secondary">2.6M</div>
                  <div className="stat-desc">21% more than last month</div>
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

            <div className="mx-10 flex w-full flex-row justify-between gap-14">
              <div></div>

              <div></div>
            </div>

            <div className="mb-5 flex flex-row justify-between">
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
