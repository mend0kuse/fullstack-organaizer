import {configureStore, combineReducers } from '@reduxjs/toolkit'
import { kanbanApi } from '../services/service'
import { todosSlice } from './reducers/calendarReducer'


const rootReducer = combineReducers({
	events: todosSlice.reducer,
	[kanbanApi.reducerPath]: kanbanApi.reducer
})


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(kanbanApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { eventAdded } = todosSlice.actions
