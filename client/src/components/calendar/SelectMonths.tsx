import React, { FC, useMemo } from 'react'
import { Months } from '../../types/CalendarTypes'

interface SelectProps {
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
	value: number
}

const MonthsSelect: FC<SelectProps> = ({ onChange, value }) => {

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
		<select value={value} onChange={e => onChange(e)}>
			{months.map((item) => {
				return <option key={item.value} value={item.value}>{item.name}</option>
			})}
		</select>
	)
}

export default MonthsSelect