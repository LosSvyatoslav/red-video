export function stripHtml(html: string) {
	return html.replace(/<[^>]*>/g, '')
}

export function stripHtmlWithBreak(html: string) {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p\s*>/gi, '\n\n')
		.replace(/<\/div\s*>/gi, '\n')
		.replace(/<[^>]*>/g, '')
		.replace(/&nbsp;/gi, ' ')
		.trim()
}