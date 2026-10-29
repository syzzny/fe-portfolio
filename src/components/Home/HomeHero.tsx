import styles from './HomeHero.module.css'

const META = [
  { label: 'Role', value: 'Frontend Developer' },
  { label: 'Focus', value: 'React · TypeScript' },
  { label: 'Background', value: '3Y Product Design' },
]

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.topRow}>
        <span className={styles.index}>Yejin — Frontend Developer</span>
        <span className={`pill ${styles.status}`}>
          <span className={styles.dot} aria-hidden="true" />
          Open to work
        </span>
      </div>

      {/* Projects 페이지의 큰 제목과 같은 형식: 압축 서체 한 단어 + 위첨자 */}
      <div className={styles.titleRow}>
        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.mask}>
            <span className={styles.line}>Portfolio</span>
          </span>
        </h1>
        <sup className={styles.year}>©2026</sup>
      </div>

      <div className={styles.info}>
        <dl className={styles.metaList}>
          {META.map((m) => (
            <div key={m.label} className="meta">
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.intro}>
          <p className={styles.lead}>
            실서비스의 화면을 설계부터 구현까지 책임져 왔습니다. 디자인 의도를 지키는 컴포넌트 구조,
            예측 가능한 상태 관리, 오래 유지할 수 있는 코드를 기준으로 일합니다.
          </p>
          <a href="#work" className={styles.cta}>
            View all projects
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
