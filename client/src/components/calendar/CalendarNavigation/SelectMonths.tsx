import React, { FC, memo, useMemo } from 'react'
import Select from '../../UI/select/Select';
import { DateShowInterface, Months } from '../../../types/CalendarTypes'

interface MonthsSelectProps {
	className: string
	setDateShow: (dateShow: DateShowInterface) => void;
	dateShow: DateShowInterface
}

const MonthsSelect: FC<MonthsSelectProps> = memo(({ dateShow, setDateShow, className }) => {

	const changeSelect = (value: number) => {
		setDateShow({ ...dateShow, month: value })
	}

	const months = useMemo(() => [
		{ value: 0, name: Months.JAN },
		{ value: 1, name: Months.FEB },
		{ value: 2, name: Months.MARCH },
		{ value: 3, name: Months.APRIL },
		{ value: 4, name: Months.MAY },
		{ value: 5, name: Months.JUNE },
		{ value: 6, name: Months.JULY },
		{ value: 7, name: Months.AUG },
		{ value: 8, name: Months.SEP },
		{ value: 9, name: Months.OCT },
		{ value: 10, name: Months.NOV },
		{ value: 11, name: Months.DEC }
	], [])

	return (
		<Select className={className} options={months} onChange={changeSelect} value={months[dateShow.month].name} />
	)
})

export default MonthsSelect