import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Emulator from './pages/Emulator'
import Login from './pages/Login'
import TrackingCar from './pages/TrackingCar'
import DrivingHistoryPage from './pages/DrivingHistoryPage'

import EmployeeManagement from './pages/EmployeeManagement'
import VehicleManagement from './pages/VehicleManagement'
import DashBoard from './pages/DashBoard'
import Unauthorized from './pages/Unauthorized'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

config.autoAddCss = false

function App() {
  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <AuthProvider>
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
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <TrackingCar />
                </ProtectedRoute>
              }
            />

            {/* 운행일지 페이지 */}
            <Route
              path="/driving-history"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <DrivingHistoryPage />
                </ProtectedRoute>
              }
            />

            {/* 차량 등록/관리 페이지 */}
            <Route
              path="/vehicle/rental"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <VehicleManagement />
                </ProtectedRoute>
              }
            />

            {/* 대시보드 페이지 */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />

            {/* 사원 관리 페이지 */}
            <Route
              path="/employee/management"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <EmployeeManagement />
                </ProtectedRoute>
              }
            />

            {/* 시동 페이지(사원전용) */}
            <Route
              path="/emulator"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <Emulator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
