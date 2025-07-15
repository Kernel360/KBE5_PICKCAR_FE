import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import EmployeeTable from '@/components/employee/EmployeeTable'

export default function EmployeeManagement() {
  return (
    <div className="flex flex-col bg-[#f5f8fa] dark:bg-gray-900">
      <header className="flex bg-white dark:bg-gray-800">
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">사원 차량 할당</h1>
          </div>

          <div
            className={`min-h-[400px] flex-1 flex-col rounded-2xl bg-white p-0 shadow dark:bg-gray-800 dark:shadow-gray-700`}>
            <EmployeeTable refreshKey={0} />
          </div>
        </main>
      </div>
    </div>
  )
}
