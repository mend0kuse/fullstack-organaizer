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
import DayPageInner from './DayPageInner'
import { MonthDrawer } from '../../models/calendarModels/Month'
import DayPageNavigation from './DayPageNavigation'

const DayPage = memo(() => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const { jwtToken, setJwtToken } = useContext(AuthToken)


	let events: IEvent[] = []
	const eventsRedux = useAppSelector(state => state.events.events.filter(ev => ev.dayId === params.id))


	const [createEvent] = calendarApi.useAddEventMutation()

	let dayIdString: string[] = []
	if (params.id) {
		const { data } = calendarApi.useGetEventsByIdQuery(params.id)
		events = data ? data : eventsRedux
		dayIdString = params.id?.split('_');
	}


	const [date, setDate] = useState<Date>()
	const [eventModal, setEventModal] = useState(false)



	const addEvent = async (newEv: IEvent) => {
		jwtToken ? await createEvent(newEv) : dispatch(createEventDay(newEv))
	}

	useEffect(() => {
		setDate(new Date(+dayIdString[2], +dayIdString[1] - 1, +dayIdString[0]))
	}, [params.id])



	return (
		<>
			<div className='daypage__container'>
				{date && <DayPageNavigation date={date}/>}
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