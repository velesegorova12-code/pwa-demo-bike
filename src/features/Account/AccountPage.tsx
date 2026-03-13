import { PERMISSIONS, useAbac } from '@lib/abac'
import { useAuth } from '@lib/auth'
import { useAppTranslation } from '@lib/i18n'

import * as S from './Account.styled'
import { AccountForm } from './components/AccountForm'
import { useAccount } from './hooks/useAccount'

export function AccountPage() {
  const { t } = useAppTranslation()
  const { data, isLoading, isUpdating, update } = useAccount()
  const { user, status } = useAuth()
  const { can } = useAbac()

  // Just implementation example here.
  const isAdmin = can(PERMISSIONS.ACCOUNT_MANAGE)

  return (
    <>
      <S.Heading>
        <S.Title>{t('Account')}</S.Title>
        <S.Subtitle>
          {user
            ? t('Signed in as {{name}} ({{role}})', {
                name: `${user.firstName} ${user.lastName}`,
                role: user.role,
              })
            : t('Manage your profile and preferences.')}
        </S.Subtitle>
      </S.Heading>

      {/* Role-based section — three distinct states, never shown during the loading flash */}
      {status === 'authenticated' &&
        (isAdmin ? (
          <S.AdminBanner>
            <S.AdminBannerIcon>🔑</S.AdminBannerIcon>
            <S.AdminBannerBody>
              <S.AdminBannerTitle>{t('Admin access')}</S.AdminBannerTitle>
              <S.AdminBannerText>
                {t(
                  'You have manage:account permission. In a real app this section would surface user management, audit logs, and other admin tools.',
                )}
              </S.AdminBannerText>
            </S.AdminBannerBody>
          </S.AdminBanner>
        ) : (
          <S.GuestNotice>
            {t(
              'You are signed in as an editor. Admin tools are not visible to this role — sign in as Admin to see the difference.',
            )}
          </S.GuestNotice>
        ))}

      {status === 'unauthenticated' && (
        <S.GuestNotice>{t('Sign in to see role-based content on this page.')}</S.GuestNotice>
      )}

      <AccountForm
        account={data ?? null}
        isLoading={isLoading}
        isUpdating={isUpdating}
        onUpdate={update}
      />
    </>
  )
}
