import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import KanbanBoard from '../models/kanbanModels/KanbanBoard'
import KanbanProject from '../models/kanbanModels/KanbanProject'

export const kanbanApi = createApi({
	reducerPath: 'kanbanApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
	tagTypes: ['kanban'],
	endpoints: (builder) => ({
		//получение проектов
		getProjects: builder.query<KanbanProject[], string>({
			query: (token) => ({
				url: `/projects`,
				headers: {
					authorization: token
				}
			}),
			providesTags: result => ['kanban'],
		}),
		//удаление проекта
		deleteProject: builder.mutation<KanbanProject, [number, string]>({
			query: ([id, token]) => ({
				url: `/projects/${id}`,
				method: 'DELETE',
				headers: {
					authorization: token
				}
			}),
			invalidatesTags: ['kanban']
		}),
		//создание проекта
		createProject: builder.mutation<KanbanProject, [KanbanProject, string]>({
			query: ([newProj, token]) => ({
				url: `/projects`,
				method: 'POST',
				headers: {
					authorization: token
				},
				body: { ...newProj }
			}),
			invalidatesTags: ['kanban'],
		}),
		//обновление проекта
		updateProject: builder.mutation<KanbanProject, [number, KanbanBoard[], string]>({
			query: ([id, boards, token]) => ({
				url: `/projects/${id}`,
				method: 'PUT',
				headers: {
					authorization: token
				},
				body: {
					boards: boards
				}
			}),
			invalidatesTags: ['kanban']
		}),
		
	}),
})