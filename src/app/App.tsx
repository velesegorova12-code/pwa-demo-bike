import React, { useState, useEffect, useCallback } from 'react'

import { NotificationToast, ErrorType } from '../components/notifications/NotificationToast'

export const App: React.FC = () => {
  const [activeError, setActiveError] = useState<ErrorType | null>(
    typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : null,
  )

  const handleClose = useCallback(() => {
    setActiveError(null)
  }, [])

  useEffect(() => {
    if (activeError && activeError !== 'server_error' && activeError !== 'offline') {
      const timer = setTimeout(() => {
        setActiveError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [activeError])

  useEffect(() => {
    const updateStatus = () => setActiveError(navigator.onLine ? null : 'offline')
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  return (
    <div className="app-main-layout">
      <NotificationToast errorType={activeError} onClose={handleClose} />
    </div>
  )
}

export default App
