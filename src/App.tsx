import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Emulator from './pages/Emulator'
import Login from './pages/Login'
import TrackingCar from './pages/TrackingCar'
import DrivingHistoryPage from './pages/DrivingHistoryPage'

import EmployeeManagement from './pages/EmployeeManagement'
import VehicleManagement from './pages/VehicleManagement'
import DashBoard from './pages/DashBoard'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

function App() {
  return (
    <BrowserRouter>
      {/* 로그인 페이지 */}
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        {/* 실시간 관제 페이지 */}
        <Route
          path="/tracking"
          element={<TrackingCar />}
        />

        {/* 운행일지 페이지 */}
        <Route
          path="/driving-history"
          element={<DrivingHistoryPage />}
        />

        {/* 차량 등록/관리 페이지 */}
        <Route
          path="/vehicle/rental"
          element={<VehicleManagement />}
        />

        {/* 대시보드 페이지 */}
        <Route
          path="/dashboard"
          element={<DashBoard />}
        />

        {/* 사원 관리 페이지 */}
        <Route
          path="/employee/management"
          element={<EmployeeManagement />}
        />

        {/* 시동 페이지(사원전용) */}
        <Route
          path="/emulator"
          element={<Emulator />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
