import React, { FC, useRef } from 'react'
import './Select.scss'

interface SelectProps {
	value: any
	className?: string
	options: { value: number, name: string }[];
	onChange: (value: number) => void,
}

const Select: FC<SelectProps> = ({ value, options, onChange, className }) => {
	const dropdownRef = useRef<null | HTMLDivElement>(null)

	const showDropdown = (visible: boolean) => {
		if (dropdownRef.current) {
			visible ? dropdownRef.current?.classList.add('active') : dropdownRef.current?.classList.remove('active')
		}
	}

	const hideDropdown = (value: number | null = null) => {
		if (value !== null) {
			onChange(value)
		}
		if (dropdownRef.current) {
			dropdownRef.current?.classList.remove('active')
		}
	}
	return (
		<div className={className ? 'dropdown ' + className : 'dropdown'} ref={dropdownRef}>
			<div className="dropdown__select select-dropdown"
				onMouseEnter={() => showDropdown(true)}
				onMouseMove={() => showDropdown(true)}
				onMouseLeave={() => showDropdown(false)}
			>
				<span className="select-dropdown__active-item">{value}</span>
				<button className='select-dropdown__arrow _icon-arrDown'></button>
			</div>
			<div
				onMouseEnter={() => showDropdown(true)}
				onMouseMove={() => showDropdown(true)}
				onMouseLeave={() => showDropdown(false)}
				className="dropdown__list list-dropdown">
				{options.map(item => {
					return <div key={item.value} className='list-dropdown__item' onClick={() => hideDropdown(item.value)}>{item.name}</div>
				})}
			</div>
		</div>

		// <select value={value} onChange={e => onChange(e)}>
		// 	{options.map((item) => {
		// 		return <option key={item.value} value={item.value}>{item.name}</option>
		// 	})}
		// </select>

	)
}

export default Select