import styled from 'styled-components'

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  max-width: 560px;
`

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`

export const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`
