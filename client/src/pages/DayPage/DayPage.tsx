import React from 'react'
import { useParams } from 'react-router-dom'
import { eventAdded, RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'

const DayPage = () => {
	const params = useParams()

	const events = useSelector((state: RootState) => state.events.events)
	const dispatch = useDispatch()

	let filteredEvents = events.filter(event => event.dayId == params.id)

	return (
		<div>
			{filteredEvents.map((ev, index) =>
				<h3 key={index}>{ev.name}</h3>
			)}
		</div>
	)
}

export default DayPage