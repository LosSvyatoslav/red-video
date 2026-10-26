import type { Metadata } from 'next'
import Image from 'next/image'

import { Heading } from '@/ui/Heading'
import { VerifiedBage } from '@/ui/VerifiedBage'

import { transformCount } from '@/utils/transform-count'

import { channelService } from '@/services/channel.service'
import type { IpageSlugProp } from '@/types/page.types'

import { ChannelVideos } from './ChannelVideos'
import { DynamicSubscribeButton } from './DynamicSubscribeButton'

export const revalidate = 100
export async function generateMetadata({ params }: IpageSlugProp): Promise<Metadata> {
	const { slug } = await params
	const data = await channelService.bySlug(slug)

	const channel = data.data
	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll()
	return data.map(channel => ({
		slug: channel.slug
	}))
}

export default async function ChannelPage({ params }: IpageSlugProp) {
	const { slug } = await params

	const data = await channelService.bySlug(slug)

	const channel = data.data

	return (
		<section>
			<div>
				<div className='relative w-full h-62.25 rounded-2xl overwlow-hidden shadow-md'>
					<Image
						alt={channel.user.name || ''}
						src={channel.bannerUrl}
						fill
						style={{ objectFit: 'cover' }}
						className='rounded-3xl'
						quality={75}
						priority
						loading="eager"
					/>
				</div>
				<div className='flex items-start gap-5 mt-7 w-1/2 mb-12'>
					<Image
						alt={channel.slug}
						src={channel.avatarUrl}
						width={162}
						height={162}
						className='rounded-xl shrink-0 shadow-md'
						quality={75}
						priority
						loading="eager"
					/>
					<div>
						<Heading
							isPageHeading
							className='mb-3'
						>
							<span className='flex items-center gap-2'>
								{channel.user.name}
								{channel.isVerified && <VerifiedBage size={20} />}
							</span>
						</Heading>
						<div className='text-gray-400 text-[0.9rem] mb-2 flex items-center gap-1'>
							<span>@${channel.slug}</span>
							<span>•</span>
							<span>{transformCount(channel.subscribers.length)} subscribers</span>
							<span>•</span>
							<span>{channel.videos.length} videos</span>
						</div>
						<article className='mb-4 text-gray-400 text-sm leading-snug w-3/4'>
							{channel.description}
						</article>
						<DynamicSubscribeButton slug={slug} />
					</div>
				</div>
			</div>
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}
