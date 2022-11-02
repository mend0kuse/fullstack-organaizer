import React, { FC } from 'react'
import Tippy from '@tippyjs/react';
import { IEvent } from '../../../types/CalendarTypes';

interface CalendarDayEventsProps {
	events: IEvent[]
}

const CalendarDayEvents: FC<CalendarDayEventsProps> = ({ events }) => {
	return (
		<div className='day-calendar__events events-calendar'>
			{events.map(ev => {
				return (
					<Tippy content={ev.content}>
						<div className='events-calendar__item'></div>
					</Tippy>
				)
			})}
		</div>
	)
}

export default CalendarDayEvents