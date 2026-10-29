import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * 링크 공유 이미지(og:image)는 절대 주소여야 카카오톡·슬랙 등에서 보입니다.
 * Vercel 빌드 때 제공되는 실제 도메인으로 index.html의 %SITE_URL%을 바꿉니다.
 * 다른 곳에 배포하면 SITE_URL 환경변수로 지정하세요.
 */
function siteUrl(): Plugin {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const url = process.env.SITE_URL ?? (vercel ? `https://${vercel}` : '')
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url.replace(/\/$/, '')),
  }
}

export default defineConfig({
  plugins: [react(), siteUrl()],
  base: './',
})
