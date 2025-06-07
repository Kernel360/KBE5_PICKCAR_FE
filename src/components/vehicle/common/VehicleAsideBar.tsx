import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ManagementAsideBar() {
  return (
    <aside className="my-10 w-60 rounded-2xl bg-white px-6 py-8 shadow">
      <div className="mb-8 text-lg font-bold">차량 관리</div>
      <nav className="flex flex-col gap-2 text-gray-600">
        <NavLink
          to="/vehicle/rental"
          className={({ isActive }) =>
            `rounded px-3 py-2 hover:bg-gray-100 ${isActive ? 'bg-blue-50 font-semibold text-blue-600' : ''}`
          }>
          차량 대여/회수
        </NavLink>
        <NavLink
          to="/vehicle/register"
          className={({ isActive }) =>
            `rounded px-3 py-2 hover:bg-gray-100 ${isActive ? 'bg-blue-50 font-semibold text-blue-600' : ''}`
          }>
          차량 등록/해지
        </NavLink>
        <NavLink
          to="/vehicle/assign"
          className={({ isActive }) =>
            `rounded px-3 py-2 hover:bg-gray-100 ${isActive ? 'bg-blue-50 font-semibold text-blue-600' : ''}`
          }>
          차량 할당/해지
        </NavLink>
        <NavLink
          to="/vehicle/status"
          className={({ isActive }) =>
            `rounded px-3 py-2 hover:bg-gray-100 ${isActive ? 'bg-blue-50 font-semibold text-blue-600' : ''}`
          }>
          차량 상태변경
        </NavLink>
      </nav>
    </aside>
  )
}
