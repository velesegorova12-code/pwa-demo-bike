import { AppButton } from '@components/Button'
import { AppCard } from '@components/Card'
import { AppInput } from '@components/Form/Input'
import { useAppTranslation } from '@lib/i18n'
import type { Account } from '@models/account'

import * as S from './AccountForm.styled'

type Props = {
  account: Account | null
  isLoading?: boolean
  isUpdating?: boolean
  onUpdate?: (data: Partial<Account>) => void
}

export function AccountForm({ account, isLoading, isUpdating, onUpdate }: Props) {
  const { t } = useAppTranslation()

  if (isLoading) return <p>{t('Loading…')}</p>

  return (
    <S.Stack>
      <AppCard title={<S.CardTitle>{t('Personal information')}</S.CardTitle>}>
        <S.FormStack>
          <S.FormRow>
            <AppInput placeholder={t('First name')} defaultValue={account?.firstName ?? ''} />
            <AppInput placeholder={t('Last name')} defaultValue={account?.lastName ?? ''} />
          </S.FormRow>
          <AppInput placeholder={t('Email')} type="email" defaultValue={account?.email ?? ''} />
          <AppInput placeholder={t('Phone')} type="tel" defaultValue={account?.phone ?? ''} />
          <S.Footer>
            <AppButton
              variant="primary"
              disabled={isUpdating}
              onClick={() => onUpdate?.({ firstName: account?.firstName })}
            >
              {isUpdating ? t('Saving…') : t('Save changes')}
            </AppButton>
          </S.Footer>
        </S.FormStack>
      </AppCard>

      <AppCard title={<S.CardTitle>{t('Password')}</S.CardTitle>}>
        <S.FormStack>
          <AppInput placeholder={t('Current password')} type="password" />
          <AppInput placeholder={t('New password')} type="password" />
          <AppInput placeholder={t('Confirm new password')} type="password" />
          <S.Footer>
            <AppButton variant="primary">{t('Update password')}</AppButton>
          </S.Footer>
        </S.FormStack>
      </AppCard>

      <AppCard title={<S.CardTitle>{t('Danger zone')}</S.CardTitle>}>
        <S.Description>{t('Permanently delete your account and all associated data.')}</S.Description>
        <S.Footer>
          <AppButton variant="ghost">{t('Delete account')}</AppButton>
        </S.Footer>
      </AppCard>
    </S.Stack>
  )
}
