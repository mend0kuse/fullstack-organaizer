import React, { memo } from 'react'

const CalendarWeeksNames = memo(() => {
	return (
		<div className="calendar__names names-calendar">
			<div className="names-calendar__item">ПН</div>
			<div className="names-calendar__item">ВТ</div>
			<div className="names-calendar__item">СР</div>
			<div className="names-calendar__item">ЧТ</div>
			<div className="names-calendar__item">ПТ</div>
			<div className="names-calendar__item">СБ</div>
			<div className="names-calendar__item">ВС</div>
		</div>
	)
})

export default CalendarWeeksNames