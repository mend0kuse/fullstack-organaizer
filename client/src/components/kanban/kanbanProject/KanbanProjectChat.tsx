import React, { FC, useContext, useMemo, useState } from 'react'
import { io } from 'socket.io-client';
import { AuthToken } from '../../../context/authContext';
import { ChatMessage } from '../../../types/KanbanTypes';
import { convertDate } from '../../../utils/convertDate';

interface KanbanProjectChatProps {
	username: string | undefined
	projectId: number;
	messages: ChatMessage[];
}

const KanbanProjectChat: FC<KanbanProjectChatProps> = ({ projectId, messages, username }) => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)
	const [projMes, setProjMes] = useState(messages)
	const [chatMsg, setChatMsg] = useState('')

	const socket = useMemo(() => io(`http://localhost:5000?room=${projectId}`, { auth: { token: jwtToken } }), [jwtToken])
	socket.on('res msg', (response) => setProjMes([...projMes, response.msg]))

	const addMessage = () => {
		if (username) {
			setProjMes([...projMes, { username, content: chatMsg, date: Date.now() }])
			socket.emit('send msg', { id: projectId, msg: { content: chatMsg, date: Date.now() } })
			setChatMsg('')
		}

	}

	return (
		<div className='project-kanban__chat chat-kanban' >
			<div className='chat-kanban__inner'>
				{projMes.map((mess, index) => {
					console.log();

					return (
						<div key={index}>
							<p>Ник:{mess.username}</p>
							<p>Сообщение:{mess.content}</p>
							<p>Дата:{convertDate(new Date(mess.date))}</p>
						</div>
					)
				})}
			</div>
			<input type="text" value={chatMsg} onChange={e => setChatMsg(e.target.value)} />
			<button onClick={addMessage}>Отправить</button>
		</div>
	)
}

export default KanbanProjectChat