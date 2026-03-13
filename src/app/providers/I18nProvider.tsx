import { Suspense, type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import { i18n } from '@lib/i18n'

type Props = {
  children: ReactNode
}

export function I18nProvider({ children }: Props) {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={null}>{children}</Suspense>
    </I18nextProvider>
  )
}

