import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="landing-page">
      <h1>학습을 시작하세요</h1>
      <button onClick={() => navigate('/select-course')}>
        과목 선택하기
      </button>
    </div>
  );
}
