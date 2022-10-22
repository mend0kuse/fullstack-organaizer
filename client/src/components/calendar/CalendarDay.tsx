import React, { FC, useCallback } from 'react'
import { Day } from '../../models/calendarModels/Day'
import { useNavigate } from 'react-router-dom'

interface CalendarDayProps {
	day: Day;
	setAddedDay: (day: Day) => void;
	setEventModal: (visible: boolean) => void;
}

const CalendarDay: FC<CalendarDayProps> = ({ day, setAddedDay, setEventModal }) => {
	const router = useNavigate()

	const openEventModal = useCallback(
		() => {
			setAddedDay(day)
			setEventModal(true)
		}, [setAddedDay, setEventModal, day])


	return (
		<div className={day.number ? 'inner-calendar__day day-calendar' : 'inner-calendar__day day-calendar empty'}>
			{day.number && <div className='day-calendar__number'>{day.number}</div>}
			{day.number && <button className='day-calendar__add ' onClick={openEventModal}>+</button>}
			{day.number && <button className='day-calendar__open _icon-open' onClick={() => router(`/calendar/${day.id}`)}></button>}
			{day.number && day.events.length > 0 &&
				<div className='day-calendar__events'>
					событий:{day.events.length}
				</div>}
		</div >
	)
}

export default CalendarDay