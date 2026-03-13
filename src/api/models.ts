export type ApiItemResponse<T> = {
  code: string
  data: T
}

export type ApiListResponse<T> = {
  code: string
  data: T[]
}

export type ApiError = {
  message: string
  code?: string
  errors?: Record<string, string[]>
}
