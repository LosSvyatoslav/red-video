import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import { SITE_URL } from '@/constants/constants'

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
	metadataBase: new URL(SITE_URL)
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
