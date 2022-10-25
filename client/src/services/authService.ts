import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
	_id: string;
	username: string;
	avatar?: string;
}
export interface UserWithAvatar {
	_id: string;
	username: string;
	avatar: string;
}


export const authService = createApi({
	reducerPath: 'authService',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
	tagTypes: ['lk'],
	endpoints: (builder) => ({
		//регистрация
		registration: builder.mutation({
			query: (newUser) => ({
				url: `/auth/registration`,
				method: 'POST',
				body: { ...newUser }
			}),
		}),

		//вход
		login: builder.mutation({
			query: (userData) => ({
				url: `/auth/login`,
				method: 'POST',
				body: { ...userData }
			}),
		}),

		userInfo: builder.query<User, string>({
			query: (token) => ({
				url: `/lk`,
				headers: {
					authorization: token
				}
			}),
			providesTags: result => ['lk'],
		}),
		sendAvatar: builder.mutation<UserWithAvatar, FormData>({
			query: (form) => ({
				url: `/lk/avatar`,
				method: 'POST',
				body: form,
			}),
			invalidatesTags: ['lk'],
		}),


	}),
})