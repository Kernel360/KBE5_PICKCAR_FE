import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faChartSimple,
  faCar,
  faRoute,
  faClipboard,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'

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
  return (
    <aside className={STYLES.aside}>
      <div className={STYLES.title}>Pickcar</div>
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
    </aside>
  )
}
