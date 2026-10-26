import type { IVideo } from './video.types'

export interface IPlaylist {
	id: string
	title: string
	userId: string
	videos: IVideo[]
	createdAt: string
}


export interface IPlaylistData { 
    title: string
    videoPublicId: string
}