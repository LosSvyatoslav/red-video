import { axiosClassic, instance } from '@/api/axios'

import type { IComment, ICommetData } from '@/types/comment.types'
import type {} from '@/types/video.types'

class CommentService {
	private _COMMENTS = '/comments'

	async byVideoPublicId(publicId?: string | null) {
		const { data } = await axiosClassic.get<IComment[]>(`${this._COMMENTS}/by-video/${publicId}`)
		return data
	}
	update(id: string, data: ICommetData) {
		return instance.put<IComment>(`${this._COMMENTS}/${id}`, data)
	}
	create(data: ICommetData) {
		return instance.post<IComment>(this._COMMENTS, data)
	}
	delete(id: string) {
		return instance.delete<IComment>(`${this._COMMENTS}/${id}`)
	}
}

export const commentService = new CommentService()
