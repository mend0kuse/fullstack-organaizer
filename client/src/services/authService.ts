import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authService = createApi({
	reducerPath: 'authService',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
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

		userInfo: builder.query({
			query: (token) => ({
				url: `/lk`,
				headers: {
					authorization: token
				}
			}),
		}),
		sendAvatar: builder.mutation({
			query: (file) => ({
				url: `/lk/avatar`,
				method: 'POST',
				body: {
					file: file
				}
			}),
		}),


	}),
})