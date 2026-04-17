import React, { useEffect } from 'react'

export type ErrorType = 'gps_lost' | 'off_course' | 'rerouting' | 'offline' | 'server_error'

interface NotificationToastProps {
  errorType: ErrorType | null
  onClose: () => void
}

const NOTIFICATION_CONFIG: Record<ErrorType, { title: string; message: string; color: string }> = {
  gps_lost: {
    title: 'GPS Lost',
    message: 'Signal lost. Checking connection...',
    color: '#f59e0b',
  },
  off_course: {
    title: 'Off Course',
    message: 'You have deviated from the route.',
    color: '#dc2626',
  },
  rerouting: {
    title: 'Rerouting',
    message: 'Calculating new path...',
    color: '#3b82f6',
  },
  offline: {
    title: 'Offline',
    message: 'Internet connection lost.',
    color: '#ea580c',
  },
  server_error: {
    title: 'Server Error',
    message: 'Could not connect to service.',
    color: '#1f2937',
  },
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ errorType, onClose }) => {
  useEffect(() => {
    // Auto-close after 5s unless it's rerouting (which stays until resolved)
    if (errorType && errorType !== 'rerouting') {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorType, onClose])

  if (!errorType) return null

  const { title, message, color } = NOTIFICATION_CONFIG[errorType]

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'calc(100% - 32px)',
        maxWidth: '420px',
        padding: '16px',
        borderRadius: '12px',
        color: '#ffffff',
        backgroundColor: color,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: '13px', opacity: 0.95 }}>{message}</span>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: '#ffffff',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
        }}
      >
        &times;
      </button>
    </div>
  )
}
