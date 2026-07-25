import { useState } from 'react'
import { Link } from 'react-router'

const features = [
  {
    title: 'React Router',
    description: 'Client-side navigation is ready for additional pages.',
  },
  {
    title: 'Vite',
    description: 'Fast development and production builds are configured.',
  },
  {
    title: 'Express API',
    description: 'Frontend requests are proxied to the backend server.',
  },
]

export default function DemoPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem('demo-auth-user')
    return storedUser ? (JSON.parse(storedUser) as { name: string; email: string }) : null
  })

  function signOut() {
    localStorage.removeItem('demo-auth-user')
    setUser(null)
  }

  return (
    <main className="demo-page">
      <nav className="demo-nav" aria-label="Demo navigation">
        <Link to="/">Home</Link>
        <Link to="/auth/sign-in">Login</Link>
        <Link to="/auth/sign-up">Register</Link>
      </nav>

      <header className="demo-hero">
        <span className="demo-eyebrow">Laptop Commerce</span>
        <h1>Frontend demo page</h1>
        <p>
          A simple routed page for testing the application shell and shared
          routes.
        </p>
        <a className="demo-action" href="/api/hello">
          Test backend API
        </a>
        <div className="demo-auth">
          {user ? (
            <>
              <span>
                Signed in as <strong>{user.name}</strong> ({user.email})
              </span>
              <button type="button" onClick={signOut}>
                Sign out
              </button>
            </>
          ) : (
            <span>You are browsing as a guest.</span>
          )}
        </div>
      </header>

      <section className="demo-grid" aria-label="Demo features">
        {features.map((feature) => (
          <article className="demo-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
