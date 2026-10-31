import { div } from 'framer-motion/m'
import { CircleAlert } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { STUDIO_PAGE } from '@/config/studio-page'

import { useProfile } from '@/hooks/useProfile'

export function HeaderAvatar() {
	const { isLoading, profile } = useProfile()

	if (isLoading) return <SkeletonLoader className='w-10 mb-0 rounded-md' />
	return (
		<div className='relative'>
			<Link
				href={STUDIO_PAGE.SETTINGS}
				className='shrink-0'
				aria-label='open-settings'
			>
				<Image
					alt=''
					src={profile?.channel?.avatarUrl || '/images/avatar.png'}
					width={40}
					height={40}
					className='rounded-lg'
				/>
			</Link>
			{profile?.verificationToken && (
				<CircleAlert
					size={20}
					className='absolute -top-2 -right-2 bg-primary rounded-full'
				/>
			)}
		</div>
	)
}
