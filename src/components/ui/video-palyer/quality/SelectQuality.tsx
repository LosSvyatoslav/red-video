'use client'

import cn from 'clsx'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'

import { useOutside } from '@/hooks/useOutside'

import { EnumVideoPlayerQuality } from '../video-player.types'

import { VIDEO_QUALITITES } from './qualities.data'

interface Props {
	currentValue: EnumVideoPlayerQuality
	onChange: (quality: EnumVideoPlayerQuality) => void
	maxResolution: EnumVideoPlayerQuality
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
	const { isShow, ref, setIsShow } = useOutside<HTMLDivElement>(false)
	const avialableQualities = VIDEO_QUALITITES.slice(VIDEO_QUALITITES.indexOf(maxResolution))
	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className='transition-colors hover:text-primary'
			>
				{currentValue}
			</button>

			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-gray-800 py-2 px-4 rounded absolute bottom-8
				 right-0 z-10 shadow'
					>
						{avialableQualities.map(quality => (
							<li
								key={quality}
								className='mb-1'
							>
								<button
									onClick={() => {
										onChange(quality)
										setIsShow(false)
									}}
									className={cn('transition-colors border-b border-b-transparent', {
										'border-b-white': quality === currentValue,
										'hover:text-primary': quality !== currentValue
									})}
									disabled={quality === currentValue}
								>
									{quality}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
