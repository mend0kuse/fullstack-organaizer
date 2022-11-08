import React, { FC, memo, useState } from 'react'
import { Day } from '../../models/calendarModels/Day';
import { IEvent } from '../../types/CalendarTypes';
import InputWithUp from '../UI/input/InputWithUp';

interface EventFormProps {
	addedDay: string | null | undefined;
	visible: (visible: boolean) => void
	addEvent: (newEv:IEvent) => void
}


const EventForm: FC<EventFormProps> = memo(({ visible, addedDay, addEvent }) => {
	const [eventName, setEventName] = useState('')
	const [eventColor, setEventColor] = useState('#e66465')

	function submitEvent(e: React.FormEvent) {
		e.preventDefault()
		visible(false)
		if (addedDay) {
			const newEv = {
				id: Date.now(),
				content: eventName,
				bg: eventColor,
				dayId: addedDay
			}
			addEvent(newEv)
			setEventName('')
		}
	}

	return (
		<form>
			<InputWithUp placeholder='Название' className='black' value={eventName} onChange={e => setEventName(e.target.value)} />
			<input type="color" value={eventColor} onChange={e => setEventColor(e.target.value)} />
			<button onClick={submitEvent}>Добавить</button>
		</form>
	)
})

export default EventForm