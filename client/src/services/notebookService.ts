import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Note from '../models/notebookModels/Note'

export const notebookApi = createApi({
	reducerPath: 'notebookApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/notebook' }),
	tagTypes: ['notebook'],
	endpoints: (builder) => ({
		//создание проекта
		createNote: builder.mutation<Note, [Note, string]>({
			query: ([newNote, token]) => ({
				url: `/`,
				method: 'POST',
				headers: {
					authorization: token
				},
				body: { ...newNote }
			}),
			invalidatesTags: ['notebook'],
		}),
		getNotes: builder.query<Note[], string>({
			query: (token) => ({
				url: `/`,
				headers: {
					authorization: token
				}
			}),
			providesTags: result => ['notebook'],
		}),
		getNoteById: builder.query<Note, [string, string]>({
			query: ([token, id]) => ({
				url: `/${id}`,
				headers: {
					authorization: token
				}
			}),
		}),
	}),
})