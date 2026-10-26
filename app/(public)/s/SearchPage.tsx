'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { videoService } from '@/services/video.service'

export function SearchPage() {
	const searchParams = useSearchParams()
	
	const term = searchParams.get('term')?.trim() ?? ''
	const { data, isLoading } = useQuery({
		queryKey: ['search', term],
		queryFn: () => videoService.getAll(term)
	})
	const searchedVideos = data?.data.videos
	return (
		<section>
			<Heading
				isH1
				Icon={Search}
			>
				Search &quot;{searchParams.get('term')}&quot;
			</Heading>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : searchedVideos?.length ? (
					searchedVideos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos not found!</p>
				)}
			</div>
		</section>
	)
}
