import type { Project } from '../../data/projects'
import { Browser, Phone } from '../Device/Device'
import styles from './Cover.module.css'

export type CoverVariant = 'featured' | 'card' | 'hero'

/**
 * 프로젝트 대표 화면 구성: 톤 배경 위에 브라우저 창 + (있으면) 휴대폰을 겹쳐 배치.
 * 배치는 variant별 CSS에서 정합니다.
 */
export default function Cover({ project, variant, eager }: { project: Project; variant: CoverVariant; eager?: boolean }) {
  const { desktop, mobile } = project.media
  return (
    <div className={`${styles.stage} ${styles[variant]} ${mobile ? styles.withPhone : ''}`} aria-hidden="true">
      <Browser src={desktop} alt="" className={styles.browser} eager={eager} />
      {mobile && <Phone
          src={mobile}
          alt=""
          className={styles.phone}
          eager={eager}
          sizes="(max-width: 720px) 24vw, 12vw"
        />}
    </div>
  )
}
