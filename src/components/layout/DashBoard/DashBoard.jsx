import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import '/src/styles/home.css'
import '/src/styles/mypage.css'
import { useTheme } from '../../../contexts/ThemeContext'

export default function DashBoard() {
  const location = useLocation()
  const navigate = useNavigate()
  const inMyPage = location.pathname.startsWith('/mypage')
  const { theme, toggleTheme } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('currentUser'))

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('currentUser'))
    const onUserUpdated = () => setIsLoggedIn(!!localStorage.getItem('currentUser'))
    window.addEventListener('storage', onStorage)
    window.addEventListener('user-updated', onUserUpdated)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('user-updated', onUserUpdated)
    }
  }, [])
  const handleLogout = () => {
    try { localStorage.removeItem('currentUser') } catch(e){}
    // notify same-window listeners and update local state
    try { window.dispatchEvent(new CustomEvent('user-updated')) } catch(e){}
    setIsLoggedIn(false)
    navigate('/auth/login')
  }
  // compute header element based on login state and route to avoid complex inline JSX expressions
  let headerElement = null
  if (isLoggedIn) {
    if (inMyPage) {
      headerElement = (
        <header className="home-header dashboard-top-header">
          <div className="header-content header-left-layout">
            <div className="header-left-row">
              <button type="button" className="icon-back" aria-label="홈으로" onClick={() => {
                const cu = localStorage.getItem('currentUser')
                navigate(cu ? '/home' : '/')
              }}>←</button>
              <div className="brand brand-inline">
                <h1 className="brand-title">마이페이지</h1>
              </div>
            </div>
            <div className="header-right" aria-hidden="true" />
          </div>
        </header>
      )
    } else {
      headerElement = (
        <header className="home-header global-top-header">
          <div className="header-content">
            <div className="brand">
              <div className="brand-icon">📘</div>
              <h1 className="brand-title">CS Time</h1>
            </div>
            <div className="header-actions">
              <button className="header-btn theme-toggle" onClick={toggleTheme} aria-label="토글 테마">{theme === 'dark' ? '라이트' : '다크'}</button>
              <button className="header-btn" onClick={() => navigate('/mypage')}>👤 마이페이지</button>
              <button className="header-btn" onClick={handleLogout}>📋 로그아웃</button>
            </div>
          </div>
        </header>
      )
    }
  }
  return (
    <div className="
      flex flex-col relative app-shell
      w-[375px] min-h-screen
      max-[480px]:w-full
    ">
      {/* Header (rendered only if logged in) */}
      {headerElement}
      {/* <header>
        <p>학습 플랫폼</p>
        <p>마이페이지</p>
        <p>로그아웃</p>
      </header>
      <body>
        <p>대시보드</p>
        <p>학습분석</p>
        <p>오답노트</p>
        <p>성취도</p>
        <p>설정</p>
      </body> */}
      <Outlet />
    </div>
  );
}
