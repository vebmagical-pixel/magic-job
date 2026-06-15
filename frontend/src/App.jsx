import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [status, setStatus] = useState('disconnected')
  const [backendHealth, setBackendHealth] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Initialize Socket.io connection
    const newSocket = io(API_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    newSocket.on('connect', () => {
      setStatus('connected')
      setError(null)
    })

    newSocket.on('disconnect', () => {
      setStatus('disconnected')
    })

    newSocket.on('error', (err) => {
      setError(`Connection error: ${err}`)
    })

    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}/health`)
      setBackendHealth(response.data)
    } catch (err) {
      setError(`Failed to check health: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>✨ Magic Job</h1>
        <p>Real-time job management system</p>
      </header>

      <main className="container">
        <div className="card">
          <h2>Connection Status</h2>
          <div className={`status-badge ${status}`}>
            {status === 'connected' ? '🟢' : '🔴'} {status.toUpperCase()}
          </div>
        </div>

        <div className="card">
          <h2>Backend Health</h2>
          <button 
            onClick={checkHealth} 
            disabled={loading}
            className="btn"
          >
            {loading ? 'Checking...' : 'Check Health'}
          </button>
          {backendHealth && (
            <div className="health-info">
              <p><strong>Status:</strong> {backendHealth.status}</p>
              <p><strong>Uptime:</strong> {backendHealth.uptime.toFixed(2)}s</p>
              <p><strong>Timestamp:</strong> {new Date(backendHealth.timestamp).toLocaleString()}</p>
            </div>
          )}
        </div>

        {error && (
          <div className="card error">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="card">
          <h2>Features</h2>
          <ul>
            <li>✅ Real-time Socket.io connection</li>
            <li>✅ Backend health monitoring</li>
            <li>✅ RESTful API integration</li>
            <li>⏳ Job management (coming soon)</li>
            <li>⏳ Task scheduling (coming soon)</li>
          </ul>
        </div>
      </main>

      <footer className="footer">
        <p>Magic Job Frontend v1.0.0</p>
      </footer>
    </div>
  )
}

export default App
