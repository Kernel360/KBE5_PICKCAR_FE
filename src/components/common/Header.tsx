import { Link } from 'react-router-dom'
import Logo from './Logo'

interface HeaderProps {
  activeMenu: string
}

function Header({ activeMenu }: HeaderProps) {
  const menus = [
    { name: '차량', url: '/vehicle/rental' },
    { name: '실시간 관제', url: '/tracking' },
    { name: '운행일지', url: '/driving-history', target: 'driving-history' },
    { name: '회원', url: '#' }
  ]

  return (
    <header className="flex h-16 w-full items-center bg-white px-6 shadow">
      <div className="flex items-center">
        <Link
          to="/vehicle/rental"
          className="flex items-center hover:opacity-80">
          <Logo />
          <span className="ml-2 text-lg font-medium text-gray-700">홈</span>
        </Link>
      </div>

      <nav className="flex flex-1 justify-center">
        <ul className="flex gap-8">
          {menus.map(menu => (
            <li key={menu.name}>
              <Link
                to={menu.url}
                className={
                  menu.target === activeMenu
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 우측: 유저 정보 */}
      <div className="flex items-center">
        <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
          JH
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold text-gray-800">임재현</span>
          <span className="text-xs text-gray-500">관리자</span>
        </div>
      </div>
    </header>
  )
}

export default Header
