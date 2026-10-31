import { useRef, useState } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

import { useFullScreen } from './useFullScreen'
import { useOnSeek } from './useOnSeek'
import { usePlayPause } from './usePlayPause'
import { useSkipTime } from './useSkipTime'
import { useVideoHotKeys } from './useVideoHotKeys'
import { useVideoProgress } from './useVideoProgress'
import { useVideoQuality } from './useVideoQuality'
import { useVideoVolume } from './useVideoVolume'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
}

export function useVideoPlayer({ fileName, toggleTheaterMode }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement | null>(null)
	const bgRef = useRef<HTMLCustomVideoElement | null>(null)

	const [isLightingMode, setIsLightingMode] = useState(true)

	const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef, bgRef)
	const {
		currentTime,
		progress,
		videoTime,
		handleTimeUpdate,
		setCurrentTime
	} = useVideoProgress(playerRef)
	const { quality, changeQuality } = useVideoQuality(playerRef, {
		fileName,
		currentTime,
		setIsPlaying
	})
	const { toggleFullScreen } = useFullScreen(playerRef)
	const { skipTime } = useSkipTime(playerRef, bgRef)
	const { changeVolume, isMuted, toggleMute, volume } = useVideoVolume(playerRef)
	const { onSeek } = useOnSeek(playerRef, bgRef, setCurrentTime)

	const fn = {
		togglePlayPause,
		skipTime,
		toggleFullScreen,
		changeQuality,
		handleTimeUpdate,
		changeVolume,
		toggleMute,
		onSeek,
		toggleLightMode: () => setIsLightingMode(!isLightingMode)
	}
	useVideoHotKeys({ volume, toggleTheaterMode, ...fn })
	return {
		state: {
			isPlaying,
			progress,
			currentTime,
			videoTime,
			quality,
			isMuted,
			volume,
			isLightingMode
		},
		fn,
		playerRef,
		bgRef
	}
}
