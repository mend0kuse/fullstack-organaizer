import React, {forwardRef } from 'react'
import './input.scss'

interface InputProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	[x: string]: any;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
	const rootClass = ['my-inp']

	if (props.className) {
		rootClass.push(props.className)
	}

	return ref
		? <input {...props} ref={ref} className={rootClass.join(' ')} />
		: <input {...props} className={rootClass.join(' ')} />
})

export default Input