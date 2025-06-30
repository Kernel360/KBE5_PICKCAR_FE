import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-6 shadow">
      <div className="flex items-center">
        <Link
          to="/vehicle/rental"
          className="flex items-center hover:opacity-80">
          <Logo />
          <span className="ml-2 text-lg font-medium text-gray-700">
            PickCar
          </span>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="mx-10 flex flex-row">
          <div className="mx-2 mt-2 inline-grid *:[grid-area:1/1]">
            <div className="status status-success animate-ping"></div>
            <div className="status status-success"></div>
          </div>{' '}
          <p className="text-gray-500">관제 시스템 정상</p>
        </div>

        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
          <FontAwesomeIcon
            icon={faUser as IconProp}
            size="lg"
            className="rounded px-3 py-3 outline"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-extrabold text-gray-500">관리자</span>
        </div>
      </div>
    </header>
  )
}

export default Header
