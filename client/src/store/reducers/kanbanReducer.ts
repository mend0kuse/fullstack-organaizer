import { createSlice } from '@reduxjs/toolkit'
import KanbanProject from '../../models/kanbanModels/KanbanProject'

interface KanbanState {
	projects: KanbanProject[]
}

const initialState: KanbanState = {
	projects: []
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		addKanbProject(state, action) {
			state.projects.push(action.payload)
		},
		deleteKanbProject(state, action) {
			state.projects = state.projects.filter(i => i.id !== action.payload)
		},
		saveKanbProject(state, action) {
			state.projects = state.projects.map(i => {
				if (i.id == action.payload.id) {
					i.boards = action.payload.boards
					return i
				}
				return i
			})
		}
	},
})
