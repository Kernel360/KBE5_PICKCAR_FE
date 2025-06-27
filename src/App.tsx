import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import TrackingCar from './pages/TrackingCar'
import DrivingHistoryPage from './pages/DrivingHistoryPage'
import VehicleManagement from './pages/VehicleManagement'

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

        <Route
          path="/driving-history"
          element={<DrivingHistoryPage />}
        />

        <Route
          path="/vehicle/rental"
          element={<VehicleManagement />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
