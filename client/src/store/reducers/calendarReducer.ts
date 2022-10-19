import { createSlice, configureStore } from '@reduxjs/toolkit'
import { IEvent } from '../../types/CalendarTypes'

interface EventsState {
	events: IEvent[]
}

const initialState: EventsState = {
	events: []
}

export const todosSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		eventAdded(state, action) {
			state.events.push(action.payload)
		},
	},
})
