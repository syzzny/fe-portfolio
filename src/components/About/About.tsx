import { BIO, EXPERIENCE, SKILLS } from '../../data/experience'
import { useReveal } from '../../hooks/useReveal'
import styles from './About.module.css'

export default function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className={`reveal ${styles.section}`}>
      <div className={styles.top}>
        <h2 id="about-title" className={`display ${styles.title}`}>
          About
        </h2>
        <p className={styles.bio}>{BIO}</p>
      </div>

      <div className={styles.block}>
        <h3 className={styles.label}>Experience</h3>
        <ul className={styles.table}>
          {EXPERIENCE.map((e) => (
            <li key={e.name + e.period} className={styles.tr}>
              <span className={styles.period}>{e.period}</span>
              <span className={styles.name}>{e.name}</span>
              {e.desc && <span className={styles.desc}>{e.desc}</span>}
              {e.role && <span className={styles.role}>{e.role}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h3 className={styles.label}>Skills</h3>
        <dl className={styles.skills}>
          {SKILLS.map((s) => (
            <div key={s.group} className={styles.skillGroup}>
              <dt>{s.group}</dt>
              <dd>
                {s.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
