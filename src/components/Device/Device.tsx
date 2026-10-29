import styles from './Device.module.css'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** 작은 크기로 보일 때 쓰는 축소본 (파일명-s.webp) — 크게 줄여 보일 때 글자가 깨지지 않게 */
const small = (path: string) => path.replace(/\.webp$/, '-s.webp')

interface ShotProps {
  src: string
  alt: string
  className?: string
  /** 첫 화면에 보이는 이미지만 eager */
  eager?: boolean
  /** 화면에 보이는 대략의 너비 — 브라우저가 알맞은 해상도를 고름 */
  sizes?: string
}

/** 브라우저 창 프레임 + 화면 캡처 */
export function Browser({
  src,
  alt,
  className = '',
  eager,
  sizes = '(max-width: 720px) 100vw, 50vw',
}: ShotProps) {
  return (
    <div className={`${styles.browser} ${className}`}>
      <div className={styles.bar} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {/* 모든 화면을 같은 16:10 비율로 맞추고, 위쪽 기준으로 자름 */}
      <div className={styles.screen}>
        <img
          src={asset(src)}
          srcSet={`${asset(small(src))} 800w, ${asset(src)} 1600w`}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </div>
  )
}

/** 휴대폰 프레임 + 모바일 캡처 */
export function Phone({ src, alt, className = '', eager, sizes = '220px' }: ShotProps) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <img
        src={asset(src)}
        srcSet={`${asset(small(src))} 300w, ${asset(src)} 600w`}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
