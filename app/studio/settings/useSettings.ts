import { useMutation } from '@tanstack/react-query'
import { useEffect, useTransition } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useProfile } from '@/hooks/useProfile'

import { userServsice } from '@/services/studio/user.service'

import type { ISettingsData } from './settings.types'

export function useSettings() {
	const form = useForm<ISettingsData>({ mode: 'onChange' })

	const { profile, isSuccess, isLoading, refetch } = useProfile()

	useEffect(() => {
		if (!isSuccess) return
		const channel = profile?.channel
			? {
					avatarUrl: profile?.channel?.avatarUrl,
					bannerUrl: profile?.channel?.bannerUrl,
					description: profile?.channel?.description,
					slug: profile?.channel?.slug
				}
			: {}
		form.reset({ channel, email: profile?.email, name: profile?.name })
	}, [isSuccess, profile, form])

	const [isPending] = useTransition()
	const { mutate, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: ISettingsData) => userServsice.updateProfile(data),
		onSuccess(){
			refetch()
		}
	})
	const onSubmit: SubmitHandler<ISettingsData> = data => {
		mutate(data)
	}

	return {
		onSubmit,
		form,
		isLoading: isPending,
		isProfileLoading: isLoading
	}
}
