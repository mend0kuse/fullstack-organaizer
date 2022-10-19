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
			query: () => ({
				url: `/projects`,
			}),
			providesTags: result => ['kanban'],
		}),
		//удаление проекта
		deleteProject: builder.mutation<KanbanProject, number>({
			query: (id) => ({
				url: `/projects/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['kanban']
		}),
		//создание проекта
		createProject: builder.mutation<KanbanProject, KanbanProject>({
			query: (newProj) => ({
				url: `/projects`,
				method: 'POST',
				body: { ...newProj }
			}),
			invalidatesTags: ['kanban']
		}),
		//обновление проекта
		updateProject: builder.mutation<KanbanProject, [number, KanbanBoard[]]>({
			query: ([id, boards]) => ({
				url: `/projects/${id}`,
				method: 'PUT',
				body: {
					boards: boards
				}
			}),
			invalidatesTags: ['kanban']
		}),
	}),
})