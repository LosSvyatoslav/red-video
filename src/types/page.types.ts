export interface IPageProps<T> {
	params: Promise<T>
}

export type IpageSlugProp = IPageProps<{ slug: string }>
export type IPageIdProps = IPageProps<{ id: string }>
export type IPagePublicIdProps = IPageProps<{ publicId: string }>
