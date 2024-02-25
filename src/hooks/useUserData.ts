import { useQuery } from '@tanstack/react-query'

import { useUserContext } from '@/context/UserContext'
import { IUser } from '@/helpers/types'

export const useUserData = () => {
  const { fetchUser } = useUserContext()

  return useQuery<IUser, Error>({
    queryKey: ['my-account'],
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

// const {
//   data: userData,
//   isLoading: isUserLoading,
//   error: userError,
// } = useQuery({
//   queryKey: ['my-account'],
//   queryFn: fetchUser,
//   refetchOnWindowFocus: false,
//   retry: false,
//   staleTime: 60 * 60 * 1000, // 1 hour
// })
