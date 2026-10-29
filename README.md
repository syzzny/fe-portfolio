# Yejin — Frontend Portfolio

Vite + React + TypeScript + CSS Modules

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # dist/
```

## 구조
- `src/data/` — 화면 콘텐츠(프로젝트, 경력, 스킬). 문구 수정은 여기서만
- `src/pages/` — HomePage(메인), ProjectsPage(`#work`)
- `src/components/` — Header, Home(Hero·SelectedWork), Projects(대표·행·그리드 + 조작 가능한 UI 목업), About, Contact
- `src/hooks/useRoute.ts` — 해시 라우팅 (`#work` 프로젝트 페이지, `#about` 메인 About으로 이동)
- `src/hooks/useReveal.ts` — 스크롤 등장
- `src/styles/tokens.css` — 컬러·타이포·간격 토큰

## 이미지 교체
- `src/data/projects.ts`의 각 프로젝트에 `image: '/images/xxx.jpg'` 추가 (public/images에 파일) → 목업 대신 이미지 표시
- 연락처: `src/components/Contact/Contact.tsx` 상단 EMAIL·GITHUB·RESUME
