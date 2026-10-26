export function processHtmlContent(htmlContent: string, limit: number) {
	let initialContent = htmlContent
	let reminingContent = ''
	let isShouldShowToggle = false

	const hasPTags = /<\/p>/i.test(htmlContent)

	if (hasPTags) {
		const contentParts = htmlContent.split(/(<\/p>)/i)

		let count = 0
		let index = 0

		for (let i = 0; i < contentParts.length; i++) {
			if (contentParts[i].toLowerCase() === '</p>') {
				count++
			}

			if (count === limit) {
				index = i + 1
				break
			}
		}

		initialContent = contentParts.slice(0, index).join('')
		reminingContent = contentParts.slice(index).join('')
		isShouldShowToggle = reminingContent.trim().length > 0
	} else {
		const charLimit = 150

		if (htmlContent.length > charLimit) {
			initialContent = htmlContent.slice(0, charLimit) + '...'
			reminingContent = htmlContent.slice(charLimit)
			isShouldShowToggle = true
		}
	}

	return { initialContent, reminingContent, isShouldShowToggle }
}