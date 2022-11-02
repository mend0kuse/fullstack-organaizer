import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { Day } from '../../../models/calendarModels/Day';

interface CalendarDayInnerProps {
	day: Day;
	setAddedDay: (day: Day) => void;
	setEventModal: (visible: boolean) => void;
}

const CalendarDayInner: FC<CalendarDayInnerProps> = ({ day, setAddedDay, setEventModal }) => {
	const router = useNavigate()

	const openEventModal = () => {
		setAddedDay(day)
		setEventModal(true)
	}
	
	return (
		<>
			<div className='day-calendar__number'>{day.number}</div>
			<button className='day-calendar__add' onClick={openEventModal}>+</button>
			<button className='day-calendar__open _icon-open' onClick={() => router(`/calendar/${day.id}`)}></button>
		</>
	)
}

export default CalendarDayInner