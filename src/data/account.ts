import { fetchUser, updateUser } from '@api/user'
import { useMutation, useQuery, useQueryClient } from '@lib/query'

export const accountKeys = {
  me: ['account', 'me'] as const,
}

export function useAccountQuery() {
  return useQuery({
    queryKey: accountKeys.me,
    queryFn: fetchUser,
  })
}

export function useUpdateAccountMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.me })
    },
  })
}
