import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthToken } from '../../context/authContext'
import { authService } from '../../services/authService'

import anon from '../../img/Anon1.jpg'

import './Lk.scss'

const Lk = () => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)


	const { data, isSuccess, isError } = authService.useUserInfoQuery(jwtToken)

	const [imgSrc, setImgSrc] = useState('')


	const [sendAvatar, info] = authService.useSendAvatarMutation()

	const [uploadFile, setUploadFile] = useState<FileList | null>(null);

	useEffect(() => {
		if (data?.avatar) {
			setImgSrc(data.avatar)
		}
	}, [data])




	const uploadAvatar = async () => {
		let formData = new FormData()
		if (uploadFile) {

			if (data?._id) {
				formData.append('file', uploadFile[0], `${data._id}_avatar.png`)
				formData.append('_id', data._id)
			}

			await sendAvatar(formData)
		}

	}

	return (
		<div className='lk__container'>
			{isError && <h1>АВТОРИзуйтесь</h1>}
			{isSuccess &&
				<form className='lk__profile'>
					<h1>ПРивет {data.username}</h1>
					{isSuccess && data.avatar
						? <img src={'http://localhost:5000/images/' + imgSrc} className='avatar' alt="sdf" />

						: <img src={anon} className='avatar' alt=''></img>
					}
					<input type="file"
						onChange={(e) => setUploadFile(e.target.files)} />
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