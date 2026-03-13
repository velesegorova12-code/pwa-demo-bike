// MOCK IMPLEMENTATION — all functions return resolved promises with hardcoded
// data. Replace the function bodies with real apiClient calls when the backend
// is ready; the signatures and return types stay the same.

import type { AuthUser } from '@models/auth'

import type { AuthResponse, LoginCredentials } from './apiModels'

// Two mock accounts to demonstrate role-based UI differences.
const MOCK_ACCOUNTS: Record<string, AuthUser> = {
  'admin@jalgrattur.ee': {
    id: 'usr_admin_001',
    email: 'admin@jalgrattur.ee',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    // manage:* implies all actions on all resources — admin sees everything
    permissions: ['manage:*'],
  },
  'editor@jalgrattur.ee': {
    id: 'usr_editor_001',
    email: 'editor@jalgrattur.ee',
    firstName: 'Editor',
    lastName: 'User',
    role: 'editor',
    // Explicit permissions — server owns this list; role is for display only
    permissions: ['read:account', 'update:account'],
  },
}

// A fixed token is fine for a mock — in production the server generates a new
// token per session and returns it in both login and getMe responses.
const MOCK_CSRF_TOKEN = 'mock-csrf-token-abc123'

// Simulates the initial session restore call made on app load.
// In production: GET /auth/me → active session user + fresh csrfToken, or 401.
// Mock rejects to simulate no active session, so the user must sign in manually —
// swap to a resolved value to simulate a pre-existing session cookie.
export async function getMe(): Promise<AuthResponse> {
  return Promise.reject(new Error('No active session (mock)'))
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const user = MOCK_ACCOUNTS[credentials.email]
  if (!user) {
    return Promise.reject(new Error('Unknown mock account'))
  }
  return Promise.resolve({ user, csrfToken: MOCK_CSRF_TOKEN })
}

// Server-side logout invalidates the session cookie.
// The caller (AuthProvider) clears local state in a finally block regardless
// of whether this call succeeds.
export async function logout(): Promise<void> {
  return Promise.resolve()
}
