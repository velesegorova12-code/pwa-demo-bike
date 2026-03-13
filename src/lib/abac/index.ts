import { useAuth } from '@lib/auth'
import type { AbacContext, Action, AuthUser, Permission, Resource } from '@models/auth'

// ─── Implication rules ────────────────────────────────────────────────────────
// All permission implication rules live here — the single source of truth.
// Adding a new rule means editing only this function.
function isGranted(granted: Set<Permission>, action: Action, resource: Resource): boolean {
  // Exact permission always wins
  if (granted.has(`${action}:${resource}`)) return true
  // manage:* grants everything across all resources
  if (granted.has('manage:*')) return true
  // manage:<resource> grants all actions on that specific resource
  if (granted.has(`manage:${resource}` as Permission)) return true
  // read:* grants read access on any resource without granting mutations
  if (action === 'read' && granted.has('read:*')) return true
  return false
}

// ─── Pure check ───────────────────────────────────────────────────────────────
// Safe to call outside React (e.g. in route loaders, utility functions).
// `_context` is RESERVED — not enforced yet. Future: instance-level checks
// such as ownerId or tenantId matching. Accepting it now avoids a breaking API change later.
export function can(
  user: AuthUser | null,
  permission: Permission,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context?: AbacContext,
): boolean {
  if (!user) return false
  const [action, resource] = permission.split(':') as [Action, Resource]
  return isGranted(new Set(user.permissions), action, resource)
}

// ─── React hook ───────────────────────────────────────────────────────────────
// Convenience wrapper that binds can() to the current user so features do not
// have to thread user through every call site.
// Note: can() is UI gating only — the backend must enforce all permissions independently.
export function useAbac() {
  const { user } = useAuth()
  return {
    can: (permission: Permission, context?: AbacContext) => can(user, permission, context),
  }
}

// ─── Permission constants ─────────────────────────────────────────────────────
// Use these in feature code instead of raw strings for autocomplete and
// refactor safety. A permission rename becomes a single-file change here.
export const PERMISSIONS = {
  ACCOUNT_READ: 'read:account',
  ACCOUNT_UPDATE: 'update:account',
  ACCOUNT_MANAGE: 'manage:account',
} as const satisfies Record<string, Permission>
