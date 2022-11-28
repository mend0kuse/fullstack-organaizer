import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { authService } from '../services/authService'
import { calendarApi } from '../services/calendarApi'
import { kanbanApi } from '../services/kanbanApi'
import { notebookApi } from '../services/notebookService'
import { eventSlice } from './reducers/calendarReducer'
import { kanbanSlice } from './reducers/kanbanReducer'
import { notesSlice } from './reducers/notesReducer'


const rootReducer = combineReducers({
	events: eventSlice.reducer,
	kanban: kanbanSlice.reducer,
	notes: notesSlice.reducer,
	[kanbanApi.reducerPath]: kanbanApi.reducer,
	[calendarApi.reducerPath]: calendarApi.reducer,
	[authService.reducerPath]: authService.reducer,
	[notebookApi.reducerPath]: notebookApi.reducer,
})


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false })
			.concat(kanbanApi.middleware)
			.concat(calendarApi.middleware)
			.concat(authService.middleware)
			.concat(notebookApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { createEventDay, deleteEvent } = eventSlice.actions
export const { addKanbProject, deleteKanbProject, saveKanbProject } = kanbanSlice.actions
export const { addNote, deleteeeNote, saveNote } = notesSlice.actions
