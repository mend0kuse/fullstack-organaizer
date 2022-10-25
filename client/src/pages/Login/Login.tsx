import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthToken, TokenContext } from '../../context/authContext'
import { authService } from '../../services/authService'
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
			<input type="text" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} />
			<input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
			<button onClick={e => {
				e.preventDefault()
				log()
			}}>Войти</button>
		</form>
	)
}

export default Login