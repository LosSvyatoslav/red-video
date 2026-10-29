import { useMutation } from '@tanstack/react-query'
import { type ChangeEvent, useCallback } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/studio/file.service'
import type { IFileResponse } from '@/types/file.types'

import { validateFileSize } from './validate-file-size'

interface Props {
	onChange?: (...event: any[]) => void
	folder?: string
	onSuccess?: (data: IFileResponse[]) => void
	onError?: () => void
	maxFileSize?: number
}

type TUseUpload = (props: Props) => {
	uploadFile: (input: ChangeEvent<HTMLInputElement> | File | File[]) => void
	isLoading: boolean
}

export const useUpload: TUseUpload = ({ onChange, folder, onError, onSuccess, maxFileSize }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess: ({ data }) => {
			onChange && onChange(data[0].url)
			onSuccess && onSuccess(data)
		},
		onError: error => {
			toast.error(error.message)
			onError && onError()
		}
	})

	const uploadFile = useCallback(
		(input: ChangeEvent<HTMLInputElement> | File | File[]) => {
			const files =
				input instanceof File
					? [input]
					: Array.isArray(input)
						? input
						: Array.from(input.target.files ?? [])

			const file = files[0]

			if (!file) return

			if (!validateFileSize(file, maxFileSize)) return

			const formData = new FormData()
			formData.append('file', file)
			mutate(formData)
		},
		[mutate, maxFileSize]
	)
	return { uploadFile, isLoading: isPending }
}
