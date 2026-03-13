import styled from 'styled-components'

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const Title = styled.h2`
  margin: 0;
`

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const AdminBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryMuted};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  max-width: 560px;
`

export const AdminBannerIcon = styled.span`
  font-size: 1.4rem;
  line-height: 1;
  flex-shrink: 0;
`

export const AdminBannerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const AdminBannerTitle = styled.strong`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const AdminBannerText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const GuestNotice = styled.p`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  max-width: 560px;
`
