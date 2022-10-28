import { useEffect, useState } from "react"

export interface ValidationTypes {
	isEmail?: RegExp
	isEmpty?: boolean,
	isPass?: RegExp
}

export const useValidation = (value: string, validations: ValidationTypes) => {
	const [isEmpty, setEmpty] = useState(true)
	const [err, setErr] = useState('')

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'isEmpty':
					if (value) {
						setEmpty(false)
						setErr('')
					} else {
						setEmpty(true)
						setErr('Поле не может быть пустым')
					}
					break;
				case 'isEmail':
					!validations[validation]?.test(String(value).toLowerCase()) ? setErr('Email неккоректен') : setErr('')
					break;
				case 'isPass':
					!validations[validation]?.test(String(value).toLowerCase()) ? setErr('Пароль неккоректен') : setErr('')
					break;
			}
		}
	}, [value])

	return { isEmpty, err }

}