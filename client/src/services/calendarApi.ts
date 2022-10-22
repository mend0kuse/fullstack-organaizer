import { IEvent } from './../types/CalendarTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const calendarApi = createApi({
	reducerPath: 'calendarApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/calendar' }),
	tagTypes: ['calendar'],
	endpoints: (builder) => ({
		
		//получение событий
		getEvents: builder.query<IEvent[], string>({
			query: () => ({
				url: `/`,
			}),
			providesTags: result => ['calendar'],
		}),

		//удаление события
		getEventsById: builder.query<IEvent[], string>({
			query: (id) => ({
				url: `/${id}`,
			}),
			providesTags: result => ['calendar'],
		}),

		//создание события
		addEvent: builder.mutation<IEvent[], IEvent>({
			query: (newEvent) => ({
				url: `/`,
				method: 'POST',
				body: { ...newEvent }
			}),
			invalidatesTags: result => ['calendar'],
		}),
	}),
})