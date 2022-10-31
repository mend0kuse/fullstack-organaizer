import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import InputWithUp from '../../components/UI/input/InputWithUp'
import { useInput } from '../../hooks/validation/useInput'
import { authService } from '../../services/authService'
import { ButtonTypes } from '../../types/KanbanTypes'
import './Registration.scss'


const Registration = () => {
	const pagesRouter = useNavigate()

	const username = useInput('', { isEmpty: true })
	const password = useInput('', { isEmpty: true, isPass: /^(?=.*[0-9])(?=.*[!@#+$%^&*])[a-zA-Z0-9!@#+$%^&*]{6,16}$/ })
	const [formValid, setFormValid] = useState(false)


	const [sendRegister, registerInfo] = authService.useRegistrationMutation()

	async function register() {
		await sendRegister({ username: username.value, password: password.value })
			.unwrap()
			.then(resolve => pagesRouter('/login'))
			.catch(reject => alert(reject.data.message))
	}

	useEffect(() => {
		username.err || password.err ? setFormValid(false) : setFormValid(true)
	}, [username.err, password.err])


	return (
		<div className='reg__container'>
			<h1 className='sect-title'>Регистрация</h1>
			<form className='reg__form form-reg'>
				<div className="form-reg__username">
					{(username.isDirty && username.err) && <div style={{ color: "red" }}>{username.err}</div>}
					<InputWithUp onChange={e => username.onChange(e)} value={username.value} onBlur={() => username.onBlur()} placeholder='Введите username' type='text' name='username' />
				</div>
				<div className="form-reg__username">
					{(password.isDirty && password.err) && <div style={{ color: "red" }}>{password.err}</div>}
					<InputWithUp value={password.value} onChange={e => password.onChange(e)} onBlur={() => password.onBlur()} placeholder='Введите пароль' type='password' name='password' />
				</div>
				<Button type={ButtonTypes.BG_BLUE} disabled={!formValid} onClick={e => { e.preventDefault(); register() }}>Регистрация</Button>
			</form>
		</div>

	)
}

export default Registration 