import styled from 'styled-components'

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`

export const StyledInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

