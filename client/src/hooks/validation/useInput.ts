import { useState } from "react"
import { useValidation, ValidationTypes } from "./useValidation"

export const useInput = (initialValue: string, validations: ValidationTypes) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setDirty] = useState(false)

	const valid = useValidation(value, validations)

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const onBlur = () => {
		setDirty(true)
	}

	return { isDirty, value, onChange, onBlur, ...valid }
}