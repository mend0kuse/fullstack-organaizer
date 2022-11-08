import React, { FC, memo } from 'react'
import MonthsSelect from './SelectMonths'
import MonthToggler from '../../../models/calendarModels/MonthToggler'
import { DateShowInterface } from '../../../types/CalendarTypes';
import './CalendarNavagation.scss'

interface MonthNavigationProps {
	setDateShow: (dateShow: DateShowInterface) => void;
	dateShow: DateShowInterface
}

const MonthNavigation: FC<MonthNavigationProps> = memo(({ dateShow, setDateShow }) => {

	return (
		<div className="calendar__navigation navigation-calendar">
			<button onClick={() => MonthToggler.prevMonth(dateShow, setDateShow)} className='navigation-calendar__btn navigation-calendar-prev _icon-arrow'></button>

			<div className="navigation-calendar__filter filter-navigation">
				<MonthsSelect className='filter-navigation__month' dateShow={dateShow} setDateShow={setDateShow} />
				<input type="number" className='filter-navigation__year' value={dateShow.year} onChange={e => setDateShow({ ...dateShow, year: +e.target.value })} />
			</div>

			<button onClick={() => MonthToggler.nextMonth(dateShow, setDateShow)} className='navigation-calendar__btn navigation-calendar-next _icon-arrow'></button>
		</div>
	)
})

export default MonthNavigation