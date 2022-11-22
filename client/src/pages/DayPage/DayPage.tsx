import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DayPage.scss'
import { getDateTitle } from '../../utils/getDateTitle'
import { calendarApi } from '../../services/calendarApi'
import { IEvent } from '../../types/CalendarTypes'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import Modal from '../../components/UI/modal/modal'
import EventForm from '../../components/calendar/EventForm'
import { createEventDay } from '../../store/store'
import { AuthToken } from '../../context/authContext'
import DayPageInner from './DayPageInner'
import DayPageNavigation from './DayPageNavigation'

const DayPage = memo(() => {
	const params = useParams()
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const dispatch = useAppDispatch()
	const eventsRedux = useAppSelector(state => state.events.events.filter(ev => ev.dayId === params.id))
	const { data: eventsDb } = calendarApi.useGetEventsByIdQuery(params.id ? [params.id, jwtToken] : ['null', jwtToken])

	const events = eventsDb ? eventsDb : eventsRedux

	const [createEvent] = calendarApi.useAddEventMutation()

	let dayIdString: string[] = []

	if (params.id) {
		dayIdString = params.id?.split('_');
	}


	const [date, setDate] = useState<Date>()
	const [eventModal, setEventModal] = useState(false)



	const addEvent = async (newEv: IEvent) => {
		jwtToken ? await createEvent([newEv, jwtToken]) : dispatch(createEventDay(newEv))
	}

	useEffect(() => {
		setDate(new Date(+dayIdString[2], +dayIdString[1] - 1, +dayIdString[0]))
	}, [params.id])



	return (
		<>
			<div className='daypage__container'>
				{date && <DayPageNavigation date={date} />}
				{date && <h2 className='daypage__title'>{getDateTitle(date.getFullYear(), date.getMonth(), date.getDay(), date.getDate())}</h2>}
				{events && <DayPageInner events={events} setEventModal={setEventModal} />}
			</div>

			<Modal visible={eventModal} setVisible={setEventModal}>
				<EventForm visible={setEventModal} addedDay={params.id} addEvent={addEvent} />
			</Modal>
		</>

	)
})

export default DayPage