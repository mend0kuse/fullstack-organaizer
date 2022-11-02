import React, { FC, useCallback } from 'react'
import { Day } from '../../../models/calendarModels/Day'
import CalendarDayEvents from './CalendarDayEvents';
import CalendarDayInner from './CalendarDayInner';
import './CalendarDay.scss'

interface CalendarDayProps {
	day: Day;
	setAddedDay: (day: Day) => void;
	setEventModal: (visible: boolean) => void;
}

const CalendarDay: FC<CalendarDayProps> = ({ day, setAddedDay, setEventModal }) => {

	return (
		<div className={day.number ? 'inner-calendar__day day-calendar' : 'inner-calendar__day day-calendar empty'}>
			{day.number && <CalendarDayInner day={day} setAddedDay={setAddedDay} setEventModal={setEventModal} />}
			{day.number && day.events.length > 0 && <CalendarDayEvents events={day.events} />}
		</div >
	)
}

export default CalendarDay