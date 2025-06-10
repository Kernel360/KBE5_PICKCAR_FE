import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import TrackingCar from './pages/TrackingCar'
import DrivingHistoryPage from './pages/DrivingHistoryPage'

const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_API_KEY

// Kakao Maps SDK 스크립트 로딩 로직 (앱 실행 시 한 번만 실행되도록)
if (kakaoMapKey && !document.getElementById('kakao-map-script')) {
  const script = document.createElement('script')
  script.id = 'kakao-map-script'
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services,clusterer,drawing` // 필요 라이브러리 추가 가능
  script.async = true
  document.head.appendChild(script)
}

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
