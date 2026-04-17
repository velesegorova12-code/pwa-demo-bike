import React from 'react'

export type ErrorType = 'gps_lost' | 'off_course' | 'offline' | 'server_error'

interface NotificationToastProps {
  errorType: ErrorType | null
  onClose: () => void
}

const errorConfigs: Record<ErrorType, { title: string; message: string; color: string }> = {
  gps_lost: { title: 'GPS LOST', message: 'Signal lost.', color: '#f59e0b' },
  off_course: { title: 'OFF COURSE', message: 'Away from route.', color: '#ef4444' },
  offline: { title: 'OFFLINE', message: 'No internet.', color: '#6b7280' },
  server_error: { title: 'SERVER ERROR', message: 'Internal error (500).', color: '#1f2937' },
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
        backgroundColor: config.color,
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <div>
        <strong>{config.title}:</strong> {config.message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '18px',
        }}
      >
        ×
      </button>
    </div>
  )
}
