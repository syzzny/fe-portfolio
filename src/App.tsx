import Header from './components/Header/Header'
import Contact from './components/Contact/Contact'
import ProjectCursor from './components/Cursor/ProjectCursor'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import { useRoute } from './hooks/useRoute'

export default function App() {
  const route = useRoute()

  const content =
    route.page === 'detail' ? (
      <ProjectDetailPage id={route.id ?? ''} />
    ) : route.page === 'work' ? (
      <ProjectsPage />
    ) : (
      <HomePage />
    )

  return (
    <div className="container">
      <a className="visually-hidden" href="#main">
        본문으로 건너뛰기
      </a>
      <Header page={route.page === 'detail' ? 'work' : route.page} />
      <main id="main" key={`${route.page}-${route.id ?? ''}`}>
        {content}
      </main>
      <Contact />
      <ProjectCursor />
    </div>
  )
}
