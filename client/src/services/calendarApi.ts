import { IEvent } from './../types/CalendarTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const calendarApi = createApi({
	reducerPath: 'calendarApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://server-production-e635.up.railway.app/calendar' }),
	tagTypes: ['calendar'],
	endpoints: (builder) => ({

		//получение событий
		getEvents: builder.query<IEvent[], string>({
			query: (token) => ({
				url: `/`,
				headers: {
					authorization: token
				}
			}),
			providesTags: result => ['calendar'],
		}),

		//удаление события
		getEventsById: builder.query<IEvent[], [string, string]>({
			query: ([id, token]) => ({
				url: `/${id}`,
				headers: {
					authorization: token
				}
			}),
			providesTags: result => ['calendar'],
		}),

		//создание события
		addEvent: builder.mutation<IEvent[], [IEvent, string]>({
			query: ([newEvent, token]) => ({
				url: `/`,
				method: 'POST',
				body: { ...newEvent },
				headers: {
					authorization: token
				}
			}),
			invalidatesTags: result => ['calendar'],
		}),

		deleteEvent: builder.mutation<IEvent[], [number, string]>({
			query: ([id, token]) => ({
				url: `/${id}`,
				method: 'DELETE',
				headers: {
					authorization: token
				}
			}),
			invalidatesTags: result => ['calendar'],
		}),
	}),
})