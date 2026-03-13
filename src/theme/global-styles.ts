import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-surface: ${({ theme }) => theme.colors.surface};
    --color-text: ${({ theme }) => theme.colors.text};
    
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-gutter: stable;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  #root {
    min-height: 100vh;
  }
`

