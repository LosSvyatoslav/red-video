import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { RefObject } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'

import { playlistService } from '@/services/playlist.service copy'
import type { IPlaylistData } from '@/types/playlist.types'

interface Props {
	refetch: () => void
	onClose: () => void
	ref: RefObject<any | null>
}

export function CreatePlaylist({ refetch, onClose, ref }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IPlaylistData>({
		mode: 'onChange'
	})

	useHotkeys('esc', e => {
		e.preventDefault()
		onClose()
	})
	const onSubmit: SubmitHandler<IPlaylistData> = data => {
		mutate(data)
	}

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		onSuccess: async () => {
			const { toast } = await import('react-hot-toast')
			refetch()
			reset()
			onClose()
			toast.success('Playlist successfully created!')
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Playlist has error!')
		}
	})

	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				zIndex: 50
			}}
		>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				style={{
					position: 'relative',
					width: '26rem'
				}}
			>
				<div
					className='bg-gray-800 relative rounded-lg p-6'
					ref={ref}
				>
					<button
						onClick={onClose}
						className='absolute top-2 right-2 text-white'
						title='Close a modal'
					>
						<X />
					</button>
					<Heading classNameHeading='text-xl'>Create a playlist</Heading>
					<form onSubmit={handleSubmit(onSubmit)}>
						{isPending ? (
							<SkeletonLoader count={2} />
						) : (
							<>
								{' '}
								<Field
									label='Title'
									error={errors.title?.message}
									type='text'
									registration={register('title', { required: 'Title required!' })}
									placeholder='Enter title'
								/>
								<Field
									label='Video public id (from url'
									error={errors.videoPublicId?.message}
									type='text'
									registration={register('videoPublicId', {
										required: 'Video public id required!',
										minLength: {
											value: 10,
											message: 'Video public id must be exactly 10 characters'
										},
										maxLength: {
											value: 10,
											message: 'Video public id must be exactly 10 characters'
										}
									})}
									placeholder='Enter video public id'
								/>
							</>
						)}
						<div className='text-center mt-4'>
							<Button
								type='submit'
								isLoading={isPending}
							>
								Create
							</Button>
						</div>
					</form>
				</div>
			</m.div>
		</div>
	)
}
