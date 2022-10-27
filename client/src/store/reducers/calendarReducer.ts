import { createSlice, configureStore } from '@reduxjs/toolkit'
import { IEvent } from '../../types/CalendarTypes'

interface EventsState {
	events: IEvent[]
}

const initialState: EventsState = {
	events: []
}

export const eventSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		createEventDay(state, action) {
			state.events.push(action.payload)
		},
		deleteEvent(state, action) {
			state.events = state.events.filter(i => i.id !== action.payload)
		}
	},
})
