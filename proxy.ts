import type { NextRequest } from 'next/server'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page'
import { protectLoginPages } from '@/server-actions/middlewares/protect-login.middleware'
import { protectStudio } from '@/server-actions/middlewares/protect-studio.middleware'
export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname
	if (pathname.startsWith(STUDIO_PAGE.HOME) || pathname.startsWith('/my')) {
		return protectStudio(request)
	}
	if (pathname.startsWith(PAGE.AUTH)) {
		return protectLoginPages(request)
	}
}
export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/my/:path*']
}
