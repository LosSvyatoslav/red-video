'use client'

import dynamic from 'next/dynamic'
import { Controller } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { TextArea } from '@/ui/field/TextArea'
import { UploadField } from '@/ui/upload-field/uploadField'

import { useSettings } from './useSettings'

const DynamicSettingsMediaFields = dynamic(() =>
	import('./SettingsMediaFields').then(mod => mod.SettingsMediaFields)
)

export function SettingsForm() {
	const {
		form: {
			handleSubmit,
			register,
			formState: { errors },
			control
		},
		isLoading,
		isProfileLoading,
		onSubmit
	} = useSettings()

	if (isProfileLoading) return <div>Loading...</div>
	return (
		<div className='w-3/5'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							label='Email'
							error={errors.name?.message}
							type='email'
							registration={register('email', { required: 'email required!' })}
							placeholder='Enter email:'
						/>
						<Field
							label='Password'
							error={errors.password?.message}
							type='password'
							registration={register('password')}
							placeholder='Enter password'
						/>
						<Field
							label='Name'
							error={errors.name?.message}
							type='name'
							registration={register('name')}
							placeholder='Enter name:'
						/>
						<Field
							label='Slug (alias)'
							error={errors.channel?.slug?.message}
							type='text'
							registration={register('channel.slug')}
							placeholder='Enter slug:'
						/>
						<TextArea
							label='Description'
							error={errors.channel?.description?.message}
							registration={register('channel.description')}
							placeholder='Enter description:'
							rows={4}
						/>
					</div>

					<DynamicSettingsMediaFields control={control} />
				</div>

				<div className='text-center mt-10'>
					<Button
						type='submit'
						isLoading={isLoading}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}
