import { type Control, Controller } from 'react-hook-form'

import { UploadField } from '@/ui/upload-field/uploadField'

import type { ISettingsData } from './settings.types'

interface Props {
	control: Control<ISettingsData>
}

export function SettingsMediaFields({ control }: Props) {
	return (
		<div>
			<Controller
				control={control}
				name='channel.avatarUrl'
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Avatar'
						onChange={onChange}
						value={value}
						error={error}
						folder='avatars'
						className='mb-5'
					/>
				)}
			/>
			<Controller
				control={control}
				name='channel.bannerUrl'
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Banner'
						onChange={onChange}
						value={value}
						error={error}
						folder='banners'
						overlay=''
						sizePreview={[446, 250]}
					/>
				)}
			/>
		</div>
	)
}
