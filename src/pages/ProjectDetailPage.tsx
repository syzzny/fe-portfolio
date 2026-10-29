import { useEffect } from 'react'
import { getProject } from '../data/projects'
import ProjectDetail from '../components/ProjectDetail/ProjectDetail'

export default function ProjectDetailPage({ id }: { id: string }) {
  const project = getProject(id)

  useEffect(() => {
    document.title = project ? `${project.title} — Yejin` : 'Yejin — Frontend Developer'
    return () => {
      document.title = 'Yejin — Frontend Developer'
    }
  }, [project])

  if (!project) {
    return (
      <section style={{ paddingBlock: '120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h1 className="display" style={{ margin: 0, fontSize: 'var(--fs-section)' }}>
          Not found
        </h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-kr)' }}>찾으시는 프로젝트가 없습니다.</p>
        <a href="#work" style={{ fontSize: 'var(--fs-xs)' }}>
          ← 프로젝트 목록으로
        </a>
      </section>
    )
  }

  return <ProjectDetail project={project} />
}
