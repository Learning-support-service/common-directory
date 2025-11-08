import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // localStorage에서 테마 설정 가져오기, 기본값은 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  // 테마 변경 시 localStorage 저장 및 document에 클래스 적용
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 듣기: 같은 창에서 외부로부터 테마 업데이트 요청을 받을 때 적용
  useEffect(() => {
    const onThemeUpdated = (e) => {
      try {
        const t = e && e.detail ? e.detail : null
        if (t) setTheme(t)
      } catch (e) {}
    }
    const onStorage = (e) => {
      if (e.key === 'theme') {
        try { setTheme(e.newValue || 'dark') } catch (e) {}
      }
    }
    window.addEventListener('theme-updated', onThemeUpdated)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('theme-updated', onThemeUpdated)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
