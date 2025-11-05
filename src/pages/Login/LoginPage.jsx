import React from 'react'
import Login from '../../components/Login/Login'

export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  )

//   필요해지면 pages에만 얹으면 되는 것들

// 인증 가드 예시
// 로그인 안 됐으면 로그인 페이지로 이동
// 페이지 진입 시 데이터 프리패치
// 페이지에서 fetch → components로 props 전달
// 코드 스플리팅
// 라우트 경계에서 lazy/Suspense 적용
}


