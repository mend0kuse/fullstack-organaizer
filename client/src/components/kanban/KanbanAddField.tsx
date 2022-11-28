import React, { FC, memo, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

import Input from '../UI/input/Input';

interface AddFieldProps {
	value: string;
	setValue: (value: string) => void;
	fn: () => void;
	className: string
}

const KanbanAddField: FC<AddFieldProps> = memo(({ className, value, setValue, fn }) => {
	const [anim, setAnim] = useState(false)

	useEffect(() => {
		setAnim(true)
	}, [])

	return (
		<CSSTransition mountOnEnter unmountOnExit in={anim} timeout={500} classNames={className}>
			<div className={className}>
				<Input placeholder='Введите название' value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} type="text" />
				<button className='_icon-mark' onClick={e => {
					if (value.length !== 0) {
						setAnim(!anim)
						setTimeout(() => {
							fn()
						}, 500)
					}
				}}></button>
			</div>
		</CSSTransition>
	)
})

export default KanbanAddField