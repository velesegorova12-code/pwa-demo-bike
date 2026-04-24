import { Toaster } from 'react-hot-toast'

import { AppHeaderActions } from '@app/navigation/AppHeaderActions'
import { AppLayout } from '@components/Layout'
import { Outlet } from '@lib/router'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppLayout headerActions={<AppHeaderActions />}>
        <Outlet />
      </AppLayout>
    </>
  )
}

export default App
