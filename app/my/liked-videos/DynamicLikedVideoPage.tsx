'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicLikedVideoPage = dynamic(
	() => import('./LikedVideoPage').then(mod => mod.LikedVideoPage),
	{
		ssr: false,
		loading: () => (
			<div className='w-1/2 mt-20'>
				<SkeletonLoader
					count={3}
					className='h-36 rounded-md mb-6'
				/>
			</div>
		)
	}
)

export { DynamicLikedVideoPage }
