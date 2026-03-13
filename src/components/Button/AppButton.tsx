import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { StyledButton, type StyledButtonVariant } from './Button.styled'

type Props = PropsWithChildren<
  {
    variant?: StyledButtonVariant
  } & ButtonHTMLAttributes<HTMLButtonElement>
>

export function AppButton({ children, variant = 'primary', ...rest }: Props) {
  return (
    <StyledButton type="button" $variant={variant} {...rest}>
      {children}
    </StyledButton>
  )
}

