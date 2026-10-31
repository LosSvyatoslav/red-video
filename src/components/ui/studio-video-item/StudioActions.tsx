'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast, { type Toast } from 'react-hot-toast'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page'

import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
}

export function StudioActions({ video }: Props) {
	const queryClient = useQueryClient()
	const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete video'],
		mutationFn: () => studioVideoService.delete(video.id),

		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: ['studioVideoList']
			})
			const previousVideos = queryClient.getQueriesData({
				queryKey: ['studioVideoList']
			})
			queryClient.setQueriesData(
				{
					queryKey: ['studioVideoList']
				},
				(oldData: any) => {
					if (!oldData) return oldData
					if (Array.isArray(oldData)) {
						return oldData.filter(item => item.id !== video.id)
					}
					return oldData
				}
			)
			return { previousVideos }
		},

		onSuccess: () => {
			toast.success('Successfully deleted!')
		},
		onError: (_error, _variables, context) => {
			context?.previousVideos.forEach(([queryKey, data]) => {
				queryClient.setQueryData(queryKey, data)
			})

			toast.error('Failed to delete video')
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
		}
	})

	const handleDelete = () => {
		toast((t: Toast) => (
			<div className='bg-gray-'>
				<p>Are you sure you want to delete this video?</p>
				<div className='flex justify-end gap-4 mt-2'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-red-600'
					>
						Delete
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-400'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}

	return (
		<div className='flex items-start gap-5 justify-center'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='transition-opacity text-blue-600 opacity-70 hover:opacity-100'
				target='_blank'
				title='Open in the new tab'
			>
				<ExternalLink size={22} />
			</Link>
			<Link
				href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				className='transition-opacity text-orange-500 opacity-70 hover:opacity-100'
				title='Edit a video'
			>
				<Edit size={22} />
			</Link>
			<button
				onClick={handleDelete}
				className='transition-opacity text-red-600 opacity-70 hover:opacity-100'
				title='Delete a video'
				disabled={isDeletePending}
			>
				<Trash2 size={22} />
			</button>
		</div>
	)
}
