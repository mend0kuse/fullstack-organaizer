import React, { FC } from 'react'
import './buttons.scss'

export interface ButtonProps {
	onClick?: (e: React.FormEvent) => void;
	children: React.ReactNode;
	type: string;
	[x: string]: any;
}

const Button: FC<ButtonProps> = ({ type, children, ...props }) => {
	const rootClass = [type]
	if (props.className) {
		rootClass.push(props.className)
	}

	return (
		<button {...props} className={rootClass.join(' ')}>{children}</button>
	)
}

export default Button