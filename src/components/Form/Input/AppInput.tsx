import { forwardRef, type InputHTMLAttributes } from 'react'

import { InputWrapper, StyledInput } from './Input.styled'

type Props = InputHTMLAttributes<HTMLInputElement>

export const AppInput = forwardRef<HTMLInputElement, Props>(function AppInput(
  props,
  ref,
) {
  return (
    <InputWrapper>
      <StyledInput ref={ref} {...props} />
    </InputWrapper>
  )
})

