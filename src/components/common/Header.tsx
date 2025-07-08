import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Logo from './Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  userRole?: string;
}

function Header({ userRole }: HeaderProps) {
  const navigate = useNavigate();
  const displayRole = userRole === 'EMPLOYEE' ? '사원' : '관리자';
  const linkTo = userRole === 'EMPLOYEE' ? '/emulator' : '/dashboard';
  
  // accessToken 확인
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = !!accessToken;

  // useEffect로 로그인 상태 체크
  useEffect(() => {
    if (!isLoggedIn) {
      console.log('로그인되지 않음 - 홈으로 이동');
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-6 shadow">
      <div className="flex items-center">
        <Link
          to={linkTo}
          className="flex items-center hover:opacity-80">
          <Logo />
          <span className="ml-2 text-lg font-medium text-gray-700">
            PickCar
          </span>
        </Link>
      </div>

      <div className="flex items-center">
        {userRole !== 'EMPLOYEE' && (
          <div className="mx-10 flex flex-row">
            <div className="mx-2 mt-2 inline-grid *:[grid-area:1/1]">
              <div className="status status-success animate-ping"></div>
              <div className="status status-success"></div>
            </div>{' '}
            <p className="text-gray-500">관제 시스템 정상</p>
          </div>
        )}

        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
          <FontAwesomeIcon
            icon={faUser as IconProp}
            size="lg"
            className="rounded px-3 py-3 outline"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-extrabold text-gray-500">{displayRole}</span>
        </div>
        
        <button
          onClick={handleLogout}
          className="ml-4 flex items-center rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
        >
          <FontAwesomeIcon
            icon={faSignOutAlt as IconProp}
            className="mr-2"
          />
          로그아웃
        </button>
      </div>
    </header>
  )
}

export default Header
