import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { getCsrfToken, triggerUnauthenticated } from '@lib/auth'
import { i18n } from '@lib/i18n'

// Extend Axios config to carry a retry flag — prevents the 401 handler from
// triggering logout in an infinite loop if the logout/refresh call itself returns 401.
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

const MUTATING_METHODS = new Set(['post', 'put', 'patch', 'delete'])

export const attachInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const language = i18n.language || 'en'
    config.headers.set('Accept-Language', language)

    // Attach CSRF token to state-changing requests only — GET/HEAD are safe methods
    // and do not need CSRF protection. Token lives in memory, not in a cookie,
    // so the browser cannot send it automatically (that is the whole point).
    const csrfToken = getCsrfToken()
    if (csrfToken && MUTATING_METHODS.has(config.method?.toLowerCase() ?? '')) {
      config.headers.set('X-CSRF-Token', csrfToken)
    }

    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      console.error('API error', error.message)

      const config = error.config

      // On 401, notify the auth layer to sign the user out — but only once per
      // request (_retry guard) to avoid logout storms if the auth endpoint
      // itself returns 401. The bridge calls AuthProvider.logout() without
      // the interceptor needing any direct reference to React.
      if (
        error.response?.status === 401 &&
        config &&
        !config._retry
      ) {
        config._retry = true
        triggerUnauthenticated()
      }

      return Promise.reject(error)
    },
  )
}
