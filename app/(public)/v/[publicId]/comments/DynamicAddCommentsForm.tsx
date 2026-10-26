'use client'

import dynamic from 'next/dynamic';

export const DynamicAddCommentsForm = dynamic(
	() => import('./AddCommentsForm').then(mod => mod.AddCommentsForm),
	{ ssr: false }
)
