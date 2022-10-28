import React, { FC } from 'react'
import Select from '../../components/calendar/SelectMonths'

interface MonthNavigationProps {
	setDateShow: (dateShow: { month: number, year: number }) => void;
	dateShow: { month: number, year: number }
}

const MonthNavigation: FC<MonthNavigationProps> = ({ dateShow, setDateShow }) => {
	const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const val = +event.target.value;
		setDateShow({ ...dateShow, month: val })
	}
	const nextMonth = () => {
		if (dateShow.month == 11) {
			setDateShow({ year: dateShow.year + 1, month: 0 })
		}
		else {
			setDateShow({ ...dateShow, month: dateShow.month + 1 })
		}
	}

	const prevMonth = () => {
		if (dateShow.month == 0) {
			setDateShow({ year: dateShow.year - 1, month: 11 })
		}
		else {
			setDateShow({ ...dateShow, month: dateShow.month - 1 })
		}
	}

	return (
		<div className="calendar__navigation navigation-calendar">
			<button onClick={prevMonth} className='navigation-calendar__btn navigation-calendar-prev _icon-arrow'></button>
			<div className="navigation-calendar__filter">
				<Select value={dateShow.month} onChange={changeSelect} />
				<input type="number" value={dateShow.year} onChange={e => setDateShow({ ...dateShow, year: +e.target.value })} />
			</div>
			<button onClick={nextMonth} className='navigation-calendar__btn navigation-calendar-next _icon-arrow'></button>
		</div>
	)
}

export default MonthNavigation