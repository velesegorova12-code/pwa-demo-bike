import { useState } from 'react'

import { AppHeaderActions } from '@app/navigation/AppHeaderActions'
import { AppLayout } from '@components/Layout'
import { Outlet } from '@lib/router'

import { NotificationToast, type ErrorType } from '../components/notifications/NotificationToast'

function App() {
  const [activeError, setActiveError] = useState<ErrorType | null>(null)

  const handleClose = () => setActiveError(null)

  return (
    <AppLayout headerActions={<AppHeaderActions />}>
      <NotificationToast errorType={activeError} onClose={handleClose} />
      <Outlet />
    </AppLayout>
  )
}

export default App
