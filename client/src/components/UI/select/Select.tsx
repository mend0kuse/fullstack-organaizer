import React, { FC } from 'react'

interface SelectProps {
	value: any
	options: any[];
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

const Select: FC<SelectProps> = ({ value, options, onChange }) => {
	return (

		<select value={value} onChange={e => onChange(e)}>
			{options.map((item) => {
				return <option key={item.value} value={item.value}>{item.name}</option>
			})}
		</select>
		
	)
}

export default Select