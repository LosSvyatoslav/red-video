import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { DynamicLikedVideoPage } from './DynamicLikedVideoPage'

export const metadata: Metadata = {
	title: 'Liked videos',
	...NO_INDEX_PAGE
}

export default function LPage() {
	return <DynamicLikedVideoPage />
}
