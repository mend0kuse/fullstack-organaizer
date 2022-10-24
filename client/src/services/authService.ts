import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authService = createApi({
	reducerPath: 'authService',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }),
	endpoints: (builder) => ({
		//регистрация
		registration: builder.mutation({
			query: (newUser) => ({
				url: `/registration`,
				method: 'POST',
				body: { ...newUser }
			}),
		}),

		//вход
		login: builder.mutation({
			query: (userData) => ({
				url: `/login`,
				method: 'POST',
				body: { ...userData }
			}),
		}),

	}),
})