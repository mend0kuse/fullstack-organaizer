import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Day } from '../../../models/calendarModels/Day';

interface CalendarDayInnerProps {
	day: Day;
	setAddedDay: (dayId: string | null) => void
	setEventModal: (visible: boolean) => void;
}

const CalendarDayInner: FC<CalendarDayInnerProps> = memo(({ day, setAddedDay, setEventModal }) => {
	const router = useNavigate()

	const openEventModal = () => {
		setAddedDay(day.id)
		setEventModal(true)
	}

	return (
		<>
			<div className='day-calendar__number'>{day.number}</div>
			<button className='day-calendar__add' onClick={openEventModal}>+</button>
			<button className='day-calendar__open _icon-open' onClick={() => router(`/calendar/${day.id}`)}></button>
		</>
	)
})

export default CalendarDayInner