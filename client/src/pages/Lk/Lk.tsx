import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthToken } from '../../context/authContext'
import { authService } from '../../services/authService'

import anon from '../../img/Anon1.jpg'

import './Lk.scss'
import Button from '../../components/UI/button/Button'
import { ButtonTypes } from '../../types/KanbanTypes'

const Lk = () => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)
	const { data, refetch, isSuccess, isError } = authService.useUserInfoQuery(jwtToken)

	useEffect(() => { refetch() }, [jwtToken])

	const [sendAvatar, info] = authService.useSendAvatarMutation()
	const [uploadFile, setUploadFile] = useState<FileList | null>(null);

	const [acceptInvite] = authService.useAcceptInviteMutation()

	const uploadAvatar = async (e: React.FormEvent) => {
		e.preventDefault()
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
			<div>
				Уведомления:
				{data && data.notifications && data.notifications.map(not => {
					return (
						<div>
							<p>Приглашение от {not.from}</p>
							<p>В проект {not.project}</p>
							<button onClick={() => {
								if (not._id) acceptInvite([not._id, data._id])
							}} >Принять</button>
						</div>
					)
				})}
			</div>
			{isError && <h1>АВТОРИзуйтесь</h1>}
			{isSuccess &&
				<form className='lk__profile'>
					<h1>ПРивет {data.username}</h1>
					{data.avatar
						? <img src={'http://localhost:5000/images/' + data.avatar} className='avatar' alt="sdf" />
						: <img src={anon} className='avatar' alt=''></img>
					}
					<input type="file" onChange={(e) => setUploadFile(e.target.files)} />
					<Button type={ButtonTypes.BG_BLUE} onClick={uploadAvatar}>Поставить аватар</Button>
				</form>
			}
		</div>
	)
}

export default Lk