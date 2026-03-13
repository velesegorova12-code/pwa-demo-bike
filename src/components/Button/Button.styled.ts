import styled from 'styled-components'

type Variant = 'primary' | 'ghost'

export const StyledButton = styled.button<{ $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'ghost' ? theme.colors.border : theme.colors.primary};
  background: ${({ theme, $variant }) =>
    $variant === 'ghost' ? 'transparent' : theme.colors.primary};
  color: ${({ theme, $variant }) =>
    $variant === 'ghost' ? theme.colors.text : '#ffffff'};
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
  box-shadow: ${({ theme, $variant }) =>
    $variant === 'ghost' ? 'none' : theme.shadow.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export type StyledButtonVariant = Variant

