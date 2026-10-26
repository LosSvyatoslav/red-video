import { useQuery } from '@tanstack/react-query'

import { commentService } from '@/services/comment.service copy'
import type { ISingleVideoResponse } from '@/types/video.types'

import { CommentItem } from './CommentItem'
import { DynamicAddCommentsForm } from './DynamicAddCommentsForm'

interface Props {
	video: ISingleVideoResponse
}

export function Comments({ video }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideoPublicId(video.publicId),
		initialData: video.comments
	})
	return (
		<div className='border-t border-t-border mt-7 pt-7'>
			<DynamicAddCommentsForm
				videoId={video.id}
				refetch={refetch}
			/>
			{!!data &&
				data.map(comment => (
					<CommentItem
						comment={comment}
						key={comment.id}
						refetch={refetch}
					/>
				))}
		</div>
	)
}
