import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import { COLORS } from '@/constants/colors.constants'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

import './globals.css'

export const fetchCache = 'default-cache'

const notoSans = Noto_Sans({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'RED video',
		template: `%s | RED Video`
	},
	description: 'Best app for video watching',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: ['info@redvideo.com']
	},
	metadataBase: new URL(SITE_URL),
	applicationName: SITE_NAME,
	authors: {
		name: 'Los Svyatoslav'
	},
	manifest: '/manifest.json',
	publisher: 'Los Svyatoslav',
	formatDetection: {
		telephone: false
	}
}

export const viewport: Viewport = {
	themeColor: COLORS.bg
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='en'
			className={`${notoSans.variable} h-full antialiased`}
		>
			<body className={notoSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
