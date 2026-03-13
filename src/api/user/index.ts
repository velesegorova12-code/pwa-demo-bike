import { apiClient } from '@api/client'

import type { UpdateUserPayload, UserResponse } from './apiModels'

export async function fetchUser() {
  const response = await apiClient.get<UserResponse>('/user/me')
  return response.data?.data ?? null
}

export async function updateUser(payload: UpdateUserPayload) {
  const response = await apiClient.patch<UserResponse>('/user/me', payload)
  return response.data?.data ?? null
}
