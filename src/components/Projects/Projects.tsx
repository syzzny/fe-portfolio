import { useState, type MouseEvent } from 'react'
import { detailHref } from '../../hooks/useRoute'
import { FILTERS, PROJECTS, type Project, type ProjectCategory } from '../../data/projects'
import Cover, { type CoverVariant } from './Cover'
import styles from './Projects.module.css'

type Filter = 'all' | ProjectCategory

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))

  // 첫 번째는 대표(풀폭), 마지막 두 개는 2열 그리드, 그 사이는 행 리스트
  const [featured, ...rest] = list
  const grid = rest.length >= 2 ? rest.slice(-2) : []
  const rows = rest.slice(0, rest.length - grid.length)

  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <div className={styles.titleRow}>
        <h1 id="work-title" className={`display ${styles.title}`}>
          Projects
        </h1>
        <sup className={styles.count} aria-label={`${list.length}개 프로젝트`}>
          {String(list.length).padStart(2, '0')}
        </sup>
      </div>

      <div className={styles.subRow}>
        <div className={styles.filters} role="group" aria-label="프로젝트 분류">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              className={styles.filter}
              onClick={() => setFilter(f.key)}
            >
              {filter === f.key ? `[${f.label}]` : f.label}
            </button>
          ))}
        </div>
        <p className={styles.intro}>
          기획·디자인·개발을 함께 다뤄 온 프론트엔드 개발자의 작업입니다.
          <br />
          문제를 정의한 방식과 구현 과정을 함께 정리했습니다.
        </p>
      </div>

      {featured && <Featured key={featured.id} project={featured} />}

      {rows.map((p) => (
        <Row key={p.id} project={p} />
      ))}

      {grid.length > 0 && <ProjectGrid items={grid} />}
    </section>
  )
}

/**
 * 프로젝트 이미지 영역. `linked`이면 클릭 시 상세페이지로 이동하고 원형 VIEW 커서가 나타납니다.
 * 카드 위 UI 목업(data-cursor-ignore)을 조작할 때는 이동하지 않습니다.
 */
export function Visual({
  project,
  variant,
  className = '',
  linked = true,
  eager,
}: {
  project: Project
  variant: CoverVariant
  className?: string
  linked?: boolean
  eager?: boolean
}) {
  const open = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('[data-cursor-ignore]')) return
    window.location.hash = detailHref(project.id)
  }

  return (
    <div
      className={`${styles.visual} ${className}`}
      style={{ background: project.tone }}
      {...(linked ? { 'data-cursor': 'VIEW', onClick: open } : {})}
    >
      <Cover project={project} variant={variant} eager={eager} />
    </div>
  )
}

/**
 * 키보드·터치 사용자를 위한 링크. 마우스 환경에서는 숨기고(포커스 시에만 표시)
 * 대신 ProjectCursor가 이미지 영역 위에서 원형 커서로 나타납니다.
 */
function ArrowButton({ project }: { project: Project }) {
  return (
    <a href={detailHref(project.id)} className={styles.arrow} aria-label={`${project.title} 자세히 보기`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </a>
  )
}

function Meta({ project }: { project: Project }) {
  return (
    <dl className={styles.metaRow}>
      <div className="meta">
        <dt>Stack</dt>
        <dd>{project.stack}</dd>
      </div>
      <div className="meta">
        <dt>Focus</dt>
        <dd>{project.focus}</dd>
      </div>
    </dl>
  )
}

export function Featured({ project }: { project: Project }) {
  return (
    <article className={`${styles.featured} ${styles.enter}`}>
      <Visual project={project} variant="featured" className={styles.featuredVisual} eager />
      <div className={`${styles.featuredCaption} ${project.light ? styles.onLight : ''}`}>
        <h2 className={`display ${styles.name}`}>{project.title}</h2>
        <p className={styles.summary}>{project.summary}</p>
        <span className="pill">{project.tag}</span>
      </div>
      <ArrowButton project={project} />
    </article>
  )
}

export function Row({ project }: { project: Project }) {
  return (
    <article className={`${styles.row} ${styles.enter}`}>
      <div className={styles.rowText}>
        <div className={styles.head}>
          <h2 className={`display ${styles.name}`}>{project.title}</h2>
          <p className={styles.summary}>{project.summary}</p>
          <span className="pill">{project.tag}</span>
        </div>
        <Meta project={project} />
      </div>
      <div className={styles.rowVisualWrap}>
        <Visual project={project} variant="card" className={styles.rowVisual} />
        <ArrowButton project={project} />
      </div>
    </article>
  )
}

export function GridItem({ project }: { project: Project }) {
  return (
    <article className={`${styles.gridItem} ${styles.enter}`}>
      <div className={styles.rowVisualWrap}>
        <Visual project={project} variant="card" className={styles.rowVisual} />
        <ArrowButton project={project} />
      </div>
      <div className={styles.gridText}>
        <div className={styles.head}>
          <h2 className={`display ${styles.name}`}>{project.title}</h2>
          <p className={styles.summary}>{project.summary}</p>
          <span className="pill">{project.tag}</span>
        </div>
        <Meta project={project} />
      </div>
    </article>
  )
}

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className={styles.grid}>
      {items.map((p) => (
        <GridItem key={p.id} project={p} />
      ))}
    </div>
  )
}
