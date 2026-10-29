import { useEffect, useState } from 'react'

export type Page = 'home' | 'work' | 'detail'
export interface Route {
  page: Page
  /** 상세페이지일 때 프로젝트 id */
  id?: string
}

/**
 * 해시 기반의 아주 작은 라우터.
 * - `#work`        → 프로젝트 목록
 * - `#work/<id>`   → 프로젝트 상세
 * - `#home`, 빈 해시 → 메인
 * - `#about`       → 메인으로 이동 후 About으로 스크롤
 * - `#contact`     → 현재 페이지의 푸터로 스크롤 (기본 앵커 동작)
 */
const parse = (): Route => {
  const hash = window.location.hash
  if (hash.startsWith('#work/')) return { page: 'detail', id: decodeURIComponent(hash.slice(6)) }
  if (hash === '#work') return { page: 'work' }
  return { page: 'home' }
}

/** 고정 헤더 높이만큼 위 여백을 두고 스크롤 */
const HEADER_OFFSET = 96

const scrollToId = (id: string) => {
  // 페이지가 바뀐 뒤 렌더가 끝나고 스크롤하도록 두 프레임 뒤에 실행
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (!el) return
      // 등장 애니메이션(transform)에 영향받지 않도록 offsetTop으로 실제 위치 계산
      let top = 0
      for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
        top += node.offsetTop
      }
      window.scrollTo({ top: top - HEADER_OFFSET, behavior: 'smooth' })
    }),
  )
}

export const detailHref = (id: string) => `#work/${id}`

export function useRoute() {
  const [route, setRoute] = useState<Route>(parse)

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (hash === '#about') {
        setRoute({ page: 'home' })
        scrollToId('about')
      } else if (hash === '#contact' || hash === '#main') {
        // 같은 페이지 안의 앵커 — 라우트는 그대로
      } else {
        setRoute(parse())
        window.scrollTo({ top: 0 })
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
