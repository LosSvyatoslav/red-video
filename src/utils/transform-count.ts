export function transformCount(count: number): string {
	let formattedViews: string
	if (count >= 1_000_000_000) {
		formattedViews = (count / 1_000_000_000).toFixed(1)
		formattedViews = formattedViews.endsWith('.0') ? formattedViews.slice(0, -2) : formattedViews
		return `${formattedViews}B`
	} else if (count >= 1_000_000) {
		formattedViews = (count / 1_000_000).toFixed(1)
		formattedViews = formattedViews.endsWith('.0') ? formattedViews.slice(0, -2) : formattedViews
		return `${formattedViews}M`
	} else if (count >= 1_000) {
		formattedViews = (count / 1_000).toFixed(1)
		formattedViews = formattedViews.endsWith('.0') ? formattedViews.slice(0, -2) : formattedViews
		return `${formattedViews}K`
	} else {
		return `${count}`
	}
}
