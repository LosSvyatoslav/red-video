

import type { IPageIdProps } from '@/types/page.types'

import { SinglePl } from './SinglePl'

export default async function Page({ params }: IPageIdProps) {
	const id = (await params).id
	return <SinglePl id={id} />
}
