'use client'
import * as m from 'framer-motion/m'
import parse from 'html-react-parser'
import { useState } from 'react'

import { processHtmlContent } from '@/utils/process-html-content'

import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)
	return (
		<div className='relative mb-4 bg-gray-800 px-3 py-1.5 rounded'>
			<m.article className={styles.article}>
				{parse(isExpanded ? description : initialContent)}
			</m.article>
			{isShouldShowToggle && (
				<button
					onClick={() => setIsExpanded(prev => !prev)}
					className='text-gray-400 uppercase transition-colors hover:text-gray-200 cursor-pointer mt-2 rounded-lg'
					aria-expanded={isExpanded}
				>
					{isExpanded ? 'Hide' : 'Show more'}
				</button>
			)}
		</div>
	)
}
