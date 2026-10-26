'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSubscribeButton = dynamic(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{ ssr: false, loading: () => <SkeletonLoader className='rounded-md w-39 h-10' /> }
)

export { DynamicSubscribeButton }
