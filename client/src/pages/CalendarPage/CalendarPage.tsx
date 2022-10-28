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
import MonthNavigation from './MonthNavigation'

const CalendarPage: FC = () => {
	const date: Date = new Date() //текущая дата

	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const dispatch = useAppDispatch()
	const ev = useAppSelector(state => state.events.events)

	const [createEvent] = calendarApi.useAddEventMutation()
	const { data } = calendarApi.useGetEventsQuery('')

	const events = (jwtToken && data) ? data : ev //если авторизован то данные с базы

	async function addEvent(day: Day, value: string) {
		if (day) {
			const newEv = { content: value, dayId: day.id, id: Date.now() }
			jwtToken ? await createEvent(newEv) : dispatch(createEventDay(newEv))
		}
	}

	const [dateShow, setDateShow] = useState({ month: date.getMonth(), year: date.getFullYear() }) //получение текущего месяца и года
	const [calendar, setCalendar] = useState<Month>(new Month(dateShow.year, dateShow.month))

	const [eventModal, setEventModal] = useState(false)
	const [addedDay, setAddedDay] = useState<Day>() //стейт для дня в который будет добовляться событие

	//переключение месяца при кликах на стрелки или смена селекта
	useEffect(() => {
		const newCalendar = new Month(dateShow.year, dateShow.month)
		newCalendar.draw()
		setCalendar(newCalendar)

	}, [dateShow.month, dateShow.year])


	return (
		<div className='calendar__container'>
			<MonthNavigation dateShow={dateShow} setDateShow={setDateShow} />
			<CalendarMonth days={calendar.days} events={events} setAddedDay={setAddedDay} setEventModal={setEventModal} />
			<Modal visible={eventModal} setVisible={setEventModal}>
				<EventForm visible={setEventModal} addedDay={addedDay} addEvent={addEvent} />
			</Modal>
		</div >
	)
}

export default CalendarPage