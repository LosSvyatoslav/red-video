import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { TextArea } from '@/ui/field/TextArea'
import { UploadField } from '@/ui/upload-field/uploadField'

import { STUDIO_PAGE } from '@/config/studio-page'

import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

import { UploadSkeleton } from './UploadSkeleton'
import { VideoForm } from './VideoForm'
import { TagsField } from './tags-field/TagsField'

interface Props {
	form: UseFormReturn<IVideoFormData>
	isReadyToPublish: boolean
}

export function CreateVideoForm({ form, isReadyToPublish }: Props) {
	const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: async () => {
			const { toast } = await import('react-hot-toast')
			form.reset()
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Video creating  has error!')
		}
	})
	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}
	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<VideoForm form={form} />
			<div className='text-right mt-4'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish' : 'Wait processing'}
				</Button>
			</div>
		</form>
	)
}
