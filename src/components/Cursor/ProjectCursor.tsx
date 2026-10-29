import { useEffect, useRef, useState } from 'react'
import styles from './ProjectCursor.module.css'

/**
 * `data-cursor="라벨"`이 붙은 영역 위에서만 나타나는 원형 커서.
 * - 마우스(정밀 포인터) 환경에서만 동작하고, 터치 기기에서는 렌더링하지 않습니다.
 * - `data-cursor-ignore` 영역(카드 위 UI 목업) 위에서는 숨겨서 기본 커서로 조작할 수 있게 합니다.
 */
export default function ProjectCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = { x: -200, y: -200 }
    const pos = { x: -200, y: -200 }
    let frame = 0

    // 마우스를 살짝 늦게 따라오도록 보간
    const tick = () => {
      const ease = reduce ? 1 : 0.22
      pos.x += (target.x - pos.x) * ease
      pos.y += (target.y - pos.y) * ease
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const t = e.target as Element | null
      const zone = t?.closest<HTMLElement>('[data-cursor]')
      const ignored = t?.closest('[data-cursor-ignore]')
      setLabel(zone && !ignored ? (zone.dataset.cursor ?? '') : null)
    }
    const onLeave = () => setLabel(null)

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <span className={styles.ball} data-active={label !== null}>
        <span className={styles.label}>{label}</span>
        <svg viewBox="0 0 24 24">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </div>
  )
}
