import React, { FC } from 'react'
import MonthsSelect from '../../components/calendar/SelectMonths'
import MonthToggler from '../../models/calendarModels/MonthToggler'

interface MonthNavigationProps {
	setDateShow: (dateShow: { month: number, year: number }) => void;
	dateShow: { month: number, year: number }
}

const MonthNavigation: FC<MonthNavigationProps> = ({ dateShow, setDateShow }) => {

	const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const val = +event.target.value;
		setDateShow({ ...dateShow, month: val })
	}

	return (
		<div className="calendar__navigation navigation-calendar">
			<button onClick={() => MonthToggler.prevMonth(dateShow, setDateShow)} className='navigation-calendar__btn navigation-calendar-prev _icon-arrow'></button>
			
			<div className="navigation-calendar__filter">
				<MonthsSelect value={dateShow.month} onChange={changeSelect} />
				<input type="number" value={dateShow.year} onChange={e => setDateShow({ ...dateShow, year: +e.target.value })} />
			</div>
			
			<button onClick={() => MonthToggler.nextMonth(dateShow, setDateShow)} className='navigation-calendar__btn navigation-calendar-next _icon-arrow'></button>
		</div>
	)
}

export default MonthNavigation