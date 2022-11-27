import React, { useContext } from 'react'

import './Notebook.scss'
import { notebookApi } from '../../services/notebookService';
import { AuthToken } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Notebook = () => {
	const router = useNavigate()

	const { jwtToken, setJwtToken } = useContext(AuthToken)
	const { data: notes } = notebookApi.useGetNotesQuery(jwtToken)

	return (
		<div className="notebook__container">
			<button onClick={() => router('/notepage')}>Создать</button>
			
			{notes && notes.map(note => {
				return (
					<div className="note" onClick={() => router(`/notepage/${note._id}`)} >
						{note.time}
					</div>
				)
			})}
			
		</div >

	)
}

export default Notebook