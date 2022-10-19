import React, { useState, FC } from 'react'
import { Day } from '../../models/calendarModels/Day'
import './calendar.scss'
import CalendarWeeksNames from './CalendarWeeksNames'
import Modal from '../UI/modal/modal'
import EventForm from './EventForm'
import { eventAdded, RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import CalendarDay from './CalendarDay'

interface CalendarProps {
	days: Day[][];
}

const Calendar: FC<CalendarProps> = ({ days }) => {
	const [eventModal, setEventModal] = useState(false)
	const [eventDesc, setEventDesc] = useState('')
	const [currentDay, setCurrentDay] = useState<Day>()

	const events = useSelector((state: RootState) => state.events.events)
	const dispatch = useDispatch()



	function addEvent(day: Day | undefined, value: string) {
		if (day) {
			dispatch(eventAdded({ name: value, dayId: day.id }))
		}
	}

	return (
		<div className='calendar'>
			<CalendarWeeksNames />
			<div className="calendar__inner inner-calendar">
				{days.map((row, index) =>
					<div key={index} className='inner-calendar__row'>
						{row.map((day, index) => {
							day.events = events.filter(event => event.dayId == day.id)
							return <CalendarDay key={index} day={day} setCurrentDay={setCurrentDay} setEventModal={setEventModal} />
						})}
					</div>
				)}
			</div>
			<Modal visible={eventModal} setVisible={setEventModal}>
				<EventForm value={eventDesc} visible={setEventModal} onChange={setEventDesc} current={currentDay} addEvent={addEvent} />
			</Modal>
		</div >
	)
}

export default Calendar