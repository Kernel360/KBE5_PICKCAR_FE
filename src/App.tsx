import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Map from './components/common/Map'

const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_API_KEY

if (kakaoMapKey && !document.getElementById('kakao-map-script')) {
  const script = document.createElement('script')
  script.id = 'kakao-map-script'
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`
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
          path="/map"
          element={<Map />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
