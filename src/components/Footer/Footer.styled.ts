import styled from 'styled-components'

export const Shell = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

export const Inner = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

