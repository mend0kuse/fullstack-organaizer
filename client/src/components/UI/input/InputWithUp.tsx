import React, { FC } from 'react'
import Input from './Input'

import './input.scss'

interface InputWithUpProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	placeholder: string;
	[x: string]: any;
}

const InputWithUp: FC<InputWithUpProps> = ({ className, placeholder, ...props }) => {

	const rootClass = ['inp-up']
	if (className) {
		rootClass.push(className)
	}


	return (
		<div className={rootClass.join(' ')}>
			<Input type="text" className="inp-up__text" required {...props} />
			<span className="inp-up__label">{placeholder}</span>
		</div>
	)
}

export default InputWithUp