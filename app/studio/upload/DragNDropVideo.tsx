import * as m from 'framer-motion/m'
import { FileUploader } from 'react-drag-drop-files'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useUpload } from '@/ui/upload-field/useUpload'

import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	reset: UseFormReset<IVideoFormData>
}

export function DragNDropVideo({ reset }: Props) {
	const { uploadFile, isLoading: isUploading } = useUpload({
		maxFileSize: 3 * 1024 * 1024 * 1024,
        folder: 'videos',
		onSuccess(data) {
			const file = data[0]
			if (!file) return

			reset({
				videoFileName: file.name,
				maxResolution: file.maxResolution,
				title: file.name
			})
			toast.success('File uploaded successfully')
		},
		onError() {
			toast.error('Failed to upload the video')
		}
	})

	return isUploading ? (
		<m.div
			initial={{
				opacity: 0
			}}
			animate={{
				opacity: 1
			}}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<p>Uploading...</p>
		</m.div>
	) : (
		<FileUploader
			handleChange={uploadFile}
			types={['MP4', 'AVI', 'MOV', 'WMV']}
			classes='label'
			dropMessageStyle={{
				backgroundColor: '#374151'
			}}
			onSizeError={() => {
				toast.error('File is too big! (max 1GB)')
			}}
		/>
	)
}
