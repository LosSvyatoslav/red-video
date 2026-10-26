import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { videoService } from '@/services/video.service'

import { Explore } from './explore/Explore'

export const revalidate = 100


export const metadata: Metadata = {
	title: 'RED Video',
	description: 'Best video platform',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'RED video'
	}
}

export default async function Home() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data?.data
	return (
		<section>
			{!!trendingVideos.length && (
				<section className='mb-10'>
					<Heading Icon={Flame}>Trending</Heading>
					<div className='grid-6-cols'>
						{trendingVideos.map(video => (
							<VideoItem
								key={video.id}
								video={video}
								Icon={Flame}
							/>
						))}
					</div>
				</section>
			)}
			<Explore />
		</section>
	)
}


