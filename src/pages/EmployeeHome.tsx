import { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '@/components/common/Header'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = import.meta.env.VITE_EMULATOR_API_URL

function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null; // userId는 sub에 들어있음
  } catch {
    return null;
  }
}

export default function EmployeeHome() {
  const [hasCar, setHasCar] = useState(false);
  const userId = getUserIdFromToken();
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllocation() {
      try {
        const response = await axios.get(BASE_URL + '/api/v1/vehicles/allocation/' + userId);
        const vehicleId = response.data.data;
        setVehicleId(vehicleId);
        setHasCar(!!vehicleId);
      } catch (err) {
        setHasCar(false);
        setVehicleId(null);
        console.error(err);
      }
    }
    if (userId) fetchAllocation();
  }, [userId]);

  // 임시 차량 할당 여부
  const [message, setMessage] = useState('');

  // 버튼 클릭 시 python 실행 요청
  const handlePickMe = async () => {
    const accessToken = localStorage.getItem('accessToken');
    setMessage('실행 중...');
    try {
      const res = await fetch(API_URL + '/run-emulator', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        vehicleId,
      }),
      });
      if (res.ok) {
        setMessage('반납 완료!');
      } else {
        setMessage('실행 실패');
      }
    } catch (e) {
      console.log(e);
      setMessage('에러 발생');
    }
  };

  return (
    <div>
      <Header userRole="EMPLOYEE" />
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {!hasCar ? (
          <h2>할당된 차량이 없습니다.<br />관리자에게 문의하세요.</h2>
        ) : (
          <>
            <button
              style={{
                fontSize: '2rem',
                padding: '1rem 2rem',
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onClick={handlePickMe}
            >
              PICKME
            </button>
            {message && <div style={{ marginTop: 20 }}>{message}</div>}
          </>
        )}
      </div>
    </div>
  );
}