// Actions a user can perform on a resource.
// "manage" is a superpower that implies all other actions on the same resource.
export type Action = 'read' | 'create' | 'update' | 'delete' | 'manage'

// Domain resources protected by attribute based access control (ABAC).
// "*" is the wildcard used with "manage" to grant full access.
export type Resource = 'account' | '*'

export type Permission = `${Action}:${Resource}`

// Authorization checks must use permissions, never role directly.
export type Role = 'admin' | 'editor' | 'viewer'

export type AuthUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: Role
  permissions: Permission[]
}

// Third argument to can() — reserved for future instance-level ABAC checks
// (e.g. ownerId, tenantId, status). Not enforced yet; shape is intentionally
// open so callers can start passing context without a breaking API change.
export type AbacContext = Record<string, unknown>

export type LoginCredentials = {
  email: string
  password: string
}
