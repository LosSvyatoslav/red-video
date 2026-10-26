import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { PAGE } from '@/config/public-page.config'

import { videoService } from '@/services/video.service'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Trending',
	description: 'Best videos in trends',
	alternates: { canonical: PAGE.TRENDING },
	openGraph: {
		type: 'website',
		url: PAGE.TRENDING,
		title: 'Trending'
	}
}

export default async function TrendingPage() {
	const videos = await videoService.getTrendingVideos()
	const trendingVideos = videos?.data
	return (
		<section>
			<Heading Icon={Flame}>Trending</Heading>
			<div className='grid-6-cols'>
				{!!trendingVideos?.length ? (
					trendingVideos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))
				) : (
					<div>Trends are temporarily unavailable</div>
				)}
			</div>
		</section>
	)
}
