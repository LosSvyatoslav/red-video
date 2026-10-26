import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import type { IUser } from '@/types/user.types'
import { EnumTokens } from '@/types/auth.types'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
	isLoggedIn: boolean
}

const initialState: IAuthState = {
	user: null,
	accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || null,
	isLoggedIn: !!Cookies.get(EnumTokens.ACCESS_TOKEN)
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData(
			state,
			action: PayloadAction<{
				user: IUser
				accessToken: string
			}>
		) {
			state.user = action.payload.user
			state.isLoggedIn = true
			state.accessToken = action.payload.accessToken
		},
		clearAuthData(state) {
			state.user = null
			state.isLoggedIn = false
			state.accessToken = null
		}
	}
})

export const { setAuthData, clearAuthData } = authSlice.actions
