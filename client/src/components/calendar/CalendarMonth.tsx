import React, { FC } from 'react'
import { Day } from '../../models/calendarModels/Day'
import './calendar.scss'
import CalendarWeeksNames from './CalendarWeeksNames'

import CalendarDay from './CalendarDay/CalendarDay'
import { IEvent } from '../../types/CalendarTypes'

interface CalendarMonthProps {
	days: Day[][];
	events: IEvent[] | undefined;
	setAddedDay: (day: Day) => void
	setEventModal: (vis: boolean) => void
}

const CalendarMonth: FC<CalendarMonthProps> = ({ days, events, setAddedDay, setEventModal }) => {
	return (
		<div className="calendar__inner inner-calendar">
			{days.map((row, index) =>
				<div key={index} className='inner-calendar__row'>
					{row.map((day, index) => {
						if (events) {
							day.events = events.filter(event => event.dayId == day.id)
						}
						return <CalendarDay key={index} day={day} setAddedDay={setAddedDay} setEventModal={setEventModal} />
					})}
				</div>
			)}
		</div>
	)
}

export default CalendarMonth