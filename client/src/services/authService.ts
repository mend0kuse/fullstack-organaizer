import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { INotification } from '../types/KanbanTypes';

export interface User {
	_id: string;
	username: string;
	avatar?: string;
	notifications: INotification[]
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

		sendAvatar: builder.mutation<User, FormData>({
			query: (form) => ({
				url: `/lk/avatar`,
				method: 'POST',
				body: form,
			}),
			invalidatesTags: ['lk'],
		}),

		inviteToProject: builder.mutation<User, [INotification, string]>({
			query: ([notif, token]) => ({
				url: `/lk/invite`,
				method: 'POST',
				body: notif,
				headers: {
					authorization: token
				}
			}),
		}),

		acceptInvite: builder.mutation<User, [string, string]>({
			query: ([notId, userId]) => ({
				url: `/lk/accept`,
				method: 'POST',
				body: { notId, userId },
			}),
			invalidatesTags: ['lk'],
		}),

	}),
})