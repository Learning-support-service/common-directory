// Vite 설정 파일
// - 책임: 개발 서버 설정 및 리액트 플러그인 로드
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
