import type { CSSProperties, ReactNode } from 'react'
import { PROJECTS, type Project } from '../../data/projects'
import { detailHref } from '../../hooks/useRoute'
import { useReveal } from '../../hooks/useReveal'
import { Visual } from '../Projects/Projects'
import { Browser, Phone } from '../Device/Device'
import styles from './ProjectDetail.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

/** 라벨(왼쪽) + 내용(오른쪽) 2열 섹션. About 섹션과 같은 구조 */
function Block({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} className={`reveal ${styles.block} ${wide ? styles.wide : ''}`} aria-label={label}>
      <h2 className={styles.label}>{label}</h2>
      <div className={styles.blockBody}>{children}</div>
    </section>
  )
}

/** 화면 캡처 + 캡션 */
function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  const ref = useReveal<HTMLElement>()
  return (
    <figure ref={ref} className={`reveal ${styles.figure}`}>
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { detail, media } = project
  const index = PROJECTS.findIndex((p) => p.id === project.id)
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const desktops = media.gallery.filter((g) => g.device === 'desktop')
  const phones = media.gallery.filter((g) => g.device === 'mobile')
  const tone = { '--tone': project.tone } as CSSProperties

  return (
    <article className={styles.page} style={tone}>
      {/* ---------- 상단 ---------- */}
      <div className={styles.topRow}>
        <a href="#work" className={styles.back}>
          ← All projects
        </a>
        <span className={styles.index}>
          {pad(index + 1)} / {pad(PROJECTS.length)}
        </span>
      </div>

      <div className={styles.titleRow}>
        <h1 className={`display ${styles.title}`}>{project.title}</h1>
        <sup className={styles.year}>{project.year}</sup>
      </div>

      <div className={styles.lead}>
        <p className={styles.summary}>{project.summary}</p>
        <dl className={styles.metaList}>
          <div className="meta">
            <dt>Role</dt>
            <dd>{detail.role}</dd>
          </div>
          <div className="meta">
            <dt>{detail.period ? 'Period' : 'Year'}</dt>
            <dd>{detail.period ?? project.year}</dd>
          </div>
          <div className="meta">
            <dt>Type</dt>
            <dd>{project.tag}</dd>
          </div>
          {project.link && (
            <div className="meta">
              <dt>Site</dt>
              <dd>
                <a href={project.link} target="_blank" rel="noreferrer" className={styles.siteLink}>
                  {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <Visual project={project} variant="hero" linked={false} className={styles.hero} eager />

      {/* ---------- 개요 + 숫자 ---------- */}
      <Block label="Overview">
        <p className={styles.overview}>{detail.overview}</p>
        <ul className={styles.stack}>
          {detail.stack.map((s) => (
            <li key={s} className="pill">
              {s}
            </li>
          ))}
        </ul>
      </Block>

      {detail.highlights && detail.highlights.length > 0 && (
        <section className={styles.numbers} aria-label="Results">
          {detail.highlights.map((h) => (
            <div key={h.label} className={styles.numberItem}>
              <span className={`display ${styles.number}`}>{h.value}</span>
              <span className={styles.numberLabel}>{h.label}</span>
            </div>
          ))}
        </section>
      )}

      {/* ---------- 화면 갤러리: 데스크톱 2열 · 모바일 3열, 모두 같은 크기 ---------- */}
      {desktops.length > 0 && (
        <section className={styles.gallery} aria-labelledby="screens-title">
          <h2 id="screens-title" className={`display ${styles.sectionTitle}`}>
            Screens
          </h2>
          <div className={styles.desktopGrid}>
            {desktops.map((d) => (
              <Figure key={d.src} caption={d.caption}>
                <Browser src={d.src} alt={d.caption} />
              </Figure>
            ))}
          </div>
          {phones.length > 0 && (
            <div className={styles.toneBand}>
              {phones.map((m) => (
                <Figure key={m.src} caption={m.caption}>
                  <Phone src={m.src} alt={m.caption} />
                </Figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ---------- 주요 기능 ---------- */}
      <section className={styles.features} aria-labelledby="features-title">
        <h2 id="features-title" className={`display ${styles.sectionTitle}`}>
          Key features
        </h2>
        <ol className={`${styles.featureGrid} ${detail.features.length % 3 === 0 ? styles.three : ''}`}>
          {detail.features.map((f, i) => (
            <li key={f.title} className={styles.featureCard}>
              <span className={styles.itemNo}>{pad(i + 1)}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.itemDesc}>{f.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- 설계 결정 · 트러블슈팅 ---------- */}
      <Block label="Decisions">
        <ul className={styles.list}>
          {detail.decisions.map((d) => (
            <li key={d.title} className={styles.item}>
              <h3 className={styles.itemTitle}>{d.title}</h3>
              <p className={styles.itemDesc}>{d.desc}</p>
            </li>
          ))}
        </ul>
      </Block>

      {detail.troubleshooting && detail.troubleshooting.length > 0 && (
        <Block label="Troubleshooting">
          <ul className={styles.list}>
            {detail.troubleshooting.map((t, i) => (
              <li key={t.problem} className={styles.trouble}>
                <span className={styles.tNo}>{pad(i + 1)}</span>
                <div>
                  <span className={styles.tLabel}>Problem</span>
                  <p className={styles.itemDesc}>{t.problem}</p>
                </div>
                <div>
                  <span className={`${styles.tLabel} ${styles.tSolution}`}>Solution</span>
                  <p className={styles.itemDesc}>{t.solution}</p>
                </div>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* ---------- 다음 프로젝트 ---------- */}
      <a href={detailHref(next.id)} className={styles.next} data-cursor="VIEW">
        <div className={styles.nextText}>
          <span className={styles.nextLabel}>Next project — {pad(((index + 1) % PROJECTS.length) + 1)}</span>
          <span className={`display ${styles.nextTitle}`}>{next.title}</span>
        </div>
        <div className={styles.nextVisual} style={{ background: next.tone }}>
          <Browser src={next.media.desktop} alt="" className={styles.nextShot} />
        </div>
      </a>
    </article>
  )
}
