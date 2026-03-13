import { AppButton } from '@components/Button'
import { useNavigate } from '@lib/router'

import { LoginMenu } from './LoginMenu'

export function AppHeaderActions() {
  const navigate = useNavigate()

  return (
    <>
      <AppButton variant="ghost" onClick={() => navigate('/account')}>
        Account
      </AppButton>
      {/* This is a temporary mock login menu - replace and move components to correct place when designing the actual header*/}
      <LoginMenu />
    </>
  )
}
