const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

// 실행 환경에 따라 알맞은 .env 파일 로드
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({ path: envFile });

const EMULATOR_PATH = process.env.EMULATOR_PATH;

// 로그로 확인
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('EMULATOR_PATH:', EMULATOR_PATH);

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://pickcar.online',
  credentials: true
}));

app.post('/run-emulator', (req, res) => {
  console.log('POST /run-emulator 요청 받음');

  const { accessToken, vehicleId } = req.body;

  if (!accessToken || !vehicleId) {
    return res.status(400).send("accessToken 또는 vehicleId 누락");
  }

  const pythonScriptPath = path.join(EMULATOR_PATH, 'emulator.py');
  const env = { ...process.env, PYTHON_ENV: process.env.NODE_ENV };

  const child = spawn('python3', [pythonScriptPath, accessToken, vehicleId], {
    env,
    detached: true,
    stdio: 'ignore' // 터미널 연결 끊음
  });

  child.unref(); // 부모 프로세스와 연결 끊기

  console.log('Python GUI 백그라운드 실행 시작됨');
  res.status(200).send('에뮬레이터 실행 요청 완료');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});