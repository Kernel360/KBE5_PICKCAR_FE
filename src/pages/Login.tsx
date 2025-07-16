import LoginForm from '../components/LoginForm'
import Logo from '../components/common/Logo'

function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src="/pexels-bertellifotografia-799443.jpg"
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-110"
      />
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/30" />
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex h-[80vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white/20 shadow-2xl backdrop-blur-sm">
        {/* 좌측: 타이틀/설명 */}
        <div className="flex flex-1 flex-col justify-center bg-black/10 p-12 text-white">
          <h2 className="mb-4 text-3xl font-extrabold drop-shadow-lg md:text-4xl">
            Let's Get Started
          </h2>
          <p className="text-base font-medium opacity-90 drop-shadow md:text-base">
            차량 관제 시스템에 오신 것을 환영합니다.
            <br />
            스마트한 차량 관리와 실시간 모니터링을 경험하세요.
          </p>
        </div>
        {/* 우측: 로그인 폼 */}
        <div className="flex flex-1 items-center justify-center bg-black/10">
          <div className="w-full max-w-xs rounded-2xl bg-black/30 p-12 shadow-2xl">
            {/* PickCar 로고만 */}
            <div className="mb-8 flex items-center justify-center">
              <Logo />
              <span className="ml-2 text-2xl font-bold text-white">
                PickCar
              </span>
            </div>
            {/* 로그인 폼 - 회원가입 문구를 버튼 위로 */}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
