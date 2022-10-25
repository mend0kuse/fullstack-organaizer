import React, { useContext, useRef, useState } from 'react'
import { AuthToken } from '../../context/authContext'
import { authService } from '../../services/authService'

import anon from '../../img/Anon1.jpg'

import './Lk.scss'

const Lk = () => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)
	const { data, isSuccess, isError } = authService.useUserInfoQuery(jwtToken)

	const [sendAvatar] = authService.useSendAvatarMutation()

	const [uploadFile, setUploadFile] = useState<FileList | null>(null);

	const uploadAvatar = async () => {
		console.log(uploadFile);
		await sendAvatar(uploadFile)
	}

	return (
		<div className='lk__container'>
			{isError && <h1>АВТОРИзуйтесь</h1>}
			{isSuccess &&
				<form className='lk__profile'>
					<h1>ПРивет {data.username}</h1>
					{data.avatar
						? <img src={data.avatar} className='avatar' alt="" />
						: <div className='avatar'></div>
					}
					<input type="file" onChange={(e) => setUploadFile(e.target.files)} />
					<button onClick={e => {
						e.preventDefault()
						uploadAvatar()
					}
					}>Поставить аватар</button>
				</form>
			}
		</div>
	)
}

export default Lk