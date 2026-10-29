import { useEffect, useRef, useState } from 'react'
import type { Dispatch, RefObject, SetStateAction } from 'react'

type TypeOut<T extends HTMLElement> = {
	ref: RefObject<T | null>
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = <T extends HTMLElement = HTMLElement>(
	initialIsVisible: boolean
): TypeOut<T> => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<T | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
				setIsShow(false)
			}
		}

		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	return { ref, isShow, setIsShow }
}
