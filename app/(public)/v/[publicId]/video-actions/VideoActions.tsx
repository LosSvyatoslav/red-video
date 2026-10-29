'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart, ListVideo } from 'lucide-react'
import { startTransition, useOptimistic, useState } from 'react'

import { COLORS } from '@/constants/colors.constants'

import { useProfile } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { userServsice } from '@/services/studio/user.service'
import type { ISingleVideoResponse } from '@/types/video.types'
import { useUserPlaylists } from '../../../../(user)/playlists/useUserPlaylists'
import { playlistService } from '@/services/playlist.service copy'
import type { IPlaylistData } from '@/types/playlist.types'
import toast from 'react-hot-toast'
import { SaveToPlaylist } from './SaveToPlaylist'

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	const { profile, refetch } = useProfile()
	const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

	const isLiked = profile?.likes.some(like => like.videoId === video.id) ?? false

	const [isLikedLocal, setIsLikedLocal] = useOptimistic(isLiked)

	const handleLike = () => {
		startTransition(async () => {
			const newIsLiked = !isLikedLocal

			setIsLikedLocal(newIsLiked)
			setOptimisticLike(prev => (newIsLiked ? prev + 1 : prev - 1))

			try {
				await userServsice.toggleLike(video.id)
				await refetch()
			} catch {
				setOptimisticLike(prev => (newIsLiked ? prev - 1 : prev + 1))
			}
		})
	}

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userServsice.toggleLike(video.id),
		onMutate() {
			startTransition(() => {
				const newIsLiked = !isLikedLocal
				setIsLikedLocal(newIsLiked)
				setOptimisticLike(prev => (newIsLiked ? prev + 1 : prev - 1))
			})
		},
		onError() {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocal
				setIsLikedLocal(revertedIsLiked)
				setOptimisticLike(prev => (revertedIsLiked ? prev - 1 : prev + 1))
			})
		},
		onSuccess() {
			refetch()
		}
	})



	return (
		<div className='flex items-baseline gap-7 relative z-1'>
<SaveToPlaylist video={video}/>
			<button
				className='text-primary flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100 cursor-pointer'
				onClick={handleLike}
			>
				<Heart
					size={20}
					fill={isLikedLocal ? COLORS.primary : 'transparent'}
				/>
				{transformCount(optimisticLike)}
			</button>
		</div>
	)
}
