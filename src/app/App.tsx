import React, { useState, useEffect, useCallback } from 'react'

import { NotificationToast, ErrorType } from '../components/notifications/NotificationToast'

export const App: React.FC = () => {
  const [activeError, setActiveError] = useState<ErrorType | null>(
    typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : null,
  )

  const handleClose = useCallback(() => {
    setActiveError(null)
  }, [])

  const handleTestServerError = useCallback(() => {
    setActiveError('server_error')
  }, [])

  useEffect(() => {
    const updateOnlineStatus = () => {
      setActiveError(navigator.onLine ? null : 'offline')
    }
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        fontFamily: 'sans-serif',
      }}
    >
      <NotificationToast errorType={activeError} onClose={handleClose} />

      <div
        style={{
          padding: '40px',
          background: '#ffffff',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
          Cycle Planner Debug
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={handleTestServerError}
            style={{
              padding: '12px',
              backgroundColor: '#111827',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Test 500 Error (Gretlin's Case)
          </button>

          <button
            onClick={() => setActiveError('gps_lost')}
            style={{
              padding: '10px',
              backgroundColor: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Simulate GPS Lost
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
