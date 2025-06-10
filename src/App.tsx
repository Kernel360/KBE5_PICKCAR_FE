import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import TrackingCar from './pages/TrackingCar'
import DrivingHistoryPage from './pages/DrivingHistoryPage'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
