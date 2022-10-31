import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import InputWithUp from '../../components/UI/input/InputWithUp'
import { AuthToken, TokenContext } from '../../context/authContext'
import { authService } from '../../services/authService'
import { ButtonTypes } from '../../types/KanbanTypes'
import './Login.scss'

const Login = () => {
	const router = useNavigate()
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const [login, loginInfo] = authService.useLoginMutation()

	const [loginData, setLoginData] = useState({ username: '', password: '' })

	async function log() {
		await login(loginData)
			.unwrap()
			.then(resolve => {
				router('/lk')
				setJwtToken(resolve.token)
			})
			.catch(reject => alert(reject.data.message))
	}

	return (
		<form className='log-form' >
			<InputWithUp className='log-form__inp' placeholder='Логин' type="text" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} />
			<InputWithUp className='log-form__inp' placeholder='Пароль' type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
			<Button type={ButtonTypes.BG_BLUE} onClick={e => { e.preventDefault(); log() }}>Войти</Button>
		</form>
	)
}

export default Login