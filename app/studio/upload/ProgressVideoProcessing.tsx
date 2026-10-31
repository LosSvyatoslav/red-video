import { useQuery } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

import { COLORS } from '@/constants/colors.constants'

import { fileService } from '@/services/studio/file.service'

interface Props {
	fileName: string
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
	isReadyToPublish: boolean
}

export function ProgressVideoProcessing({
	fileName,
	setIsReadyToPublish,
	isReadyToPublish
}: Props) {
	const { data: progress = 0 } = useQuery({
		queryKey: ['processing video', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),

		select: data => data.data.status,

		refetchInterval: query => {
			const status = query.state.data?.data?.status

			return status !== undefined && status < 100 ? 3500 : false
		},

		enabled: !!fileName && !isReadyToPublish
	})

	useEffect(() => {
		if (progress === 100) {
			setIsReadyToPublish(true)
			const toastSuccess = async () => {
				const { toast } = await import('react-hot-toast')
				toast.success('Video processed successfully!')
			}
			toastSuccess()
		} else {
			setIsReadyToPublish(false)
		}
	}, [progress, setIsReadyToPublish])

	return (
		progress > 0 && (
			<div
				className='flex items-center justify-center py-0.5 w-full relative rounded-md overflow-hidden 
                text-sm font-medium mb-6'
				style={{ backgroundColor: 'rgb(196 196 196 / 15%)' }}
			>
				<div
					className='inset-0 h-full animate-pulse transition-all absolute bg-linear-to-r from-gray-500 to-gray-600'
					style={{
						width: progress ? `${progress}%` : 0
					}}
				></div>
				<span className='relative'>Processing video ({Math.round(progress)}%)</span>
			</div>
		)
	)
}
