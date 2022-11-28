import { createSlice } from '@reduxjs/toolkit'
import Note from '../../models/notebookModels/Note'
import { defaultEditor } from '../../utils/editorzConfig'

interface NotesState {
	notes: Note[]
}

const initialState: NotesState = {
	notes: [defaultEditor]
}

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote(state, action) {
			state.notes.push(action.payload)
		},
		deleteeeNote(state, action) {
			state.notes = state.notes.filter(i => i.time !== action.payload)
		},
		saveNote(state, action) {
			state.notes = state.notes.map(i => {
				if (i.time === action.payload.time) {
					i.title = action.payload.title
					i.blocks = action.payload.blocks
					return i
				}
				return i
			})
		}
	},
})
