import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faChartSimple,
  faCar,
  faRoute,
  faClipboard,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'
import { useAuth } from '../AuthContext'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const MENU_LIST = [
  { to: '/dashboard', label: '대시보드', icon: faChartSimple },
  { to: '/tracking', label: '실시간 관제', icon: faRoute },
  { to: '/vehicle/rental', label: '차량 등록/관리', icon: faCar },
  { to: '/driving-history', label: '운행일지', icon: faClipboard },
  { to: '/employee/management', label: '사원 차량 할당', icon: faUserTie }
] as const

const STYLES = {
  aside: 'my-10 w-72 rounded-2xl bg-white px-6 py-8 shadow gap-2',
  title: 'mb-8 text-lg font-bold',
  nav: 'flex flex-col gap-2 text-gray-600',
  link: 'rounded px-3 py-2 hover:bg-gray-100',
  activeLink: 'bg-blue-50 font-semibold text-blue-600 gap-2',
  disabledLink: 'rounded px-3 py-2 text-gray-400 cursor-not-allowed'
} as const

export default function VehicleAsideBar() {
  const navigate = useNavigate()
  const { role, userName, logout } = useAuth()
  const displayName = userName || ' '
  const linkTo = role === 'EMPLOYEE' ? '/emulator' : '/dashboard'

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <aside className="flex h-screen w-72 flex-col rounded-r-2xl bg-white px-6 py-8 shadow">
      {/* 상단: 로고+PickCar+사용자이름, 구분선, 네비게이션 메뉴 */}
      <div>
        <div className="mb-4 flex items-center">
          <Link to={linkTo}>{' '}
            <Logo />{' '}
          </Link>
          <div className="ml-0 flex flex-col">
            <span className="text-lg font-medium text-gray-700">PickCar</span>
            <span className="text-sm font-extrabold text-gray-500">
              {displayName} 님
            </span>
          </div>
        </div>
        <div className="my-4 w-full border-b border-gray-200" />
        <nav className={STYLES.nav}>
          {MENU_LIST.map(menu => (
            <NavLink
              key={menu.to}
              to={menu.to}
              end
              className={({ isActive }) =>
                `${STYLES.link} ${isActive ? STYLES.activeLink : ''}`
              }>
              <div className="py-1.5">
                <FontAwesomeIcon
                  icon={menu.icon as IconProp}
                  size="lg"
                />
                <span className="ml-5">{menu.label}</span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
      {/* 하단: 관제 시스템 정상, 로그아웃 버튼 */}
      <div className="mt-auto flex flex-col gap-2 px-2 pb-2">
        {role !== 'EMPLOYEE' && (
          <div className="mb-2 flex items-center">
            <div className="mr-2 inline-grid *:[grid-area:1/1]">
              <div className="status status-success animate-ping"></div>
              <div className="status status-success"></div>
            </div>
            <span className="text-sm text-gray-500">관제 시스템 정상</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center border-none bg-transparent p-0 text-sm font-medium text-gray-500 transition hover:text-red-500"
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="mr-2"
          />
          로그아웃
        </button>
      </div>
    </aside>
  )
}
