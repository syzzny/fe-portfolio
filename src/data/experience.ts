export interface ExperienceItem {
  period: string
  name: string
  desc?: string
  role?: string
}

export const BIO =
  '디자인의 디테일을 이해하고 코드로 정확하게 구현합니다. React와 TypeScript를 기반으로 시각적 완성도와 기술적 안정성을 모두 갖춘 인터페이스를 만듭니다.'

export const EXPERIENCE: ExperienceItem[] = [
  { period: '2026.09 — 2026.10', name: 'Trippio', desc: 'AI 여행 일정 생성 서비스', role: '개인 프로젝트' },
  { period: '2026.09 — 2026.10', name: '온결피부과', desc: '피부과 반응형 웹사이트', role: '개인 프로젝트' },
  { period: '2026.09 — 2026.10', name: '에너지전환진흥원', desc: '공공기관 누리집 React 전환', role: '개인 프로젝트' },
  { period: '2026.08 — 2026.09', name: 'LineOn MES', desc: '제조 생산관리 시스템', role: '개인 프로젝트' },
  { period: '2026.08 — 2026.09', name: 'Dewfield', desc: '스킨케어 브랜드 쇼핑몰', role: '개인 프로젝트' },
  { period: '2026.04 — 2026.07', name: '레드버튼 웹', desc: '레드버튼 앱의 웹 버전' },
  { period: '2025.12 — 2026.02', name: '블루세일', desc: '보험설계사용 고객관리 웹 서비스' },
  { period: '2024.09 — 2026.07', name: '레드버튼 앱', desc: '건강관리 서비스', role: '퍼블리싱 일부' },
  { period: '2024.09 — 2026.07', name: '블루버튼 앱', desc: '직장인 금융·세무 서비스' },
]

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Core', items: ['React', 'TypeScript', 'Next.js', 'JavaScript'] },
  { group: 'Styling', items: ['Tailwind CSS', 'SCSS Module', 'CSS Modules'] },
  { group: 'Data', items: ['Supabase', 'Firebase', 'REST API'] },
  { group: 'Tools', items: ['Vite', 'Git · GitHub', 'Figma', 'Storybook'] },
]
