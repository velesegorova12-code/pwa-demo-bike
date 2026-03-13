import { createContext, useContext } from 'react'

import type { AuthUser, LoginCredentials } from '@models/auth'

// ─── CSRF token store ─────────────────────────────────────────────────────────
// Kept in module memory — not localStorage/sessionStorage — so it is
// inaccessible to injected scripts while still readable from both React and
// the Axios interceptor without any React dependency.
let _csrfToken: string | null = null

export const getCsrfToken = (): string | null => _csrfToken
export const setCsrfToken = (token: string): void => {
  _csrfToken = token
}
export const clearCsrfToken = (): void => {
  _csrfToken = null
}

// ─── Auth event bridge ────────────────────────────────────────────────────────
// Keeps Axios interceptors decoupled from React. AuthProvider registers its
// logout function here on mount and unregisters on unmount. The interceptor
// calls triggerUnauthenticated() without knowing anything about React.
let _onUnauthenticated: (() => void) | null = null

export const setOnUnauthenticated = (cb: (() => void) | null): void => {
  _onUnauthenticated = cb
}
export const triggerUnauthenticated = (): void => {
  _onUnauthenticated?.()
}

// ─── Auth context ─────────────────────────────────────────────────────────────

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type AuthContextValue = {
  user: AuthUser | null
  // Always check status, not just user — during boot both can be null/loading.
  // Route guards and conditional UI must wait for status !== 'loading'.
  status: AuthStatus
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

// Context lives in lib/ so both app/providers (to provide) and features (to consume) can import it.
// Features import using useAuth hook, that requires AuthContext.
export const AuthContext = createContext<AuthContextValue | null>(null)

// Primary hook for auth state — the only thing features should import for auth.
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
