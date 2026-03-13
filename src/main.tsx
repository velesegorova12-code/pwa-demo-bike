import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppProviders } from './app/providers/AppProviders'
import { AppRouter } from './app/routes'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
)
