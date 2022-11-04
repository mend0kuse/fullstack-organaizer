import React, { FC, memo, useRef, useState, } from 'react'
import { Day } from '../../models/calendarModels/Day';
import InputWithUp from '../UI/input/InputWithUp';

interface EventFormProps {
	addedDay: Day | undefined;
	visible: (visible: boolean) => void
	addEvent: (day: Day, value: string) => void
}


const EventForm: FC<EventFormProps> = memo(({ visible, addedDay, addEvent }) => {
	const [eventName, setEventName] = useState('')

	function submitEvent(e: React.FormEvent) {
		e.preventDefault()
		visible(false)
		if (addedDay && eventName) {
			addEvent(addedDay, eventName)
		}
	}

	return (
		<form>
			<InputWithUp placeholder='Название' className='black' value={eventName} onChange={e => setEventName(e.target.value)} />
			<button onClick={submitEvent}>Добавить</button>
		</form>
	)
})

export default EventForm