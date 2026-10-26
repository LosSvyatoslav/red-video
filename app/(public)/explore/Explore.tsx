'use client'

import { useQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { useAuth } from '@/hooks/useAuth'

import { videoService } from '@/services/video.service'

export function Explore() {
	const { user } = useAuth()
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos(user?.id)
	})
	const exploreVideos = data?.data.videos
	return (
		<section>
			<Heading Icon={Compass}>Explore</Heading>
			<div className='grid-6-cols'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : exploreVideos?.length ? (
					exploreVideos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>Explore are temporarily unavailable</div>
				)}
			</div>
		</section>
	)
}
