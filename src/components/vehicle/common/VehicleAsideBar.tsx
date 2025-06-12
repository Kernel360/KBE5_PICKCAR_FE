import { NavLink } from 'react-router-dom'

const MENU_LIST = [
  { to: '/vehicle/rental', label: '차량 대여/회수' },
  { to: '/vehicle/register', label: '차량 등록/해지' },
  { to: '/vehicle/assign', label: '차량 할당/해지' },
  { to: '/vehicle/status', label: '차량 상태변경' }
] as const

const STYLES = {
  aside: 'my-10 w-60 rounded-2xl bg-white px-6 py-8 shadow',
  title: 'mb-8 text-lg font-bold',
  nav: 'flex flex-col gap-2 text-gray-600',
  link: 'rounded px-3 py-2 hover:bg-gray-100',
  activeLink: 'bg-blue-50 font-semibold text-blue-600'
} as const

export default function VehicleAsideBar() {
  return (
    <aside
      className={STYLES.aside}
      aria-label="차량 관리 사이드바">
      <div className={STYLES.title}>차량 관리</div>
      <nav
        className={STYLES.nav}
        aria-label="차량 관리 메뉴">
        {MENU_LIST.map(menu => (
          <NavLink
            key={menu.to}
            to={menu.to}
            className={({ isActive }) =>
              `${STYLES.link} ${isActive ? STYLES.activeLink : ''}`
            }>
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
