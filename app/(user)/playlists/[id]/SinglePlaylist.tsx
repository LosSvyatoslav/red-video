'use client'

import { Heart, ListVideo } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { playlistService } from '@/services/playlist.service copy'

export function SinglePlaylist() {
    const {id} = useParams()
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
					<p>Playlist not found!</p>
				)}
			</div>
		</section>
	)
}
