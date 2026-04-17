import React, { useState, useEffect, useCallback } from 'react'

import { NotificationToast, ErrorType } from '../components/notifications/NotificationToast'

export const App: React.FC = () => {
  const [activeError, setActiveError] = useState<ErrorType | null>(
    typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : null,
  )

  const handleClose = useCallback(() => {
    setActiveError(null)
  }, [])

  // Auto-dismiss logic: hides the toast after 5 seconds
  useEffect(() => {
    if (activeError && activeError !== 'server_error' && activeError !== 'offline') {
      const timer = setTimeout(() => {
        setActiveError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [activeError])

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
    <div className="app-main-layout">
      <NotificationToast errorType={activeError} onClose={handleClose} />
    </div>
  )
}

export default App
