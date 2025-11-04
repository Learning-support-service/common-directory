// 보호 라우트 컴포넌트
// - 책임: 인증된 사용자만 자식 라우트를 접근 가능하게 함
// - 방식: localStorage의 currentUser 확인 → 있으면 children 렌더, 없으면 로그인으로 리다이렉트
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  // status: 'loading' 동안은 화면을 비워 깜빡임 최소화
  const [status, setStatus] = useState('loading')
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        // localStorage에서 currentUser 확인
        const currentUserData = localStorage.getItem('currentUser')
        if (!mounted) return
        setAuthed(!!currentUserData)
      } catch {
        if (!mounted) return
        setAuthed(false)
      } finally {
        if (mounted) setStatus('done')
      }
    })()
    return () => { mounted = false }
  }, [])

  // 로딩 중에는 빈 화면(혹은 로더) 표시
  if (status === 'loading') return null
  return authed ? children : <Navigate to="/auth/login" replace />
}
