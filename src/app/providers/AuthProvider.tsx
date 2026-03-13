import { useCallback, useEffect, useState, type ReactNode } from 'react'

import { login as apiLogin, logout as apiLogout, getMe } from '@api/auth'
import {
  AuthContext,
  clearCsrfToken,
  setCsrfToken,
  setOnUnauthenticated,
  type AuthStatus,
} from '@lib/auth'
import type { AuthUser, LoginCredentials } from '@models/auth'

type Props = { children: ReactNode }

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  const logout = useCallback(async (): Promise<void> => {
    // Safe to call from the 401 interceptor bridge even if the
    // user is already signed out or the CSRF token has already been cleared.
    if (status === 'unauthenticated') return

    try {
      await apiLogout()
    } finally {
      // Always clear local state regardless of whether the server call succeeded.
      // A failed server logout must not leave the client in an authenticated state.
      setUser(null)
      setStatus('unauthenticated')
      clearCsrfToken()
    }
  }, [status])

  // Register logout as the handler for mid-session 401s from the Axios interceptor.
  // The interceptor calls triggerUnauthenticated() — it never touches React directly.
  // Unregister on unmount to avoid stale closures.
  useEffect(() => {
    setOnUnauthenticated(logout)
    return () => setOnUnauthenticated(null)
  }, [logout])

  // Restore session on app load. A 401/404 here means "no active session" —
  // that is a normal startup state, not an error, so it is handled locally
  // and NOT routed through triggerUnauthenticated (which is reserved for
  // mid-session expiry on normal API calls).
  useEffect(() => {
    getMe()
      .then(({ user: restoredUser, csrfToken }) => {
        setUser(restoredUser)
        setCsrfToken(csrfToken)
        setStatus('authenticated')
      })
      .catch(() => {
        setStatus('unauthenticated')
      })
  }, [])

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    const { user: loggedInUser, csrfToken } = await apiLogin(credentials)
    setUser(loggedInUser)
    setCsrfToken(csrfToken)
    setStatus('authenticated')
  }, [])

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>{children}</AuthContext.Provider>
  )
}
