import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DayPage.scss'
import { getDateTitle } from '../../utils/getDateTitle'
import { calendarApi } from '../../services/calendarApi'
import { IEvent } from '../../types/CalendarTypes'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import DayPageEvent from './DayPageEvent'
import Modal from '../../components/UI/modal/modal'
import EventForm from '../../components/calendar/EventForm'
import { createEventDay } from '../../store/store'
import { Day } from '../../models/calendarModels/Day'
import { AuthToken } from '../../context/authContext'

const DayPage = memo(() => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	let events: IEvent[] = []
	const eventsRedux = useAppSelector(state => state.events.events.filter(ev => ev.dayId === params.id))


	const [createEvent] = calendarApi.useAddEventMutation()


	if (params.id) {
		const { data } = calendarApi.useGetEventsByIdQuery(params.id)
		events = data ? data : eventsRedux
	}

	let dayIdString = params.id?.split('_');

	const [date, setDate] = useState<Date>()
	const [eventModal, setEventModal] = useState(false)

	const addEvent = useCallback(
		async (newEv: IEvent) => {
			jwtToken ? await createEvent(newEv) : dispatch(createEventDay(newEv))
		}, [jwtToken])

	useEffect(() => {
		if (dayIdString) {
			setDate(new Date(+dayIdString[2], +dayIdString[1] - 1, +dayIdString[0]))
		}
	}, [])


	return (
		<div className='daypage__container'>
			{date && <h2 className='daypage__title'>{getDateTitle(date.getMonth(), date.getDay(), date.getDate())}</h2>}
			<div className="daypage__inner inner-daypage">
				{events.length > 0
					? <div className="inner-daypage__events events-daypage">
						{events.map((ev, index) => <DayPageEvent ev={ev} key={index} />)}
					</div>
					: <h3 className='inner-daypage__nothing'>Событий на этот день нет</h3>
				}
				<button onClick={() => setEventModal(true)} >Добавить</button>
			</div>
			<Modal visible={eventModal} setVisible={setEventModal}>
				<EventForm visible={setEventModal} addedDay={params.id} addEvent={addEvent} />
			</Modal>
		</div>
	)
})

export default DayPage