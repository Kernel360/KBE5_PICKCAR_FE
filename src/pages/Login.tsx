import LoginForm from '../components/LoginForm'

const LoginPage = () => (
  <div className="flex min-h-screen flex-col items-center bg-[#f5f8fa]">
    <div className="mt-4 ml-4 self-start text-base text-[#bdbdbd]">
      로그인 페이지
    </div>
    <LoginForm />
  </div>
)

export default LoginPage
