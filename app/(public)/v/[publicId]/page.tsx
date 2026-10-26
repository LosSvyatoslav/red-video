import type { Metadata } from 'next'

import { stripHtml } from '@/utils/strip-html'

import { videoService } from '@/services/video.service'
import type { IPagePublicIdProps } from '@/types/page.types'

import { SingleVideo } from './SingleVideo'

export const revalidate = 100

export async function generateMetadata({ params }: IPagePublicIdProps): Promise<Metadata> {
	const { publicId } = await params

	const data = await videoService.byPublicId(publicId)

	const video = data.data
	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export async function generateStaticParams() {
	const data = await videoService.getAll()
	const videos = data.data.videos
	return videos.map(video => ({
		publicId: video.publicId
	}))
}
export default async function VideoPage({ params }: IPagePublicIdProps) {
	const { publicId } = await params

	const data = await videoService.byPublicId(publicId)

	const video = data.data
	return <SingleVideo video={video} />
}
