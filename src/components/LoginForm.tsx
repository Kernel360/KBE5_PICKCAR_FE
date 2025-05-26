import LogoBox from './common/Navigation'

function LoginForm() {
  return (
    <div className="mt-20 flex w-90 flex-col items-center rounded-2xl bg-white p-10 shadow-lg">
      <div className="mb-8 flex items-center">
        <LogoBox>P</LogoBox>
        <div>
          <div className="text-2xl font-bold text-[#222]">PickCar</div>
          <div className="text-sm text-[#888]">렌터카 차량 관제 서비스</div>
        </div>
      </div>
      <form className="flex w-full flex-col">
        <label className="mt-3 mb-1 text-sm text-[#222]">이메일</label>
        <input
          type="email"
          placeholder="이메일 주소를 입력하세요"
          className="mb-2 rounded-lg border border-gray-200 bg-[#f8fafc] p-3 text-base"
        />
        <label className="mt-3 mb-1 text-sm text-[#222]">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="mb-2 rounded-lg border border-gray-200 bg-[#f8fafc] p-3 text-base"
        />
        <div className="my-2 flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-1"
            />{' '}
            로그인 상태 유지
          </label>
          <a
            href="#"
            className="text-xs text-blue-500">
            비밀번호 찾기
          </a>
        </div>
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-blue-500 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700">
          로그인
        </button>
      </form>
    </div>
  )
}

export default LoginForm
