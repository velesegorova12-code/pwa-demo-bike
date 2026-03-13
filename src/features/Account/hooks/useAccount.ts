import { useAccountQuery, useUpdateAccountMutation } from '@data/account'

export function useAccount() {
  const query = useAccountQuery()
  const mutation = useUpdateAccountMutation()

  return {
    ...query,
    update: mutation.mutate,
    isUpdating: mutation.isPending,
  }
}
