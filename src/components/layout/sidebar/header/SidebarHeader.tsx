import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from '@/constants/colors.constants'

import { PAGE } from '@/config/public-page.config'
import { Logo } from './Logo'

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
	return (
		<div className='flex items-center gap-6 mb-12'>
			<button
				className='opacity-85 hover:opacity-100 transition-opacity cursor-pointer'
				onClick={toggleSidebar}
				title='Toggle sidebar'
			>
				<Menu />
			</button>
		<Logo/>
		</div>
	)
}
