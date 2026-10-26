'use client'

import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

import { PAGE } from '@/config/public-page.config'

export function SearchField() {
	const [serachTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const handleKEYDowm = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		e.preventDefault()
		if (serachTerm.trim() !== '') {
			router.push(PAGE.SEARCH(encodeURIComponent(serachTerm)))
		}
	}
	return (
		<div className='w-3/12'>
			<input
				value={serachTerm}
				onChange={e => setSearchTerm(e.target.value)}
				onKeyDown={handleKEYDowm}
				type='search'
				placeholder='Type to search'
				className='py-2 px-4 bg-transparent w-full outline-none border-none shadow-none'
			/>
		</div>
	)
}
