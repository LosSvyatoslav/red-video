import dayjs from 'dayjs'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page'

import { processHtmlContent } from '@/utils/process-html-content'
import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'

import type { IFullVideo, IVideo } from '@/types/video.types'
import { StudioActions } from './StudioActions'

interface Props {
	video: IFullVideo
}

export function StudioVideoItem({ video }: Props) {
	const { initialContent } = processHtmlContent(video.description, 1)

	return (
		<div className='grid grid-cols-[.49fr_1.1fr_0.3fr_0.3fr_0.3fr_0.2fr_0.5fr] gap-6 mb-6 border-b border-b-border pb-6 last:border-none'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='shrink-0'
				target='_blank'
			>
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

			<div>
				<Link
					href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
					className='line-clamp-1 text-lg mb-1'
				>
					{video.title}
				</Link>
				<div className='opacity-50'>{parse(initialContent)}</div>
			</div>

			<div>
				<div className='text-gray-400 '>{dayjs(video.createdAt).format('DD MMM YYYY')}</div>
				<div className='text-gray-600'>Published</div>
			</div>

			<div>
				<div className='text-gray-400 '>
					{video.viewsCount.toLocaleString('ru-RU')} views
				</div>{' '}
			</div>
			<div>
				<div className='text-gray-400 '>
					{video.comments.length.toLocaleString('ru-RU')} comments
				</div>
			</div>

			<div>
				<div className='text-gray-400 '>
					{video.likes.length.toLocaleString('ru-RU')} likes
				</div>
			</div>

			<StudioActions video={video} />
		</div>
	)
}
