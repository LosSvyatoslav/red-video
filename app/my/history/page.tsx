import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { DynamicHistoryPage } from './DynamicHistoryPage'

export const metadata: Metadata = {
	title: 'History',
	...NO_INDEX_PAGE
}

export default function HPage() {
	return <DynamicHistoryPage />
}
