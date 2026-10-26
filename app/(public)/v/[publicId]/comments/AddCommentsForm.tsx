import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { TextArea } from '@/ui/field/TextArea'

import { useAuth } from '@/hooks/useAuth'

import { commentService } from '@/services/comment.service copy'
import type { ICommentData } from '@/types/comment.types'

interface Props {
	refetch: () => void
	videoId: string
}

export function AddCommentsForm({ refetch, videoId }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ICommentData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch()
			reset()
		}
	})

	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({
			text,
			videoId
		})
	}

	const { isLoggedIn } = useAuth()

	if (!isLoggedIn) return null

	return (
		<div className='mb-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-[7fr_1fr] gap-14'
			>
				<TextArea
					registration={register('text', { required: true })}
					placeholder='Enter comment:'
					rows={1}
					wrapperClassName='m-0'
					error={errors.text?.message}
				/>
				<button
					className='bg-border rounded font-medium h-max py-2'
					disabled={isPending}
				>
					{isPending ? 'Commenting...' : 'Comment'}
				</button>
			</form>
		</div>
	)
}
