import type { ApiItemResponse } from '@api/models'
import type { Account } from '@models/account'

export type UserResponse = ApiItemResponse<Account>

export type UpdateUserPayload = Partial<Omit<Account, 'id'>>
