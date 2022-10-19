import React, { FC } from 'react'
import { Day } from '../../models/calendarModels/Day'
import { useNavigate } from 'react-router-dom'

interface CalendarDayProps {
	day: Day;
	setCurrentDay: (day: Day) => void;
	setEventModal: (visible: boolean) => void;
}

const CalendarDay: FC<CalendarDayProps> = ({ day, setCurrentDay, setEventModal }) => {
	const router = useNavigate()

	function openEventModal(): void {
		setCurrentDay(day)
		setEventModal(true)
	}

	return (
		<div className='inner-calendar__day day-calendar'>
			<div className='day-calendar__number'>{day.number}</div>
			{day.number
				?
				<div className='day-calendar__buttons'>
					<button onClick={openEventModal}>Добавить</button>
					<button onClick={() => router(`/calendar/${day.id}`)}>Открыть</button>
				</div>
				: ''
			}
			{
				day.events.length
					? <div className='day-calendar__events'>событий:{day.events.length}</div>
					: <div></div>
			}
		</div>
	)
}

export default CalendarDay