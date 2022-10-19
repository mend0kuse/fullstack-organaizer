import React, { FC } from 'react'
import { Day } from '../../models/calendarModels/Day';

interface EventFormProps {
	value: string;
	current: Day | undefined;
	visible: (visible: boolean) => void
	onChange: (value: string) => void
	addEvent: (day: Day | undefined, value: string) => void
}


const EventForm: FC<EventFormProps> = ({ visible, current, value, onChange, addEvent }) => {
	function submitEvent(e: React.FormEvent) {
		e.preventDefault()
		visible(false)
		addEvent(current, value)
		onChange('')
	}
	return (
		<form>
			<input type="text" value={value} onChange={e => onChange(e.target.value)} />
			<button onClick={submitEvent}>Добавить</button>
		</form>
	)
}

export default EventForm