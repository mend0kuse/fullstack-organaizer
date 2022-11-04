import React, { FC } from 'react'
import './input.scss'

interface InputProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	[x: string]: any;
}

const Input: FC<InputProps> = ({ ...props }) => {
	const rootClass = ['my-inp']
	
	if (props.className) {
		rootClass.push(props.className)
	}

	return (
		<input {...props} className={rootClass.join(' ')} />
	)
}

export default Input