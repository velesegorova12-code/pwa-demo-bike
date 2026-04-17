import React, { useState, useEffect, useCallback } from 'react'

import { NotificationToast, ErrorType } from '../components/notifications/NotificationToast'

export const App: React.FC = () => {
  // We set the initial state based on current navigator status to avoid setState in useEffect
  const [activeError, setActiveError] = useState<ErrorType | null>(
    typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : null,
  )

  const handleClose = useCallback(() => setActiveError(null), [])

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
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NotificationToast errorType={activeError} onClose={handleClose} />

      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
          Navigation System
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
          Simulator Mode: Active
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(['gps_lost', 'off_course', 'rerouting'] as ErrorType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveError(type)}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                fontWeight: 500,
              }}
            >
              Simulate {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
