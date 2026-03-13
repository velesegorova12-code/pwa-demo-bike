import styled from 'styled-components'

import { Link } from '@lib/router'

export const Bar = styled.header`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

export const Inner = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const Brand = styled(Link)`
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

