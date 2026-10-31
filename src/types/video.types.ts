import type { EnumVideoPlayerQuality } from '@/ui/video-palyer/video-player.types'

import type { IChannel } from './channel.types'
import type { IComment } from './comment.types'
import type { IPagination } from './pagination.types'

export interface IOtherVideos {
	publicId: string
	videos: IVideo[]
}

export interface IVideo {
	id: string
	title: string
	publicId: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution: EnumVideoPlayerQuality
	viewsCount: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
	updatedAt: string
}

export interface IFullVideo extends IVideo {
	likes: []
	comments: IComment[]
}

export interface ISingleVideoResponse extends IFullVideo {
	similarVideos: IFullVideo[]
}

export interface IStudioVideoResponse extends IFullVideo {
	tags: {
		id: string
		name: string
	}[]
}

export interface IVideosPagination extends IPagination {
	videos: IFullVideo[]
}
