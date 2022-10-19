import React, { useState, useEffect, FC } from 'react'
import Calendar from '../../components/calendar/CalendarMonth'
import Select from '../../components/calendar/SelectMonths'
import { Month } from '../../models/calendarModels/Month'
import { Months } from '../../types/CalendarTypes'
import './CalendarPage.scss'

const CalendarPage: FC = () => {
	const date: Date = new Date()

	const [dateShow, setDateShow] = useState({ month: date.getMonth(), year: date.getFullYear() }) //получение текущего месяца и года

	const [calendar, setCalendar] = useState<Month>(new Month(dateShow.year, dateShow.month))

	function changeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
		const val = +event.target.value;
		setDateShow({ ...dateShow, month: val })
	}

	useEffect(() => {
		const newCalendar = new Month(dateShow.year, dateShow.month)
		newCalendar.draw()
		setCalendar(newCalendar)

	}, [dateShow.month, dateShow.year])

	function nextMonth() {
		if (dateShow.month == 11) {
			setDateShow({ year: dateShow.year + 1, month: 0 })
		}
		else {
			setDateShow({ ...dateShow, month: dateShow.month + 1 })
		}
	}
	function prevMonth() {
		if (dateShow.month == 0) {
			setDateShow({ year: dateShow.year - 1, month: 11 })
		}
		else {
			setDateShow({ ...dateShow, month: dateShow.month - 1 })
		}
	}

	return (
		<div className='calendar__container'>
			<div className="calendar__navigation navigation-calendar">
				<button onClick={prevMonth}>Назад</button>
				<div className="navigation-calendar__filter">
					<Select value={dateShow.month} onChange={changeSelect} />
					<input type="number" value={dateShow.year} onChange={e => setDateShow({ ...dateShow, year: +e.target.value })} />
				</div>
				<button onClick={nextMonth}>Вперед</button>
			</div>
			<Calendar days={calendar.days} />
		</div >
	)
}

export default CalendarPage