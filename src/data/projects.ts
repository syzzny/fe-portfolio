export type ProjectId = 'trippio' | 'lineon' | 'energy' | 'ongyeol' | 'dewfield'
export type ProjectCategory = 'react' | 'next' | 'data'

export interface Shot {
  /** public/ 기준 경로 (예: 'projects/trippio/plan.webp') */
  src: string
  caption: string
  device: 'desktop' | 'mobile'
}

export interface ProjectMedia {
  /** 썸네일·상세 상단에 쓰는 대표 화면 */
  desktop: string
  mobile?: string
  /**
   * 상세페이지 화면 갤러리.
   * 데스크톱은 2개씩, 모바일은 3개씩 같은 크기로 배치되므로 짝수(데스크톱)·3의 배수(모바일)를 권장합니다.
   * 캡처는 데스크톱 1440×900, 모바일 390×844 비율로 맞춰 주세요.
   */
  gallery: Shot[]
}

export interface ProjectDetail {
  /** 상단 메타: 역할(맡은 범위) */
  role: string
  /** 상단 메타: 작업 기간 (모르면 비워 두면 연도만 표시) */
  period?: string
  /** 한 문단 개요 */
  overview: string
  /** 숫자로 보여 줄 성과 (없으면 섹션 생략) */
  highlights?: { value: string; label: string }[]
  /** 주요 기능 */
  features: { title: string; desc: string }[]
  /** 설계 결정 */
  decisions: { title: string; desc: string }[]
  /** 문제 → 해결 */
  troubleshooting?: { problem: string; solution: string }[]
  /** 전체 기술 목록 */
  stack: string[]
}

export interface Project {
  id: ProjectId
  /** 영문 제목 — 압축 디스플레이 서체로 표시 */
  title: string
  /** 한글 한 줄 소개 (목록 카드) */
  summary: string
  /** 제목 아래 알약 태그 */
  tag: string
  categories: ProjectCategory[]
  /** 목록 카드 메타 */
  stack: string
  focus: string
  year: string
  /** 이미지 영역 배경. 실제 캡처가 생기면 image에 경로를 넣으면 됩니다 */
  tone: string
  /** 배경이 밝으면 true — 대표 카드 글자색을 어둡게 */
  light?: boolean
  link?: string
  media: ProjectMedia
  detail: ProjectDetail
}

/**
 * 프로젝트 추가: 이 배열에 객체만 추가하면 목록·상세페이지가 함께 생깁니다.
 * 첫 번째 항목이 대표(풀폭) 카드, 메인 Selected Work에는 앞의 3개가 나옵니다.
 * 화면 캡처는 public/projects/<id>/ 에 넣고 media에 경로를 적으면 됩니다.
 */
