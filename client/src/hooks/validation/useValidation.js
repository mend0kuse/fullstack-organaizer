import { useEffect, useState } from "react"

export const useValidation = (value, validations) => {
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
						return
					}
					break;
				case 'isEmail':
					if (!validations[validation].test(String(value).toLowerCase())) {
						setErr('Email неккоректен')
					} else {
						setErr('')
					}
					break;
				case 'isPass':
					if (!validations[validation].test(String(value).toLowerCase())) {
						setErr('Пароль неккоректен')
					} else {
						setErr('')
					}
					break;
			}
		}

	}, [value])

	return { isEmpty, err }

}