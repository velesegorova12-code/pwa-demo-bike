import type { AuthUser, LoginCredentials } from '@models/auth'

export type { LoginCredentials }

export type AuthResponse = {
  user: AuthUser
  csrfToken: string
}
