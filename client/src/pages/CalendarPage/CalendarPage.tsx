import React, { useState, useEffect, FC, useContext, memo, } from 'react'
import CalendarMonth from '../../components/calendar/CalendarMonth/CalendarMonth'
import CalendarWeeksNames from '../../components/calendar/CalendarWeeksNames'
import EventForm from '../../components/calendar/EventForm'
import Modal from '../../components/UI/modal/modal'
import { AuthToken } from '../../context/authContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { Day } from '../../models/calendarModels/Day'
import { Month } from '../../models/calendarModels/Month'
import { calendarApi } from '../../services/calendarApi'
import { createEventDay } from '../../store/store'
import './CalendarPage.scss'
import MonthNavigation from '../../components/calendar/CalendarNavigation/MonthNavigation'

const CalendarPage: FC = memo(() => {
	const date: Date = new Date() //текущая дата
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	//redux logic
	const dispatch = useAppDispatch()
	const ev = useAppSelector(state => state.events.events)

	//api logic
	const [createEvent] = calendarApi.useAddEventMutation()
	const { data } = calendarApi.useGetEventsQuery('')

	//события для дней
	const events = (jwtToken && data) ? data : ev //если авторизован то данные с базы

	const [dateShow, setDateShow] = useState({ month: date.getMonth(), year: date.getFullYear()}) //получение текущего месяца и года
	const [calendar, setCalendar] = useState<Month>(new Month(dateShow.year, dateShow.month))

	const [eventModal, setEventModal] = useState(false)
	const [addedDay, setAddedDay] = useState<Day>() //стейт для дня в который будет добовляться событие


	async function addEvent(day: Day, newEventContent: string) {
		if (day) {
			const newEv = { content: newEventContent, dayId: day.id, id: Date.now() }
			jwtToken ? await createEvent(newEv) : dispatch(createEventDay(newEv))
		}
	}

	//переключение месяца при кликах на стрелки или смене селекта
	useEffect(() => {
		setCalendar(new Month(dateShow.year, dateShow.month))
	}, [dateShow.month, dateShow.year])


	return (
		<>
			<div className='calendar__container'>
				<MonthNavigation dateShow={dateShow} setDateShow={setDateShow} />
				<div className="calendar">
					<CalendarWeeksNames />
					<CalendarMonth days={calendar.days} dateShow={dateShow} events={events} setAddedDay={setAddedDay} setEventModal={setEventModal} />
				</div>
			</div >
			<Modal visible={eventModal} setVisible={setEventModal}>
				<EventForm visible={setEventModal} addedDay={addedDay} addEvent={addEvent} />
			</Modal>
		</>
	)
})

export default CalendarPage