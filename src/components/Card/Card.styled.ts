import styled from 'styled-components'

export const CardShell = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const CardHeading = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
`

