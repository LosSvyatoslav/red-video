import { useQuery } from '@tanstack/react-query'

import { userServsice } from '@/services/user.service'

export function useProfile() {
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userServsice.getProfile(),

		refetchInterval: 1800000
	})
	return {
		profile: data?.data,
		isLoading,
		isSuccess,
		refetch
	}
}
