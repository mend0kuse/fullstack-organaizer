import React, { useState, useEffect, FC, useCallback, useContext, useRef } from 'react'
import CalendarMonth from '../../components/calendar/CalendarMonth'
import EventForm from '../../components/calendar/EventForm'
import Select from '../../components/calendar/SelectMonths'
import Modal from '../../components/UI/modal/modal'
import { AuthToken } from '../../context/authContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { Day } from '../../models/calendarModels/Day'
import { Month } from '../../models/calendarModels/Month'
import { calendarApi } from '../../services/calendarApi'
import { createEventDay } from '../../store/store'
import { IEvent } from '../../types/CalendarTypes'
import './CalendarPage.scss'

const CalendarPage: FC = () => {
	const date: Date = new Date()
	let events: IEvent[] = []

	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const dispatch = useAppDispatch()
	const ev = useAppSelector(state => state.events.events)

	const [createEvent] = calendarApi.useAddEventMutation()
	const { data } = calendarApi.useGetEventsQuery('')

	if (jwtToken && data) {
		events = data
	} else {
		events = ev
	}

	async function addEvent(day: Day, value: string) {
		if (day) {
			const newEv = { content: value, dayId: day.id, id: Date.now() }
			if (jwtToken) {
				await createEvent(newEv)
			} else {
				dispatch(createEventDay(newEv))
			}
		}
	}

	const [dateShow, setDateShow] = useState({ month: date.getMonth(), year: date.getFullYear() }) //получение текущего месяца и года

	const [calendar, setCalendar] = useState<Month>(new Month(dateShow.year, dateShow.month))

	const [eventModal, setEventModal] = useState(false)
	const [eventDesc, setEventDesc] = useState('')
	const [addedDay, setAddedDay] = useState<Day>()


	const changeSelect = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const val = +event.target.value;
			setDateShow({ ...dateShow, month: val })
		}
		, [setDateShow, dateShow])

	useEffect(() => {
		const newCalendar = new Month(dateShow.year, dateShow.month)
		newCalendar.draw()
		setCalendar(newCalendar)

	}, [dateShow.month, dateShow.year])

	const nextMonth = useCallback(
		() => {
			if (dateShow.month == 11) {
				setDateShow({ year: dateShow.year + 1, month: 0 })
			}
			else {
				setDateShow({ ...dateShow, month: dateShow.month + 1 })
			}
		}, [setDateShow, dateShow])

	const prevMonth = useCallback(
		() => {
			if (dateShow.month == 0) {
				setDateShow({ year: dateShow.year - 1, month: 11 })
			}
			else {
				setDateShow({ ...dateShow, month: dateShow.month - 1 })
			}
		}, [setDateShow, dateShow])

	return (
		<div className='calendar__container'>
			<div className="calendar__navigation navigation-calendar">
				<button onClick={prevMonth} className='navigation-calendar__btn navigation-calendar-prev _icon-arrow'></button>
				<div className="navigation-calendar__filter">
					<Select value={dateShow.month} onChange={changeSelect} />
					<input type="number" value={dateShow.year} onChange={e => setDateShow({ ...dateShow, year: +e.target.value })} />
				</div>
				<button onClick={nextMonth} className='navigation-calendar__btn navigation-calendar-next _icon-arrow'></button>
			</div>
			<CalendarMonth days={calendar.days} events={events} setAddedDay={setAddedDay} setEventModal={setEventModal} />
			<Modal visible={eventModal} setVisible={setEventModal}>
				<EventForm onChange={setEventDesc} value={eventDesc} visible={setEventModal} addedDay={addedDay} addEvent={addEvent} />
			</Modal>
		</div >
	)
}

export default CalendarPage