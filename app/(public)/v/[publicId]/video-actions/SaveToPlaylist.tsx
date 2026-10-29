import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, m } from 'framer-motion'
import { Check, ListVideo } from 'lucide-react'
import toast from 'react-hot-toast'

import { useOutside } from '@/hooks/useOutside'

import { playlistService } from '@/services/playlist.service copy'
import type { ISingleVideoResponse } from '@/types/video.types'

import { useUserPlaylists } from '../../../../(user)/playlists/useUserPlaylists'

interface Props {
	video: ISingleVideoResponse
}

export function SaveToPlaylist({ video }: Props) {
	const { data, refetch: refetchPlaylists } = useUserPlaylists()

	const isInPlaylist = data?.data.some(playlist => playlist.videos.some(v => v.id === video.id))

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
		onSuccess: () => {
            setIsShow(false)
			refetchPlaylists()
			isInPlaylist
				? toast.success('Successfully removed!', {
						id: 'playlist'
					})
				: toast.success('Successfully added!', {
						id: 'playlist'
					})
		}
	})
	const { isShow, ref, setIsShow } = useOutside<HTMLDivElement>(false)

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				className='flex items-c`enter gap-1  transition-opacity opacity-80 hover:opacity-100 cursor-pointer'
				onClick={() => setIsShow(!isShow)}
			>
				<ListVideo size={20} />
				Save
			</button>
			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-gray-800 py-3 px-3 rounded absolute bottom-8
				 right-0 shadow w-max max-w-34'
					>
						{data?.data.map(playlist => (
							<li
								key={playlist.id}
								className='mb-1'
							>
								<button
									onClick={() => {
										togglePlaylist(playlist.id)
									}}
									className='transition-colors border-b border-b-transparent hover:text-primary flex items-center gap-1 '
									disabled={isPending}
								>
									{playlist.videos.some(v => v.id === video.id) && <Check size={16} />}{' '}
									{playlist.title}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
