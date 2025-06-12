import { NavLink } from 'react-router-dom'

const MENU_LIST = [
  { to: '/vehicle/rental', label: '차량 대여/회수', disabled: false },
  { to: '/vehicle/register', label: '차량 등록/해지', disabled: false },
  { to: '/vehicle/assign', label: '차량 할당/해지', disabled: true },
  { to: '/vehicle/status', label: '차량 상태변경', disabled: true }
] as const

const STYLES = {
  aside: 'my-10 w-60 rounded-2xl bg-white px-6 py-8 shadow',
  title: 'mb-8 text-lg font-bold',
  nav: 'flex flex-col gap-2 text-gray-600',
  link: 'rounded px-3 py-2 hover:bg-gray-100',
  activeLink: 'bg-blue-50 font-semibold text-blue-600',
  disabledLink: 'rounded px-3 py-2 text-gray-400 cursor-not-allowed'
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
        {MENU_LIST.map(menu =>
          menu.disabled ? (
            <div
              key={menu.label}
              className={STYLES.disabledLink}>
              {menu.label}
            </div>
          ) : (
            <NavLink
              key={menu.to}
              to={menu.to}
              end
              className={({ isActive }) =>
                `${STYLES.link} ${isActive ? STYLES.activeLink : ''}`
              }>
              {menu.label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  )
}
