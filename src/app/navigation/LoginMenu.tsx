import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@lib/auth'

import * as S from './LoginMenu.styled'

// Mock account options — each maps to an email that the mock api/auth resolves to a user.
const MOCK_ACCOUNTS = [
  { label: 'Admin Account', email: 'admin@jalgrattur.ee', role: 'admin' },
  { label: 'Editor Account', email: 'editor@jalgrattur.ee', role: 'editor' },
] as const

export function LoginMenu() {
  const { user, status, login, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Don't render anything during the initial session-restore to prevent a
  if (status === 'loading') return null

  if (status === 'authenticated' && user) {
    const initials = `${user.firstName[0]}${user.lastName[0]}`
    return (
      <S.UserInfo>
        <S.Avatar title={`${user.firstName} ${user.lastName}`}>{initials}</S.Avatar>
        <S.RoleBadge $role={user.role}>{user.role}</S.RoleBadge>
        <S.SignOutButton onClick={() => void logout()}>Sign out</S.SignOutButton>
      </S.UserInfo>
    )
  }

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Trigger onClick={() => setIsOpen((o) => !o)}>
        Sign in
        <S.Chevron $open={isOpen}>▾</S.Chevron>
      </S.Trigger>

      {isOpen && (
        <S.Dropdown>
          <S.DropdownLabel>Choose a mock account</S.DropdownLabel>
          {MOCK_ACCOUNTS.map((account) => (
            <S.DropdownItem
              key={account.email}
              onClick={() => {
                setIsOpen(false)
                void login({ email: account.email, password: '' })
              }}
            >
              {account.label}
              <S.RoleBadge $role={account.role}>{account.role}</S.RoleBadge>
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      )}
    </S.Wrapper>
  )
}
