import { isPending } from '@reduxjs/toolkit'
import { useMutation } from '@tanstack/react-query'
import type { errors } from 'jose'
import type { register } from 'module'
import Image from 'next/image'
import type { ChangeEventHandler, FormEventHandler } from 'react'
import {
	Controller,
	type SubmitHandler,
	type UseFormHandleSubmit,
	type UseFormReturn
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { TextArea } from '@/ui/field/TextArea'
import { UploadField } from '@/ui/upload-field/uploadField'

import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

import { UploadSkeleton } from './UploadSkeleton'
import { TagsField } from './tags-field/TagsField'
import { useRouter } from 'next/navigation'
import { STUDIO_PAGE } from '@/config/studio-page'

interface Props {
	form: UseFormReturn<IVideoFormData>
	isReadyToPublish: boolean
}

export function VideoForm({
	form: {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		watch
	},
	isReadyToPublish
}: Props) {
    const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: () => {
			reset()
			toast.success('Video successfully published!')
            router.push(STUDIO_PAGE.HOME)
		},
		onError() {
			toast.error('Video creating  has error!')
		}
	})
	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-[2.5fr_1fr] gap-10'>
				{isPending ? (
					<UploadSkeleton />
				) : (
					<>
						<div>
							<Field
								label='Title'
								error={errors.title?.message}
								type='text'
								registration={register('title', { required: 'Title required!' })}
								placeholder='Enter title'
							/>
							<TextArea
								label='Description'
								error={errors.description?.message}
								registration={register('description', {
									required: 'Description is required!'
								})}
								placeholder='Enter description:'
								rows={7}
							/>
							<Controller
								control={control}
								name='thumbnailUrl'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<UploadField
										label='Thumbnail'
										onChange={onChange}
										value={value}
										error={error}
										folder='thumbnails'
										className='mb-5'
										sizePreview={[151, 82]}
									/>
								)}
							/>
							<Controller
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										onTagsChange={onChange}
										initialTags={value}
										error={error?.message}
										label='Tags:'
									/>
								)}
							/>
						</div>
						<div>
							<div className='bg-gray-700 rounded-md overflow-hidden'>
								{watch('thumbnailUrl') ? (
									<Image
										alt='Upload thumbnail'
										src={watch('thumbnailUrl')}
										width={249}
										height={140}
										loading='eager'
									/>
								) : (
									<div className='bg-gray-900 w-[249] h-[140] font-medium text-sm flex items-center justify-center'>
										Wait thumbnail...
									</div>
								)}
								<div className='text-sm p-2'>
									<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name:</span>
									<span>{watch('videoFileName')}</span>
								</div>
							</div>
						</div>
					</>
				)}{' '}
			</div>
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
