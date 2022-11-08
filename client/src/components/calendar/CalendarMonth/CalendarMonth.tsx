import React, { FC, memo } from 'react'
import { Day } from '../../../models/calendarModels/Day'
import CalendarDay from '../CalendarDay/CalendarDay'
import { DateShowInterface, IEvent } from '../../../types/CalendarTypes'
import '../calendar.scss'

interface CalendarMonthProps {
	dateShow: DateShowInterface;
	days: Day[][];
	events: IEvent[] | undefined;
	setAddedDay: (dayId: string | null) => void
	setEventModal: (vis: boolean) => void
}

const CalendarMonth: FC<CalendarMonthProps> = memo(({ days, events, setAddedDay, setEventModal, dateShow }) => {
	let nowDay = false
	let nowDayClass: string = ''

	const nowDate = new Date()

	if (nowDate.getMonth() === dateShow.month && nowDate.getFullYear() === dateShow.year) {
		nowDay = true
	}
	return (
		<div className="calendar__inner inner-calendar">
			{days.map((row, index) =>
				<div key={index} className='inner-calendar__row'>
					{row.map((day, index) => {
						if (events) {
							day.events = events.filter(event => event.dayId === day.id)
						}
						nowDayClass = nowDay && day.number === nowDate.getDate() ? 'now-day' : ''

						return <CalendarDay className={nowDayClass ? nowDayClass : ''} key={index} day={day} setAddedDay={setAddedDay} setEventModal={setEventModal} />
					})}
				</div>
			)}
		</div>
	)
})

export default CalendarMonth