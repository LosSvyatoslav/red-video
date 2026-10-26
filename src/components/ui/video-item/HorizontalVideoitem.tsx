import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'

import type { IVideo } from '@/types/video.types'

import { VideoChannelName } from './VideoChannelName'
import { VideoItemTitle } from './VideoItemTitle'

interface Props {
	video: IVideo
}

export function HorizontalVideoItem({ video }: Props) {
	return (
		<m.div
			whileHover={{ scale: 1.01, y: -5 }}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='flex items-stretch gap-4 mb-6'>
				<Link href={PAGE.VIDEO(video.publicId)} className='shrink-0'>
					<Image
						loading='eager'
						className='rounded-md'
						width={206}
						height={116}
						src={video.thumbnailUrl}
						alt={video.title}
						style={{ width: '100%', height: 'auto' }}
					/>
				</Link>
				<div className='flex flex-col justify-between'>
					<div>
						<div className='mb-1 text-lg'>
							<VideoItemTitle video={video} />
						</div>

						<div className='mb-1'>
							<VideoChannelName
								channel={video.channel}
								spanClassName='text-base mr-0.5'
							/>
						</div>
					</div>
					<div className='flex items-center gap-2 pb-1'>
						<span className='text-gray-400 text-lg'>{transformCount(video.viewsCount)} views</span>
						<span>•</span>
						<span className='text-gray-400 text-base'>{transformDate(video.createdAt)}</span>
					</div>
				</div>
			</div>
		</m.div>
	)
}
