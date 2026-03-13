import type { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { GlobalStyles } from '@theme/global-styles'
import { theme } from '@theme/theme'

type Props = {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  )
}

