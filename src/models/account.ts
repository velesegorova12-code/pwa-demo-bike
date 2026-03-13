import type { BaseEntity } from './base'

export type Account = BaseEntity & {
  firstName: string
  lastName: string
  email: string
  phone?: string
}
