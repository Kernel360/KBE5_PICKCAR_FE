const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

// 실행 환경에 따라 알맞은 .env 파일 로드
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({ path: envFile });

const EMULATOR_PATH = process.env.EMULATOR_PATH;

// 로그로 확인
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('EMULATOR_PATH:', EMULATOR_PATH);

const app = express();

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
  const command = process.env.NODE_ENV === 'production'
  ? `PYTHON_ENV=production python3 "${pythonScriptPath}" "${accessToken}" "${vehicleId}"`
  : `PYTHON_ENV=development python3 "${pythonScriptPath}" "${accessToken}" "${vehicleId}"`;
  
  console.log(`실행 명령어: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Python 실행 오류:', stderr);
      return res.status(500).send(stderr);
    }

    console.log('Python 실행 성공:', stdout);
    res.send(stdout);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});