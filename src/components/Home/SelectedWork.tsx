import { PROJECTS } from '../../data/projects'
import { Featured, ProjectGrid } from '../Projects/Projects'
import { useReveal } from '../../hooks/useReveal'
import styles from './SelectedWork.module.css'

/** 메인에서는 대표 1개 + 2열 2개만 보여주고, 전체는 Projects 페이지로 */
const SELECTED = PROJECTS.slice(0, 3)

export default function SelectedWork() {
  const ref = useReveal<HTMLElement>()
  const [featured, ...grid] = SELECTED

  return (
    <section ref={ref} aria-labelledby="selected-title" className={`reveal ${styles.section}`}>
      <div className={styles.head}>
        <div className={styles.titleRow}>
          <h2 id="selected-title" className={`display ${styles.title}`}>
            Selected work
          </h2>
          <sup className={styles.count}>{String(SELECTED.length).padStart(2, '0')}</sup>
        </div>
        <a href="#work" className={styles.all}>
          All projects ({String(PROJECTS.length).padStart(2, '0')}) ↗
        </a>
      </div>

      <Featured project={featured} />
      <ProjectGrid items={grid} />
    </section>
  )
}
