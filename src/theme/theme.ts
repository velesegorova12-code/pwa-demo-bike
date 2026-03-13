import { colors } from './colors'
import { fonts } from './fonts'

export const theme = {
  colors,
  fonts,
  spacing: (factor = 1) => `${4 * factor}px`,
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
  shadow: {
    sm: '0 1px 3px rgba(15, 23, 42, 0.08)',
    md: '0 4px 12px rgba(15, 23, 42, 0.12)',
  },
} as const

export type AppTheme = typeof theme

