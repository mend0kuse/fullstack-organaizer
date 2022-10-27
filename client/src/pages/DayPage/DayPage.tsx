import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DayPage.scss'
import { getDateTitle } from '../../utils/getDateTitle'
import { calendarApi } from '../../services/calendarApi'
import { IEvent } from '../../types/CalendarTypes'
import { useAppSelector } from '../../hooks/redux/reduxHooks'

const DayPage = () => {
	const params = useParams()

	let events: IEvent[] = []

	const eventsRedux = useAppSelector(state => state.events.events.filter(ev => ev.dayId == params.id))

	if (params.id) {
		const { data } = calendarApi.useGetEventsByIdQuery(params.id)
		if (data) {
			events = data
		} else {
			events = eventsRedux
		}
	}

	let asd = params.id?.split('_');

	const [date, setDate] = useState<Date>()

	useEffect(() => {
		if (asd) {
			setDate(new Date(+asd[2], +asd[1] - 1, +asd[0]))
		}
	}, [])


	return (
		<div className='daypage__container'>
			{date && <h2 className='daypage__title'>{getDateTitle(date.getMonth(), date.getDay(), date.getDate())}</h2>}
			{events.length > 0
				? events.map((ev, index) => <h3 key={index}>{ev.content}</h3>)
				: <h3>Событий на этот день нет</h3>
			}
			<button></button>
		</div>
	)
}

export default DayPage