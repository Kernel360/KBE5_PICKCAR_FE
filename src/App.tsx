import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import TrackingCar from './pages/TrackingCar'
import DrivingHistoryPage from './pages/DrivingHistoryPage'
import Rental from './pages/Vehicle/Rental'
import VehicleRegisterPage from '@/pages/Vehicle/Register'
import EmployeeManagement from './pages/EmployeeManagement'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/tracking"
          element={<TrackingCar />}
        />

        {/* 운행 기록 목록 페이지 */}
        <Route
          path="/driving-history"
          element={<DrivingHistoryPage />}
        />

        <Route
          path="/vehicle/rental"
          element={<Rental />}
        />

        <Route
          path="/vehicle/register"
          element={<VehicleRegisterPage />}
        />

        {/* 사원 관리 페이지 */}
        <Route
          path="/employee/management"
          element={<EmployeeManagement />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
