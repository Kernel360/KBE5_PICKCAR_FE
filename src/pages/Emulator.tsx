import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/common/Header';
import gpx01 from '@/gpx/gpx01.json';
import gpx02 from '@/gpx/gpx02.json';
import gpx03 from '@/gpx/gpx03.json';
import gpx04 from '@/gpx/gpx04.json';
import gpx05 from '@/gpx/gpx05.json';
import gpx06 from '@/gpx/gpx06.json';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = import.meta.env.VITE_EMULATOR_API_URL;

const CYCLE_SIZE = 60; // 한 번에 보낼 경로 개수
const CYCLE_IDX_KEY = 'emulator_cycle_idx'; // 현재 전송된 위치(60*n)
const CYCLE_GPX_NUM = 'emulator_cycle_num'; // 현재 전송된 GPX 번호(gpx0*)

const gpxList = [gpx01, gpx02, gpx03, gpx04, gpx05, gpx06];
const gpxNameList = ["gpx01", "gpx02", "gpx03", "gpx04", "gpx05", "gpx06"];

let allGpx = gpx01;

const temp = localStorage.getItem(CYCLE_GPX_NUM);

if (temp === null) { // 처음이면 랜덤 선택 + 저장
  const random = Math.floor(Math.random() * 6);
  allGpx = gpxList[random];
  localStorage.setItem(CYCLE_GPX_NUM, gpxNameList[random]);
} else { // 기존 localStorage 값이 있을 경우 해당 gpx 데이터를 사용
  const index = gpxNameList.indexOf(temp);
  if (index !== -1) {
    allGpx = gpxList[index];
  } else { // fallback 발생 시: 기본값 gpx01 + 잘못된 localStorage 정정
    allGpx = gpx01;
    localStorage.setItem(CYCLE_GPX_NUM, "gpx01");
  }
}

export default function Emulator() {
  const [engineOn, setEngineOn] = useState(false);
  const [message, setMessage] = useState('');
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [cycleStartIdx, setCycleStartIdx] = useState(() => {
    // localStorage에서 이전 인덱스 불러오기(없으면 0)
    const saved = localStorage.getItem(CYCLE_IDX_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

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

  // 할당 API 호출 시마다 gpx 인덱스 증가(0→1→2→0 순환)
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

  // 엔진 ON 시 cycle_infos에 gpx 데이터 사용
  useEffect(() => {
    let interval: number;
    if (engineOn && vehicleId) {
      interval = setInterval(() => {
        // 현재 구간 추출
        const cycle_infos = allGpx.slice(cycleStartIdx, cycleStartIdx + CYCLE_SIZE);
        // 만약 남은 데이터가 부족하면 처음부터 이어붙임(순환)
        const actualCycleInfos =
          cycle_infos.length === CYCLE_SIZE
            ? cycle_infos
            : [
                ...cycle_infos,
                ...allGpx.slice(0, CYCLE_SIZE - cycle_infos.length),
              ];

        axios.post(
          API_URL + '/api/v1/cycle',
          {
            vehicle_id: vehicleId,
            cycle_cnt: CYCLE_SIZE,
            occurred_at: '20250630123001',
            distance: 100,
            cycle_infos: actualCycleInfos,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        // 다음 구간 인덱스 갱신 (순환) + localStorage에 저장
        setCycleStartIdx((prev) => {
          const next = (prev + CYCLE_SIZE) % allGpx.length;
          localStorage.setItem(CYCLE_IDX_KEY, next.toString());
          return next;
        });
      }, 10000); // 1분 주기(여야 하지만 답답하니까 우선은 10초)
    }
    return () => clearInterval(interval);
  }, [engineOn, vehicleId, cycleStartIdx]);

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
      engine_on_time: '20250709103601',
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
      engine_on_time: '20250709103601',
      engine_off_time: '20250709103700',
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
      engine_on_time: '20250709103601',
      engine_off_time: '20250709103700',
      gps_status: 'NORMAL',
      latitude: 37.4418097,
      longitude: 12.7244062,
    });

    setVehicleId(null);
    localStorage.removeItem(CYCLE_IDX_KEY);
    localStorage.removeItem(CYCLE_GPX_NUM);
    setCycleStartIdx(0);
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