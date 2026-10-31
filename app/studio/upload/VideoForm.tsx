import Image from 'next/image'
import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field } from '@/ui/field/Field'
import { TextArea } from '@/ui/field/TextArea'
import { UploadField } from '@/ui/upload-field/uploadField'

import { stripHtmlWithBreak } from '@/utils/strip-html'

import type { IVideoFormData } from '@/types/studio-video.types'

import { UploadSkeleton } from './UploadSkeleton'
import { VideoFormRightSide } from './VideoFormRightSide'
import { TagsField } from './tags-field/TagsField'

interface Props {
	isPending?: boolean
	form: UseFormReturn<IVideoFormData>
}

export function VideoForm({
	form: {
		register,
		formState: { errors },
		control,
		watch
	},
	isPending
}: Props) {
	return (
		<div className='grid grid-cols-[2.5fr_1fr] gap-10'>
			{isPending ? (
				<UploadSkeleton />
			) : (
				<>
					<div>
						<Field
							label='Title'
							error={errors.title?.message}
							type='text'
							registration={register('title', { required: 'Title required!' })}
							placeholder='Enter title'
						/>

						<Controller
							control={control}
							name='description'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<TextArea
									label='Description'
									onChange={e => onChange(e.target.value)}
									value={stripHtmlWithBreak(value || '')}
									error={error?.message}
									placeholder='Enter description:'
									rows={7}
								/>
							)}
						/>
						<Controller
							control={control}
							name='thumbnailUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Thumbnail'
									onChange={onChange}
									value={value}
									error={error}
									folder='thumbnails'
									className='mb-5'
									sizePreview={[151, 82]}
								/>
							)}
						/>
						<Controller
							control={control}
							name='tags'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<TagsField
									onTagsChange={onChange}
									initialTags={value}
									error={error?.message}
									label='Tags:'
								/>
							)}
						/>
					</div>
					<VideoFormRightSide watch={watch} />
				</>
			)}
		</div>
	)
}
