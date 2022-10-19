import React, { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

import mark from '../../img/mark.svg'
import Input from '../UI/input/Input';

interface AddFieldProps {
	value: string;
	setValue: (value: string) => void;
	fn: () => void;
	className: string
}

const KanbanAddField: FC<AddFieldProps> = ({ className, value, setValue, fn }) => {
	const [anim, setAnim] = useState(false)

	useEffect(() => {
		setAnim(true)
	}, [])

	return (
		<CSSTransition mountOnEnter unmountOnExit in={anim} timeout={500} classNames={className}>
			<div className={className}>
				<Input value={value} placeholder='Введите название' onChange={e => setValue(e.target.value)} type="text" />
				<button onClick={e => {
					if (value.length !== 0) {
						setAnim(!anim)
						setTimeout(() => {
							fn()
						}, 500)
					}
				}}><img src={mark} alt="" /></button>
			</div>
		</CSSTransition>
	)
}

export default KanbanAddField