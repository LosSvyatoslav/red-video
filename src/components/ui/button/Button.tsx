import cn from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'simple'
}

export function Button({ variant = 'primary', isLoading, children, ...props }: Props) {
	return (
		<button
			className={cn(
				'py-2 px-10 cursor-pointer font-semibold rounded transition-colors disabled:bg-gray-400',
				{
					'bg-primary text-white  hover:bg-red-400': variant === 'primary',
					'bg-gray-600 text-white  hover:bg-gray-500': variant === 'secondary',
					'bg-gray-800 rounded-700 font-medium h-max hover:bg-gray-700': variant === 'simple'
				}
			)}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
