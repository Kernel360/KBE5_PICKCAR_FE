const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

// 실행 환경에 따라 알맞은 .env 파일 로드
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const EMULATOR_PATH = process.env.EMULATOR_PATH;

const app = express();

// CORS 설정 분기
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: 'https://pickcar.online',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
} else {
  app.use(cors({ origin: true, credentials: true }));
}

app.use(express.json());

app.post('/run-emulator', (req, res) => {
  console.log('POST /run-emulator 요청 받음');

  const { accessToken, vehicleId } = req.body;

  if (!accessToken || !vehicleId) {
    return res.status(400).send("accessToken 또는 vehicleId 누락");
  }

  const pythonScriptPath = path.join(EMULATOR_PATH, 'emulator.py');
  const command = process.env.NODE_ENV === 'production'
  ? `PYTHON_ENV=production nohup /home/ubuntu/KBE5_PICKCAR_FE/.venv/bin/python3 "${pythonScriptPath}" "${accessToken}" "${vehicleId}" > /dev/null 2>&1 &`
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