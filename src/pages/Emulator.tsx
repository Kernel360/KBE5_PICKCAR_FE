import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/common/Header';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = import.meta.env.VITE_EMULATOR_API_URL;

export default function Emulator() {
  const [engineOn, setEngineOn] = useState(false);
  const [message, setMessage] = useState('');
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  const accessToken = localStorage.getItem('accessToken');
  const userId = (() => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!userId) return;
    axios
      .get(BASE_URL + '/api/v1/vehicles/allocation/' + userId)
      .then((res) => {
        setVehicleId(res.data.data);
      })
      .catch(() => {
        setVehicleId(null);
      });
  }, [userId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (engineOn && vehicleId) {
      interval = setInterval(() => {
        axios.post(
          API_URL + '/api/v1/cycle',
          {
            vehicle_id: vehicleId,
            cycle_cnt: 1,
            occurred_at: '20250630123001',
            distance: 100,
            cycle_infos: [
              {
                second: '20250630123001',
                gps_status: 'NORMAL',
                latitude: 37.4418,
                longitude: 12.7244,
                angle: 0,
                speed: 30,
                battery: 128,
              },
            ],
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }, 6000); // 10분 주기
    }
    return () => clearInterval(interval);
  }, [engineOn, vehicleId]);

  const postApi = async (endpoint: string, payload: object) => {
    try {
      const res = await axios.post(API_URL + endpoint, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setMessage(`${endpoint} → ${res.status}`);
    } catch (err: any) {
      setMessage(`${endpoint} → ${err.response?.status || '에러 발생'}`);
    }
  };

  const handleEngineOn = () => {
    if (!vehicleId) return;
    postApi('/api/v1/event/engine/on', {
      vehicle_id: vehicleId,
      mdn: '01234567890',
      event_status: 'ON',
      engine_on_time: '20240601123000',
      engine_off_time: '',
      gps_status: 'NORMAL',
      latitude: 37.4418038,
      longitude: 12.7244003,
    });
    setEngineOn(true);
  };

  const handleEngineOff = () => {
    if (!vehicleId) return;
    postApi('/api/v1/event/engine/off', {
      vehicle_id: vehicleId,
      mdn: '01234567890',
      event_status: 'OFF',
      engine_on_time: '20250630123000',
      engine_off_time: '20250630123100',
      gps_status: 'NORMAL',
      latitude: 37.4418097,
      longitude: 12.7244062,
    });
    setEngineOn(false);
  };

  const handleReturn = () => {
    if (!vehicleId) return;
    if (engineOn) {
      setMessage('먼저 OFF를 눌러야 반납할 수 있습니다.');
      return;
    }
    const confirmed = window.confirm(`${vehicleId}번 차량을 반납하시겠습니까?`);
    if (!confirmed) return;

    postApi('/api/v1/event/returned', {
      vehicle_id: vehicleId,
      mdn: '01234567890',
      event_status: 'RETURNED',
      engine_on_time: '20240601123000',
      engine_off_time: '20240601123100',
      gps_status: 'NORMAL',
      latitude: 37.4418097,
      longitude: 12.7244062,
    });

    setVehicleId(null);
  };

  return (
    <div>
      <Header userRole="EMPLOYEE" />
      <div style={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!vehicleId ? (
          <h2 style={{ fontSize: '1.8rem', textAlign: 'center' }}>
            할당된 차량이 없습니다.<br />관리자에게 문의하세요.
          </h2>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 'bold', marginBottom: '2rem' }}>{vehicleId}번 차량 에뮬레이터</h1>
            <button
              style={buttonStyle(!engineOn)}
              onClick={handleEngineOn}
              disabled={engineOn}
            >
              ON
            </button>
            <button
              style={buttonStyle(engineOn)}
              onClick={handleEngineOff}
              disabled={!engineOn}
            >
              OFF
            </button>
            <button
              style={buttonStyle(!engineOn)}
              onClick={handleReturn}
              disabled={engineOn}
            >
              반납
            </button>
            <p style={{ marginTop: '1.5rem', color: '#555' }}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function buttonStyle(active: boolean): React.CSSProperties {
  return {
    fontSize: '1.5rem',
    width: '220px',
    padding: '1.2rem 2rem',
    margin: '1.2rem 0',
    backgroundColor: active ? '#4f46e5' : '#e5e7eb',
    color: active ? 'white' : '#6b7280',
    border: 'none',
    borderRadius: '8px',
    cursor: active ? 'pointer' : 'not-allowed',
  };
}