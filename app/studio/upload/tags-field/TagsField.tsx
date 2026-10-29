import clsx from 'clsx'
import cn from 'clsx'
import { div } from 'framer-motion/m'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	label: string
	placeholder?: string
	error?: string
	initialTags: string[]
	onTagsChange: (tags: string[]) => void
	className?: string
}

export function TagsField({
	label,
	error,
	initialTags = [],
	onTagsChange,
	placeholder = 'Enter tags:',
	className
}: Props) {
	const [tags, setTags] = useState<string[]>(initialTags)
	const [inputValue, setInputValue] = useState<string>('')
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ',' || e.key === 'Enter') {
			e.preventDefault()
			addTag(inputValue.trim())
		} else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			removeTag(tags.length - 1)
		}
	}
	const addTag = (tag: string) => {
		if (tag && !tags.includes(tag)) {
			const newTags = [...tags, tag]
			setTags(newTags)
			setInputValue('')
			onTagsChange?.(newTags)
		}
	}
	const removeTag = (index: number) => {
		const newTags = tags.filter((_, i) => i !== index)
		setTags(newTags)
		onTagsChange(newTags)
	}

	return (
		<div className={twMerge('mb-4', className)}>
			<label htmlFor=''>
				<span className='block text-gray-400 font-semibold mb-2'>{label}</span>
				<div
					className={cn(
						'w-full px-3 py-2 border rounded shadow-sm flex flex-wrap gap-2 transition-colors focus-within:border-gray-500 bg-transparent',
						error ? 'border-red-500' : 'border-border'
					)}
				>
					{tags.map((tag, index) => (
						<div
							key={index}
							className='flex items-center px-2 py-1 bg-gray-700 text-white rounded'
						>
							<span>{tag}</span>
							<button
								type='button'
								onClick={() => removeTag(index)}
								className='ml-2 text-gray-400 hover:text-gray-200'
							>
								&times;
							</button>
						</div>
					))}
					<input
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className='bg-transparent outline-none grow text-white'
					/>
				</div>
			</label>
			{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
		</div>
	)
}
