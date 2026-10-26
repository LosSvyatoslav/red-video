import { Flame, Gamepad2 } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/Videoitem'

import { PAGE } from '@/config/public-page.config'

import { videoService } from '@/services/video.service'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Video games',
	description: 'Best game`s videos',
	alternates: { canonical: PAGE.VIDEO_GAMES },
	openGraph: {
		type: 'website',
		url: PAGE.VIDEO_GAMES,
		title: 'Video games'
	}
}

export default async function VideoGamesPage() {
	const videos = await videoService.getVideoGames()
	const trendingVideos = videos?.data.videos
	return (
		<section>
			<Heading Icon={Gamepad2}>Video games</Heading>
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
					<div>Video games are temporarily unavailable</div>
				)}
			</div>
		</section>
	)
}
