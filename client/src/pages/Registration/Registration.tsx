import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks/validation/useInput'
import { authService } from '../../services/authService'
import './Registration.scss'


const Registration = () => {
	const pagesRouter = useNavigate()
	const username = useInput('', { isEmpty: true })
	const password = useInput('', { isEmpty: true, isPass: /^(?=.*[0-9])(?=.*[!@#+$%^&*])[a-zA-Z0-9!@#+$%^&*]{6,16}$/ })

	const [sendRegister, registerInfo] = authService.useRegistrationMutation()

	const [formValid, setFormValid] = useState(false)

	async function register() {
		await sendRegister({ username: username.value, password: password.value })
			.unwrap()
			.then(resolve => pagesRouter('/login'))
			.catch(reject => alert(reject.data.message))
	}

	useEffect(() => {
		if (username.err || password.err) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [username.err, password.err])


	return (
		<form className='reg__form'>
			<h1>Регистрация</h1>

			{(username.isDirty && username.err) && <div style={{ color: "red" }}>{username.err}</div>}
			<input onChange={e => username.onChange(e)} value={username.value} onBlur={e => username.onBlur(e)} placeholder='Введите username' type='text' name='username' />

			{(password.isDirty && password.err) && <div style={{ color: "red" }}>{password.err}</div>}
			<input value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} placeholder='Введите пароль' type='password' name='password' />

			<button type='submit' disabled={!formValid} onClick={e => {
				e.preventDefault()
				register()
			}}>Регистрация</button>
		</form>
	)
}

export default Registration