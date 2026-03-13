import type { PropsWithChildren, ReactNode } from 'react'

import { CardHeading, CardShell } from './Card.styled'

type Props = PropsWithChildren<{
  title?: ReactNode
  actions?: ReactNode
}>

export function AppCard({ title, actions, children }: Props) {
  return (
    <CardShell>
      {(title || actions) && (
        <CardHeading>
          <div>{title}</div>
          {actions}
        </CardHeading>
      )}
      {children}
    </CardShell>
  )
}

