import { useEffect, useState } from 'react'
import type { Page } from '../../hooks/useRoute'
import styles from './Header.module.css'

export const MENU = [
  { href: '#work', label: 'WORK', page: 'work' as Page },
  { href: '#about', label: 'ABOUT' },
  { href: '#contact', label: 'CONTACT' },
]

export function Logo() {
  return (
    <a href="#home" className={styles.logo}>
      YEJIN
    </a>
  )
}

export function Menu({ label, page }: { label: string; page?: Page }) {
  return (
    <nav aria-label={label}>
      <ul className={styles.menu}>
        {MENU.map((m) => (
          <li key={m.href}>
            <a
              href={m.href}
              className={`pill ${styles.item}`}
              aria-current={page && m.page === page ? 'page' : undefined}
            >
              {m.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Header({ page }: { page: Page }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header id="home" className={styles.header} data-scrolled={scrolled}>
      <Logo />
      <Menu label="주요 메뉴" page={page} />
    </header>
  )
}
