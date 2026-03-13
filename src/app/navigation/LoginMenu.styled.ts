import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 120ms ease, background 120ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryMuted};
  }
`

export const Chevron = styled.span<{ $open: boolean }>`
  display: inline-block;
  transition: transform 150ms ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 0.65rem;
  opacity: 0.6;
`

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing(1)});
  right: 0;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
  z-index: 100;
`

export const DropdownLabel = styled.div`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: background 100ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`

export const RoleBadge = styled.span<{ $role: string }>`
  margin-left: auto;
  padding: ${({ theme }) => `1px ${theme.spacing(2)}`};
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: ${({ theme, $role }) =>
    $role === 'admin' ? theme.colors.primary : theme.colors.primaryMuted};
  color: ${({ theme, $role }) =>
    $role === 'admin' ? '#fff' : theme.colors.primary};
`

// Shown when already signed in: avatar initials + name + role
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const Avatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
`

export const SignOutButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 120ms ease, color 120ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.danger};
  }
`
