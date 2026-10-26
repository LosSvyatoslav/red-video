import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { DynamicSubscriptionsPage } from './DynamicSubscriptionsPage'

export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
}

export default function SubsPage() {
	return <DynamicSubscriptionsPage />
}
