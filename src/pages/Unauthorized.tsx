import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1 style={{ color: '#e53e3e', fontSize: '2rem', marginBottom: '1rem' }}>권한이 없습니다</h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        이 페이지에 접근할 권한이 없습니다.<br />
        필요한 권한이 있는 계정으로 로그인해 주세요.
      </p>
      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        style={{
          background: '#3182ce',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        로그인 화면으로 이동
      </button>
    </div>
  );
} 