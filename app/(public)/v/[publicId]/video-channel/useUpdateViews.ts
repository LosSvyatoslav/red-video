import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { videoService } from '@/services/video.service'
import { watchHistoryService } from '@/services/watch-history.service'
import type { ISingleVideoResponse } from '@/types/video.types'

export function useUpdateViews({ video }: { video: ISingleVideoResponse }) {
	const hasUpdated = useRef(false)
	const { mutate: updateViews } = useMutation({
		mutationKey: ['update-video-views'],
		mutationFn: () => videoService.updateViews(video.publicId)
	})

	const { mutate: updateWatchHistory } = useMutation({
		mutationKey: ['update-watch-history'],
		mutationFn: () => watchHistoryService.addToHistory(video.id)
	})

	useEffect(() => {
		if (hasUpdated.current) return

		hasUpdated.current = true
		updateViews()
		updateWatchHistory()
	}, [updateViews, updateWatchHistory])
	return {}
}
