import React, { FC, forwardRef, RefObject, useRef, } from 'react'
import { Day } from '../../models/calendarModels/Day';

interface EventFormProps {
	addedDay: Day | undefined;
	visible: (visible: boolean) => void
	addEvent: (day: Day, value: string) => void
}


const EventForm: FC<EventFormProps> = ({ visible, addedDay, addEvent }) => {
	const eventName = useRef<HTMLInputElement>(null)
	
	function submitEvent(e: React.FormEvent) {
		e.preventDefault()
		visible(false)
		if (addedDay && eventName.current) {
			addEvent(addedDay, eventName.current?.value)
		}
	}

	return (
		<form>
			<input type="text" ref={eventName} />
			<button onClick={submitEvent}>Добавить</button>
		</form>
	)
}

export default EventForm