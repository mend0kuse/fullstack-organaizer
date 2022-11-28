import { NoteBlock } from './../models/notebookModels/Note';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Note from '../models/notebookModels/Note'



export const notebookApi = createApi({
	reducerPath: 'notebookApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://server-production-e635.up.railway.app/notebook' }),
	tagTypes: ['notebook'],
	endpoints: (builder) => ({
		//создание проекта
		createNote: builder.mutation<Note, [Note, string, string]>({
			query: ([newNote, title, token]) => ({
				url: `/`,
				method: 'POST',
				headers: {
					authorization: token
				},
				body: { ...newNote, title }
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
			providesTags: result => ['notebook'],
		}),
		updateNote: builder.mutation<Note, [number, NoteBlock[], string, string]>({
			query: ([time, newBlocks, title, token]) => ({
				url: `/${time}`,
				method: 'PUT',
				headers: {
					authorization: token
				},
				body: { blocks: newBlocks, title }
			}),
			invalidatesTags: ['notebook'],
		}),
		deleteNote: builder.mutation<Note, [number, string]>({
			query: ([time, token]) => ({
				url: `/${time}`,
				method: 'DELETE',
				headers: {
					authorization: token
				},
			}),
			invalidatesTags: ['notebook'],
		}),
	}),
})