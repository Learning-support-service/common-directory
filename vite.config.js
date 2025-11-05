// Vite 설정 파일
// - 책임: 개발 서버 설정 및 리액트 플러그인 로드
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',           // 기본 URL 경로
  publicDir: 'public', // 정적 파일이 있는 디렉터리
  server: {
    port: 3000,        // 개발 서버 포트
    open: true,        // 서버 시작 시 브라우저 자동 실행
    strictPort: false, // 지정된 포트 사용 중이면 다른 포트 시도
  }
})