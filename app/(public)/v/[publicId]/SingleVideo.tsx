'use client'

import cn from 'clsx'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-palyer/VideoPlayer'

import type { ISingleVideoResponse } from '@/types/video.types'

import { SimilarVideos } from './SimilarVideos'
import { Comments } from './comments/Comments'
import { VideoDescription } from './description/VideoDescription'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'
import { useUpdateViews } from './video-channel/useUpdateViews'

interface Props {
	video: ISingleVideoResponse
}

export function SingleVideo({ video }: Props) {
	const [isTheaterMode, setIsTheaterMode] = useState(false)
	useUpdateViews({ video })
	return (
		<section className='grid grid-cols-[3fr_.8fr] gap-20'>
			<div>
				<div className={cn(isTheaterMode ? 'absolute top-0 left-0 w-full' : 'relative')}>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
						maxResolution={video.maxResolution}
					/>
				</div>
				<div
					className={cn('flex justify-between items-start pb-6 border-b border-border mb-6', {
						'pt-222': isTheaterMode
					})}
				>
					<div>
						<Heading
							className='mb-1'
							isH1
							classNameHeading='text-xl'
						>
							{video.title}
						</Heading>
						<div>{video.viewsCount.toLocaleString('ru-RU')} views</div>
					</div>
					<VideoActions video={video} />
				</div>
				<VideoChannel video={video} />
				<VideoDescription description={video.description} />
				<Comments video={video} />
			</div>
			{!!video.similarVideos.length && (
				<div className={cn({ 'pt-222': isTheaterMode })}>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	)
}
