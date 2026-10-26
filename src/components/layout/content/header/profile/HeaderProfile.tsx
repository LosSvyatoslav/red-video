import { LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page'

import { useTypedSelector } from '@/store'

import { HeaderAvatar } from './HeaderAvatar'

export function HeaderProfile() {
	const { isLoggedIn } = useTypedSelector(state => state.auth)
	return isLoggedIn ? (
		<HeaderAvatar />
	) : (
		<LinkButton href={PAGE.AUTH}>
			<LogIn size={20} />
			Auth
		</LinkButton>
	)
}
