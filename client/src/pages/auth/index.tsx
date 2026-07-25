import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const DEMO_EMAIL = 'demo@laptop.com'
const DEMO_PASSWORD = 'demo123'

type AuthFormProps = {
  mode: 'sign-in' | 'sign-up'
}

function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const isSignIn = mode === 'sign-in'
  const [name, setName] = useState('')
  const [email, setEmail] = useState(isSignIn ? DEMO_EMAIL : '')
  const [password, setPassword] = useState(isSignIn ? DEMO_PASSWORD : '')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (isSignIn && (email !== DEMO_EMAIL || password !== DEMO_PASSWORD)) {
      setError('Use the demo credentials shown below.')
      return
    }

    if (!isSignIn && (!name.trim() || password.length < 6)) {
      setError('Enter your name and a password with at least 6 characters.')
      return
    }

    localStorage.setItem(
      'demo-auth-user',
      JSON.stringify({
        name: isSignIn ? 'Demo Shopper' : name.trim(),
        email,
      }),
    )
    navigate('/demo', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="auth-back" to="/">
          ← Back home
        </Link>
        <span className="demo-eyebrow">Laptop Commerce</span>
        <h1>{isSignIn ? 'Welcome back' : 'Create an account'}</h1>
        <p>
          {isSignIn
            ? 'Sign in with the hard-coded demo account.'
            : 'Create a temporary account for this browser session.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <label>
              Name
              <input
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete={isSignIn ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit">
            {isSignIn ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        {isSignIn && (
          <div className="auth-hint">
            <strong>Demo credentials</strong>
            <code>{DEMO_EMAIL}</code>
            <code>{DEMO_PASSWORD}</code>
          </div>
        )}

        <p className="auth-switch">
          {isSignIn ? 'Need an account?' : 'Already have an account?'}{' '}
          <Link to={isSignIn ? '/auth/sign-up' : '/auth/sign-in'}>
            {isSignIn ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </section>
    </main>
  )
}

export function SignInPage() {
  return <AuthForm mode="sign-in" />
}

export function SignUpPage() {
  return <AuthForm mode="sign-up" />
}
