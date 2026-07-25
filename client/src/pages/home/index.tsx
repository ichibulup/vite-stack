import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import heroImg from '../../assets/hero.png'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'

export default function HomePage() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMessage() {
      try {
        const response = await fetch('/api/hello', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data: { message: string } = await response.json()
        setMessage(data.message)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error(error)
          setMessage('API unavailable')
        }
      }
    }

    void fetchMessage()
    return () => controller.abort()
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1>Get started {message}</h1>
          <p>
            React, Vite, Express, and routing are ready.
          </p>
        </div>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks" />

      <section id="next-steps">
        <div id="docs">
          <h2>Explore the application</h2>
          <p>Open the separate routed demo experience.</p>
          <ul>
            <li>
              <Link to="/demo">View demo page</Link>
            </li>
          </ul>
        </div>

        <div id="social">
          <h2>Documentation</h2>
          <p>Learn more about the frontend stack.</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                Learn React
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
