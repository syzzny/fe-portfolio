import { useState } from 'react'
import { Logo, Menu } from '../Header/Header'
import { useReveal } from '../../hooks/useReveal'
import styles from './Contact.module.css'

// TODO: 실제 정보로 교체
const EMAIL = 'son115502@gmail.com'
const GITHUB = 'https://github.com/syzzny'

const RING = 'CONTACT ME · CONTACT ME · '

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const ref = useReveal<HTMLDivElement>()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <footer id="contact" className={styles.footer}>
      <div ref={ref} className="reveal">
        <h2 className={`display ${styles.title}`}>Contact</h2>

        <div className={styles.info}>
          <address className={styles.contact}>
            <button type="button" className={styles.copy} onClick={copyEmail}>
              {copied ? '복사됐어요' : EMAIL}
            </button>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <Logo />
        <a href={`mailto:${EMAIL}`} className={styles.badge} aria-label="이메일 보내기">
          <svg viewBox="0 0 100 100" className={styles.ring} aria-hidden="true">
            <defs>
              <path id="ring-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text textLength="234" lengthAdjust="spacing">
              <textPath href="#ring-path">{RING}</textPath>
            </text>
          </svg>
          <span className={styles.core}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </a>
        <Menu label="하단 메뉴" />
      </div>

      <span className="visually-hidden" aria-live="polite">
        {copied ? '이메일 주소를 복사했습니다' : ''}
      </span>
    </footer>
  )
}
