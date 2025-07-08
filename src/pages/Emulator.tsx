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
    let interval: number;
    if (engineOn && vehicleId) {
      interval = setInterval(() => {
        axios.post(
          API_URL + '/api/v1/cycle',
          {
            vehicle_id: vehicleId,
            cycle_cnt: 60,
            occurred_at: '20250630123001',
            distance: 100,
            cycle_infos: [
                {"second": "20241130000119", "gps_status": "NORMAL", "latitude": 35.624439, "longitude": 129.335991,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000120", "gps_status": "NORMAL", "latitude": 35.624403, "longitude": 129.335968,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000121", "gps_status": "NORMAL", "latitude": 35.624352, "longitude": 129.335945,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000122", "gps_status": "NORMAL", "latitude": 35.624305, "longitude": 129.335930,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000123", "gps_status": "NORMAL", "latitude": 35.624252, "longitude": 129.335918,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000124", "gps_status": "NORMAL", "latitude": 35.624190, "longitude": 129.335906,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000125", "gps_status": "NORMAL", "latitude": 35.624126, "longitude": 129.335896,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000126", "gps_status": "NORMAL", "latitude": 35.624064, "longitude": 129.335891,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000127", "gps_status": "NORMAL", "latitude": 35.624004, "longitude": 129.335893,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000128", "gps_status": "NORMAL", "latitude": 35.623948, "longitude": 129.335896,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000129", "gps_status": "NORMAL", "latitude": 35.623891, "longitude": 129.335906,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000130", "gps_status": "NORMAL", "latitude": 35.623838, "longitude": 129.335918,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000131", "gps_status": "NORMAL", "latitude": 35.623784, "longitude": 129.335935,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000132", "gps_status": "NORMAL", "latitude": 35.623723, "longitude": 129.335950,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000133", "gps_status": "NORMAL", "latitude": 35.623652, "longitude": 129.335961,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000134", "gps_status": "NORMAL", "latitude": 35.623589, "longitude": 129.335991,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000135", "gps_status": "NORMAL", "latitude": 35.623576, "longitude": 129.336083,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000136", "gps_status": "NORMAL", "latitude": 35.623535, "longitude": 129.336153,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000137", "gps_status": "NORMAL", "latitude": 35.623489, "longitude": 129.336208,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000138", "gps_status": "NORMAL", "latitude": 35.623444, "longitude": 129.336255,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000139", "gps_status": "NORMAL", "latitude": 35.623393, "longitude": 129.336275,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000140", "gps_status": "NORMAL", "latitude": 35.623365, "longitude": 129.336296,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000141", "gps_status": "NORMAL", "latitude": 35.623349, "longitude": 129.336286,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000142", "gps_status": "NORMAL", "latitude": 35.623338, "longitude": 129.336268,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000143", "gps_status": "NORMAL", "latitude": 35.623331, "longitude": 129.336263,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000144", "gps_status": "NORMAL", "latitude": 35.623330, "longitude": 129.336263,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000145", "gps_status": "NORMAL", "latitude": 35.623332, "longitude": 129.336265,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000146", "gps_status": "NORMAL", "latitude": 35.623335, "longitude": 129.336266,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000147", "gps_status": "NORMAL", "latitude": 35.623338, "longitude": 129.336266,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000148", "gps_status": "NORMAL", "latitude": 35.623339, "longitude": 129.336266,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000149", "gps_status": "NORMAL", "latitude": 35.623340, "longitude": 129.336268,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000150", "gps_status": "NORMAL", "latitude": 35.623341, "longitude": 129.336268,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000151", "gps_status": "NORMAL", "latitude": 35.623341, "longitude": 129.336268,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000152", "gps_status": "NORMAL", "latitude": 35.623337, "longitude": 129.336265,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000153", "gps_status": "NORMAL", "latitude": 35.623333, "longitude": 129.336256,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000154", "gps_status": "NORMAL", "latitude": 35.623317, "longitude": 129.336240,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000155", "gps_status": "NORMAL", "latitude": 35.623291, "longitude": 129.336220,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000156", "gps_status": "NORMAL", "latitude": 35.623262, "longitude": 129.336203,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000157", "gps_status": "NORMAL", "latitude": 35.623227, "longitude": 129.336204,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000158", "gps_status": "NORMAL", "latitude": 35.623194, "longitude": 129.336228,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000159", "gps_status": "NORMAL", "latitude": 35.623171, "longitude": 129.336271,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000200", "gps_status": "NORMAL", "latitude": 35.623161, "longitude": 129.336333,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000201", "gps_status": "NORMAL", "latitude": 35.623151, "longitude": 129.336408,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000202", "gps_status": "NORMAL", "latitude": 35.623150, "longitude": 129.336498,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000203", "gps_status": "NORMAL", "latitude": 35.623147, "longitude": 129.336601,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000204", "gps_status": "NORMAL", "latitude": 35.623145, "longitude": 129.336716,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000205", "gps_status": "NORMAL", "latitude": 35.623142, "longitude": 129.336836,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000206", "gps_status": "NORMAL", "latitude": 35.623143, "longitude": 129.336955,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000207", "gps_status": "NORMAL", "latitude": 35.623144, "longitude": 129.337074,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000208", "gps_status": "NORMAL", "latitude": 35.623148, "longitude": 129.337205,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000209", "gps_status": "NORMAL", "latitude": 35.623156, "longitude": 129.337345,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000210", "gps_status": "NORMAL", "latitude": 35.623163, "longitude": 129.337490,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000211", "gps_status": "NORMAL", "latitude": 35.623170, "longitude": 129.337640,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000212", "gps_status": "NORMAL", "latitude": 35.623174, "longitude": 129.337793,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000213", "gps_status": "NORMAL", "latitude": 35.623195, "longitude": 129.337968,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000214", "gps_status": "NORMAL", "latitude": 35.623206, "longitude": 129.338140,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000215", "gps_status": "NORMAL", "latitude": 35.623215, "longitude": 129.338313,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000216", "gps_status": "NORMAL", "latitude": 35.623221, "longitude": 129.338486,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000217", "gps_status": "NORMAL", "latitude": 35.623225, "longitude": 129.338660,
                 "angle": 0, "speed": 30, "battery": 128},
                {"second": "20241130000218", "gps_status": "NORMAL", "latitude": 35.623229, "longitude": 129.338836,
                 "angle": 0, "speed": 30, "battery": 128}
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