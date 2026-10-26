import { type RefObject, useEffect, useState } from 'react'

import { type HTMLCustomVideoElement } from '../video-player.types'
import { getVideoInfo } from '../video-player.util'

export function useVideoProgress(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const player = playerRef.current
		const handleLoadedMetadata = () => {
			if (!player) return

			const { currentTime, progress, originalTime } = getVideoInfo(player)

			setVideoTime(originalTime)
			setCurrentTime(currentTime)
			setProgress(progress)
		}
		player?.addEventListener('loadedmetadata', handleLoadedMetadata)

		return () => {
			player?.removeEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [playerRef])
	const handleTimeUpdate = () => {
		const player = playerRef.current
		if (!player) return

		const current = player.currentTime
		const duration = player.duration

		setCurrentTime(current)
		setProgress(duration ? (current / duration) * 100 : 0)
	}

	return {
		handleTimeUpdate,
		currentTime,
		videoTime,
		progress,
		setCurrentTime
	}
}
