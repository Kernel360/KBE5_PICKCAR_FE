import React from 'react'
import { NavLink } from 'react-router-dom'

const menuList = [
  { to: '/vehicle/rental', label: '차량 대여/회수' },
  { to: '/vehicle/register', label: '차량 등록/해지' },
  { to: '/vehicle/assign', label: '차량 할당/해지' },
  { to: '/vehicle/status', label: '차량 상태변경' }
]

export default function VehicleAsideBar() {
  return (
    <aside
      className="my-10 w-60 rounded-2xl bg-white px-6 py-8 shadow"
      aria-label="차량 관리 사이드바">
      <div className="mb-8 text-lg font-bold">차량 관리</div>
      <nav
        className="flex flex-col gap-2 text-gray-600"
        aria-label="차량 관리 메뉴">
        {menuList.map(menu => (
          <NavLink
            key={menu.to}
            to={menu.to}
            className={({ isActive }) =>
              `rounded px-3 py-2 hover:bg-gray-100 ${isActive ? 'bg-blue-50 font-semibold text-blue-600' : ''}`
            }>
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
