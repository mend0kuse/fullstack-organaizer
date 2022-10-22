import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { calendarApi } from '../services/calendarApi'
import { kanbanApi } from '../services/service'
// import { todosSlice } from './reducers/calendarReducer'


const rootReducer = combineReducers({
	// events: todosSlice.reducer,
	[kanbanApi.reducerPath]: kanbanApi.reducer,
	[calendarApi.reducerPath]: calendarApi.reducer
})


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(kanbanApi.middleware).concat(calendarApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export const { eventAdded } = todosSlice.actions
