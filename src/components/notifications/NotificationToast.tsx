import React from 'react'

export type ErrorType = 'gps_lost' | 'off_course' | 'offline' | 'server_error' | 'rerouting'

interface NotificationToastProps {
  errorType: ErrorType | null
  onClose: () => void
}

const errorConfigs: Record<ErrorType, { title: string; message: string; color: string }> = {
  gps_lost: {
    title: 'GPS LOST',
    message: 'Signal lost. Checking your location...',
    color: '#f59e0b',
  },
  off_course: { title: 'OFF COURSE', message: 'You are away from the route.', color: '#ef4444' },
  offline: { title: 'OFFLINE', message: 'No internet connection.', color: '#6b7280' },
  server_error: {
    title: 'SERVER ERROR',
    message: 'Backend issue. Please try again later.',
    color: '#1f2937',
  },
  rerouting: { title: 'REROUTING', message: 'Finding a new path for you...', color: '#3b82f6' },
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ errorType, onClose }) => {
  if (!errorType) return null
  const config = errorConfigs[errorType]

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: '90%',
        maxWidth: '400px',
        backgroundColor: config.color,
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <div>
        <strong style={{ display: 'block', fontSize: '14px', letterSpacing: '0.05em' }}>
          {config.title}
        </strong>
        <span style={{ fontSize: '13px', opacity: 0.9 }}>{config.message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '22px',
          padding: '0 5px',
        }}
      >
        ×
      </button>
    </div>
  )
}
