

import { useQuery } from '@tanstack/react-query'
import { Heart, ListVideo } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { playlistService } from '@/services/playlist.service copy'

export function SinglePlaylist({ id }: { id: string }) {
	const { data, isLoading } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistsById(id as string),
		enabled: !!id
	})

	return (
		<section>
			<Heading
				isPageHeading
				Icon={ListVideo}
			>
				{data?.data.title}
			</Heading>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : data?.data.videos.length ? (
					data?.data.videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos in playlist not found!</p>
				)}
			</div>
		</section>
	)
}
