const ErrorScreen = ({ message }: { message: string }) => (
  <div className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-[#f5f8fa]">
    <div className="rounded-lg bg-red-50 p-4 text-red-600">
      <p className="font-medium">오류가 발생했습니다</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
)
export default ErrorScreen