export const PROJECTS: Project[] = [
  {
    id: 'trippio',
    title: 'Trippio',
    summary: '여행지와 조건을 고르면 여행 친구 "피오"가 날씨·동선·예산을 고려해 일정을 짜 주는 여행 플래너. 외부 API 5개를 서버 함수로 연결했습니다.',
    tag: 'Travel Planner',
    categories: ['react', 'data'],
    stack: 'React · TypeScript · TanStack Query',
    focus: 'External APIs · Map · Drag & Drop',
    year: '2026',
    tone: '#d3eee8',
    light: true,
    link: 'https://trippio-kappa.vercel.app/',
    media: {
      desktop: 'projects/trippio/plan.webp',
      mobile: 'projects/trippio/plan-m.webp',
      gallery: [
        { src: 'projects/trippio/destination.webp', caption: '여행지 선택 — 목록과 지도, 테마 필터', device: 'desktop' },
        { src: 'projects/trippio/conditions.webp', caption: '조건 입력 — 날짜·인원·예산·스타일', device: 'desktop' },
        { src: 'projects/trippio/plan.webp', caption: '일정 — 타임라인과 동선 지도, 피오 대화', device: 'desktop' },
        { src: 'projects/trippio/overview.webp', caption: '한눈에 보기 — 경비 차트·날씨·준비물', device: 'desktop' },
        { src: 'projects/trippio/destination-m.webp', caption: '여행지 선택', device: 'mobile' },
        { src: 'projects/trippio/plan-m.webp', caption: '일정 + 피오 대화', device: 'mobile' },
        { src: 'projects/trippio/overview-m.webp', caption: '한눈에 보기', device: 'mobile' },
      ],
    },
    detail: {
      role: '기획 · 디자인 · 프론트엔드',
      period: '2026.09 — 2026.10',
      overview:
        '해외·국내 여행지와 날짜, 인원, 예산, 여행 스타일을 고르면 피오가 날씨 예보와 주변 장소를 바탕으로 일정을 배치합니다. 만들어진 일정은 "둘째 날 오후에 쇼핑 넣어줘"처럼 피오와 대화하듯 고칠 수 있고, 예상 경비·날씨·준비물을 한눈에 볼 수 있습니다. 모바일에서는 하단 탭바와 바텀시트 레이아웃으로 바뀝니다.',
      highlights: [
        { value: '5', label: '연결한 외부 API' },
        { value: '6', label: '단계별 화면 플로우' },
        { value: '0', label: '브라우저에 노출된 API 키' },
      ],
      features: [
        {
          title: '단계별 일정 생성',
          desc: '날씨 예보 → 주변 장소 검색 → 일정 배치 단계를 진행 상태로 보여 주고, 실패하면 해당 단계부터 다시 시도할 수 있습니다.',
        },
        {
          title: '타임라인 + 동선 지도',
          desc: '날짜별 타임라인과 Leaflet 동선 지도를 함께 보여 주고, dnd-kit으로 순서를 끌어서 바꾸거나 장소를 추가·삭제할 수 있습니다. 키보드로도 순서를 바꿀 수 있습니다.',
        },
        {
          title: '피오와 대화로 일정 수정',
          desc: '자연어 요청으로 일정을 고치고, 바꾸기 전 상태로 되돌릴 수 있습니다.',
        },
        {
          title: '한눈에 보기',
          desc: '예상 경비 도넛 차트(ECharts), 기간 날씨, 준비물 체크리스트, 현지 팁을 한 화면에 모았습니다. 환율은 실시간 값으로 계산합니다.',
        },
      ],
      decisions: [
        {
          title: '서버 상태는 TanStack Query',
          desc: 'REST 요청의 캐싱, 로딩·오류 상태, AbortSignal 요청 취소를 TanStack Query 훅으로 통일했습니다.',
        },
        {
          title: '디자인 시스템 규칙을 코드로',
          desc: 'Figma Primitives → Semantic 색 구조를 그대로 CSS 변수로 옮기고, 포인트 색(민트)은 화면당 최종 액션 하나에만 쓰며 선택 상태는 무채색으로 표현합니다. 타이포는 Figma 텍스트 스타일과 같은 믹스인으로만 지정합니다.',
        },
        {
          title: '접근성을 기본값으로',
          desc: '여행지 목록은 radiogroup과 방향키 이동, 지역 탭은 WAI-ARIA tabs 패턴, 이중 슬라이더는 aria-valuetext, 대화창은 aria-live로 만들었습니다.',
        },
      ],
      troubleshooting: [
        {
          problem: '장소·환율·대화 API에 키가 필요한데, 브라우저에서 바로 부르면 키가 그대로 노출됩니다.',
          solution: 'Vercel Functions(api/)를 프록시로 두고, 서버 로직은 개발 서버(Vite 미들웨어)와 배포 함수가 같은 코드를 쓰도록 server/ 폴더로 분리했습니다.',
        },
        {
          problem: '외부 API가 실패하거나 키가 없으면 일정 화면 전체가 비어 버릴 수 있었습니다.',
          solution: '호출이 실패하면 목업 데이터로 대체하고, 환율은 Open Exchange Rates → Frankfurter → 기준값 순서로 대체해 화면이 깨지지 않게 했습니다.',
        },
        {
          problem: '해외 지도 타일(Esri)에는 한국 상세 데이터가 없었습니다.',
          solution: '국내 여행지만 OpenStreetMap 타일로 바꾸고, 두 타일을 CSS 필터로 같은 하늘색·흰색 톤으로 맞췄습니다.',
        },
      ],
      stack: ['React 18', 'TypeScript', 'Vite', 'React Router 6', 'SCSS Modules', 'TanStack Query', 'ECharts', 'Leaflet', 'dnd-kit', 'Vercel Functions', 'Foursquare Places', 'Open-Meteo', 'Groq'],
    },
  },
  {
    id: 'lineon',
    title: 'LineOn MES',
    summary: '자동차 부품 공장의 생산관리 시스템. 대시보드부터 작업지시·실적·품질·설비·권한까지 18개 화면이 하나의 데이터로 연결됩니다.',
    tag: 'B2B · MES',
    categories: ['react'],
    stack: 'React 19 · React Router 7 · SCSS',
    focus: 'Data Table · Dashboard · RBAC',
    year: '2026',
    tone: '#1f2329',
    link: 'https://lineon-mes.vercel.app',
    media: {
      desktop: 'projects/lineon/dashboard.webp',
      gallery: [
        { src: 'projects/lineon/monitoring.webp', caption: '라인 모니터링 — 설비 타일과 비가동 경과 시간', device: 'desktop' },
        { src: 'projects/lineon/work-orders.webp', caption: '작업지시 — 상태별 목록과 진척률', device: 'desktop' },
        { src: 'projects/lineon/plans.webp', caption: '생산계획 — 주간 간트', device: 'desktop' },
        { src: 'projects/lineon/approval.webp', caption: '실적 승인 — 확인 필요 자동 분류', device: 'desktop' },
        { src: 'projects/lineon/defects.webp', caption: '불량 분석 — 일별 불량률 추이', device: 'desktop' },
        { src: 'projects/lineon/tablet.webp', caption: '작업자 태블릿 — 양품·불량 등록', device: 'desktop' },
      ],
    },
    detail: {
      role: '기획 · 디자인 · 프론트엔드',
      period: '2026.08 — 2026.09',
      overview:
        '가상 제조사 (주)한결정밀 김해공장(라인 3개, 설비 25대)의 생산관리 시스템입니다. IA의 모든 화면이 실제로 동작하고, 한 화면에서 한 일이 다른 화면에 바로 반영됩니다. 예를 들어 작업자 태블릿에서 비가동을 신고하면 라인 모니터링, 작업지시 상태, 비가동 이력, 알림이 한 번에 바뀝니다.',
      highlights: [
        { value: '18', label: '동작하는 화면' },
        { value: '128', label: '작업지시 시드 데이터' },
        { value: '4', label: '사용자 역할 (역할마다 메뉴·권한이 다름)' },
        { value: '0', label: '차트 라이브러리 (SVG 직접 구현)' },
      ],
      features: [
        {
          title: '생산 현황 대시보드',
          desc: '오늘·이번 주·이번 달과 라인 필터, 시간대별 실적 차트와 툴팁, 납기 위험 계산을 제공합니다.',
        },
        {
          title: '작업지시와 작업 배정',
          desc: '상태별로 가능한 액션만 노출하고, 미저장 이탈 경고와 임시저장을 지원합니다. 배정은 끌어다 놓기와 드롭다운 대체 수단을 함께 두고, 비가동·점검 설비 배정을 막습니다.',
        },
        {
          title: '작업자 태블릿',
          desc: '양품 등록, 불량 1탭 등록, 5분 실행 취소, 비가동 신고, 작업 시작·종료를 현장 태블릿 화면으로 구현했습니다.',
        },
        {
          title: '역할별 권한',
          desc: '역할 × 메뉴 매트릭스(처리·조회·숨김)를 저장하면 메뉴와 화면 접근이 즉시 바뀌고, 주소로 직접 들어가도 "권한 없음"을 보여 줍니다.',
        },
      ],
      decisions: [
        {
          title: '업무 단위 액션 하나로 데이터 변경',
          desc: '모든 화면은 useMes()로 같은 데이터를 읽고 run(액션, 값)으로만 바꿉니다. 액션 하나가 여러 데이터를 함께 바꾸기 때문에 화면끼리 따로 맞출 필요가 없고, 실제 서비스에서는 run만 API 호출로 바꾸면 됩니다.',
        },
        {
          title: '화면 = 설정 + 조립',
          desc: '사이드바 메뉴와 브레드크럼은 navigation 설정 하나에서, 메뉴 숨김과 접근 제어는 권한 매트릭스 하나에서 만들어집니다. 목록 화면은 useListQuery와 DataTable 파츠를 조립합니다.',
        },
        {
          title: 'Figma 변수와 1:1 디자인 토큰',
          desc: '색과 간격을 Figma "LineOn DS" 변수와 같은 이름의 CSS 변수로 관리해 디자인 수정이 코드에 그대로 옮겨집니다.',
        },
      ],
      stack: ['React 19', 'Vite', 'React Router 7', 'SCSS', 'SVG Charts', 'Vercel'],
    },
  },
  {
    id: 'energy',
    title: 'Energy Agency',
    summary: '공공기관 누리집을 React + TypeScript로 전환하고 Supabase를 연동했습니다. Lighthouse 모바일 성능을 78에서 92로 끌어올렸습니다.',
    tag: 'Public · Migration',
    categories: ['react', 'data'],
    stack: 'React · TypeScript · Supabase',
    focus: 'REST · Auth · Performance',
    year: '2026',
    tone: '#d9e3f3',
    light: true,
    link: 'https://energy-agency.vercel.app',
    media: {
      desktop: 'projects/energy/home.webp',
      mobile: 'projects/energy/home-m.webp',
      gallery: [
        { src: 'projects/energy/home.webp', caption: '메인 — 검색과 알림판', device: 'desktop' },
        { src: 'projects/energy/qna.webp', caption: '묻고 답하기 — 검색·페이지네이션', device: 'desktop' },
        { src: 'projects/energy/notice.webp', caption: '공지사항 — 목록과 필터', device: 'desktop' },
        { src: 'projects/energy/cardnews.webp', caption: '카드뉴스 — 데이터로 그리는 카드', device: 'desktop' },
        { src: 'projects/energy/home-m.webp', caption: '메인', device: 'mobile' },
        { src: 'projects/energy/qna-m.webp', caption: '묻고 답하기', device: 'mobile' },
        { src: 'projects/energy/cardnews-m.webp', caption: '카드뉴스', device: 'mobile' },
      ],
    },
    detail: {
      role: '디자인 · 퍼블리싱 · 프론트엔드 · 백엔드 연동 (1인)',
      period: '2026.09 — 2026.10',
      overview:
        '가상의 공공기관 「에너지전환진흥원」 누리집입니다. Handlebars 멀티페이지와 바닐라 JS로 퍼블리싱한 사이트를 React + TypeScript SPA로 전환하고, Supabase로 묻고 답하기·통계·회원 기능을 연결했습니다. 성능과 웹 접근성(KWCAG 2.2)까지 직접 진단하고 개선했습니다.',
      highlights: [
        { value: '78→92', label: 'Lighthouse 모바일 성능' },
        { value: '187→106KB', label: '첫 방문 JS (gzip)' },
        { value: '100', label: '접근성 점수' },
        { value: '30', label: '단위·컴포넌트 테스트' },
      ],
      features: [
        {
          title: '묻고 답하기 — REST API 연동',
          desc: 'TanStack Query로 캐시하고, 검색은 0.4초 디바운스와 AbortSignal 취소, 검색 조건과 페이지는 URL에 남깁니다. 로딩·오류·빈 결과·등록 중 상태를 모두 처리했습니다.',
        },
        {
          title: '에너지 통계 대시보드',
          desc: '원자료 595행을 한 번 받아 화면에서 집계하고, 연도·지역 필터와 ECharts 차트를 연결했습니다. 모든 차트에 요약 문장과 표 보기를 제공합니다.',
        },
        {
          title: '회원 기능',
          desc: 'Supabase Auth로 가입·이메일 인증·로그인 유지를 구현하고, 비공개 글은 DB의 RLS 정책으로 작성자 본인만 조회되게 했습니다.',
        },
      ],
      decisions: [
        {
          title: '서버 상태와 화면 상태 분리',
          desc: '서버 데이터는 TanStack Query, 필터·페이지 같은 화면 상태는 URL 검색 파라미터에 두어 전역 상태 라이브러리 없이도 공유 가능한 화면을 만들었습니다.',
        },
        {
          title: '보안은 클라이언트가 아니라 DB에',
          desc: '브라우저에는 공개 키만 두고, 읽기·쓰기 권한은 RLS 정책과 공개용 뷰로 정했습니다.',
        },
        {
          title: '라우트 메타데이터로 레이아웃 구성',
          desc: '라우트의 handle 값을 레이아웃이 읽어 브레드크럼, LNB, GNB 강조, 서브 비주얼을 그립니다.',
        },
      ],
      troubleshooting: [
        {
          problem: '첫 방문에 모든 페이지 코드와 DB 라이브러리를 한 번에 받아 JS가 무거웠습니다.',
          solution: '라우트별 코드 분할과 인증 라이브러리 지연 로드로 첫 방문 JS를 187KB에서 106KB로 줄였습니다.',
        },
        {
          problem: '첫 비주얼 이미지가 JS 실행 뒤에야 요청되고, 보이지 않는 슬라이드 이미지까지 받았습니다.',
          solution: 'WebP 변환 스크립트와 srcset, 슬라이드 지연 로드, 메인 이미지 preload를 적용했습니다.',
        },
        {
          problem: 'React 전환 후 기존 화면과 달라진 곳이 없는지 확인할 방법이 필요했습니다.',
          solution: '25페이지 × 2해상도를 픽셀·요소 단위로 자동 비교해 같은 화면임을 확인했습니다.',
        },
      ],
      stack: ['React 18', 'TypeScript', 'React Router 6', 'TanStack Query', 'Supabase', 'ECharts', 'Sass (CSS Modules)', 'Vite', 'Vitest', 'GitHub Actions', 'Vercel'],
    },
  },
  {
    id: 'ongyeol',
    title: 'Ongyeol Clinic',
    summary: '피부과 홈페이지를 Next.js로 반응형 구현하고, 접근성 자동 검사에서 나온 235곳의 문제를 2곳까지 줄였습니다.',
    tag: 'Responsive',
    categories: ['next'],
    stack: 'Next.js · TypeScript · SCSS Module',
    focus: 'Responsive · A11y · Storybook',
    year: '2026',
    tone: '#2b2723',
    link: 'https://ongyeol-smoky.vercel.app',
    media: {
      desktop: 'projects/ongyeol/home.webp',
      mobile: 'projects/ongyeol/home-m.webp',
      gallery: [
        { src: 'projects/ongyeol/about.webp', caption: '병원 소개 — 숫자로 보는 병원', device: 'desktop' },
        { src: 'projects/ongyeol/doctors.webp', caption: '의료진 — 진료 분야와 경력', device: 'desktop' },
        { src: 'projects/ongyeol/treatments.webp', caption: '시술 안내 — 카테고리 7개 · 시술 35개', device: 'desktop' },
        { src: 'projects/ongyeol/news.webp', caption: '뉴스룸 — 분류 필터', device: 'desktop' },
      ],
    },
    detail: {
      role: '디자인 · 퍼블리싱 · 배포 (1인)',
      period: '2026.09 — 2026.10',
      overview:
        'Figma 시안을 Next.js · TypeScript · SCSS Module로 옮긴 반응형 병원 홈페이지입니다. 메인, 병원 소개, 의료진, 시술 안내(카테고리 7개 · 시술 35개), 뉴스룸과 상세 페이지까지 구성했고, 재사용 컴포넌트와 디자인 토큰을 Storybook으로 문서화했습니다.',
      highlights: [
        { value: '235→2', label: '접근성 자동 검사 문제' },
        { value: '154', label: '토큰 2줄로 해결한 대비 문제' },
        { value: '2', label: '반응형 기준점' },
      ],
      features: [
        {
          title: '반응형 설계',
          desc: '기준점을 1199px·767px 두 개로 통일하고, 폭에 따라 바뀌는 값은 CSS 변수로 두어 컴포넌트마다 미디어쿼리를 반복하지 않게 했습니다. 시술 목록에는 컨테이너 쿼리를 썼습니다.',
        },
        {
          title: '움직임 통일',
          desc: '"가림막 뒤에서 드러난다"는 한 가지 방식으로 등장 효과를 통일하고, IntersectionObserver를 쓰는 Reveal 컴포넌트 하나로 처리했습니다.',
        },
        {
          title: '컴포넌트 문서화',
          desc: '디자인 토큰과 공통 컴포넌트, 상담 신청 폼을 Storybook으로 문서화하고 접근성 검사 패널을 함께 넣었습니다.',
        },
      ],
      decisions: [
        {
          title: '데이터 기반 정적 생성',
          desc: '시술·의료진·뉴스 내용을 데이터로 분리하고, 상세 페이지는 generateStaticParams로 미리 생성했습니다.',
        },
        {
          title: '훅으로 동작 분리',
          desc: '캐러셀의 현재 쪽·진행률·자동 넘김을 useCarousel 훅으로 분리해 두 섹션에서 함께 쓰고, 넘김 자체는 CSS scroll-snap으로 처리했습니다.',
        },
      ],
      troubleshooting: [
        {
          problem: 'axe-core로 10개 페이지를 두 가지 폭에서 검사하자 명도 대비 문제를 포함해 235곳이 나왔습니다.',
          solution: '대부분이 색 토큰에서 나온다는 것을 찾아 토큰 값을 조정하고, 터치 영역·키보드 스크롤·접근 가능한 이름을 고쳐 장식용 예외 2곳만 남겼습니다.',
        },
      ],
      stack: ['Next.js 16 (App Router)', 'React 19', 'TypeScript', 'SCSS Module', 'Storybook', 'Kakao Maps SDK', 'Vercel'],
    },
  },
  {
    id: 'dewfield',
    title: 'Dewfield',
    summary: '직접 디자인한 스킨케어 브랜드 시안을 Next.js로 구현했습니다. 장바구니, 결제, 피부 진단과 REST API까지 동작합니다.',
    tag: 'E-commerce',
    categories: ['next', 'data'],
    stack: 'Next.js 14 · React 18 · SCSS Module',
    focus: 'Route Handlers · Cart · Fluid Type',
    year: '2026',
    tone: '#d9d2c2',
    light: true,
    link: 'https://dewfield.vercel.app',
    media: {
      desktop: 'projects/dewfield/home.webp',
      mobile: 'projects/dewfield/home-m.webp',
      gallery: [
        { src: 'projects/dewfield/shop.webp', caption: '상품 목록 — 카테고리·피부 고민 필터', device: 'desktop' },
        { src: 'projects/dewfield/product.webp', caption: '상품 상세 — 용량 선택과 리뷰', device: 'desktop' },
        { src: 'projects/dewfield/finder.webp', caption: '피부 진단 — 질문 5개', device: 'desktop' },
        { src: 'projects/dewfield/journal.webp', caption: '저널 — 카테고리 필터', device: 'desktop' },
        { src: 'projects/dewfield/shop-m.webp', caption: '상품 목록', device: 'mobile' },
        { src: 'projects/dewfield/product-m.webp', caption: '상품 상세', device: 'mobile' },
        { src: 'projects/dewfield/finder-m.webp', caption: '피부 진단', device: 'mobile' },
      ],
    },
    detail: {
      role: '디자인 · 프론트엔드',
      period: '2026.08 — 2026.09',
      overview:
        'Figma 에디토리얼 시안(데스크톱 1440 · 모바일 390)을 Next.js App Router로 옮긴 스킨케어 브랜드 사이트입니다. 390px부터 1440px까지 글자 크기와 여백이 자연스럽게 커지고, 장바구니·결제·피부 진단·검색이 실제로 동작합니다.',
      highlights: [
        { value: '5', label: 'REST API 엔드포인트' },
        { value: '18', label: '데이터로 조립하는 상품 배너' },
        { value: '390–1440', label: '유동 타이포그래피 범위 (px)' },
      ],
      features: [
        {
          title: 'REST API (Route Handlers)',
          desc: '상품 목록·상세, 리뷰 페이지네이션과 필터, 검색, 주문 생성을 API로 만들고, 화면과 API가 같은 서비스 함수를 씁니다. 주문 가격은 서버가 다시 계산합니다.',
        },
        {
          title: '비동기 화면 처리',
          desc: '리뷰는 첫 페이지를 서버에서 렌더링하고 이후 요청은 스켈레톤·오류·빈 결과 상태를 처리합니다. 검색 자동완성은 디바운스와 요청 취소, 키보드 조작, combobox 접근성 속성을 갖췄습니다.',
        },
        {
          title: '장바구니와 결제',
          desc: '외부 상태 라이브러리 없이 Context와 localStorage로 장바구니를 관리하고, 결제는 브라우저 1차 검증 후 서버 2차 검증, 처리 중 버튼 잠금으로 중복 주문을 막습니다.',
        },
        {
          title: '피부 진단',
          desc: '질문 5개(단일·다중 선택, 척도, 이미지 선택)에 답하면 피부 프로필을 계산하고 추천 루틴을 한 번에 담을 수 있습니다.',
        },
      ],
      decisions: [
        {
          title: '배너 레지스트리',
          desc: '상품 데이터의 sections 배열에 type과 내용만 적으면 레지스트리에서 컴포넌트를 찾아 그립니다. 배너 순서 변경이나 재사용에 코드 수정이 필요 없습니다.',
        },
        {
          title: '가격 규칙 한 곳에',
          desc: '무료배송 기준, 첫 구매 할인, 루틴 할인 규칙을 한 파일에 두고 장바구니와 결제가 같은 규칙을 씁니다.',
        },
        {
          title: '유동 타이포그래피 함수',
          desc: 'fl(28, 54)처럼 390px과 1440px의 값을 넘기면 그 사이를 비율로 계산하는 함수로 반응형 글자 크기를 관리합니다.',
        },
      ],
      stack: ['Next.js 14 (App Router)', 'React 18', 'JavaScript', 'SCSS Module', 'Route Handlers', 'next/image', 'Vercel'],
    },
  },
]

export const FILTERS: { key: 'all' | ProjectCategory; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'react', label: 'REACT' },
  { key: 'next', label: 'NEXT.JS' },
  { key: 'data', label: 'API · DATA' },
]

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id)
