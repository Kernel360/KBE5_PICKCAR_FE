import React from 'react'

export default function ManagementAsideBar() {
  return (
    <aside className="w-60 bg-white px-6 py-8 shadow">
      <div className="mb-8 text-lg font-bold">차량 관리</div>
      <nav className="flex flex-col gap-2 text-gray-600">
        <a
          className="rounded px-3 py-2 hover:bg-gray-100"
          href="#">
          차량 등록/해지
        </a>
        <a
          className="rounded bg-blue-50 px-3 py-2 font-semibold text-blue-600"
          href="#">
          차량 대여/회수
        </a>
        <a
          className="rounded px-3 py-2 hover:bg-gray-100"
          href="#">
          차량 할당/해지
        </a>
        <a
          className="rounded px-3 py-2 hover:bg-gray-100"
          href="#">
          차량 상태변경
        </a>
      </nav>
    </aside>
  )
}
