import React, { useContext, useEffect } from 'react'

import { notebookApi } from '../../services/notebookService';
import { AuthToken } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux/reduxHooks';
import Note from '../../models/notebookModels/Note';
import './Notebook.scss'
import Button from '../../components/UI/button/Button';
import { ButtonTypes } from '../../types/KanbanTypes';

const Notebook = () => {
	const router = useNavigate()

	const { jwtToken } = useContext(AuthToken)
	const { data, refetch } = notebookApi.useGetNotesQuery(jwtToken)

	const notesRedux = useAppSelector(state => state.notes.notes)

	const notes: Note[] = data ? data : notesRedux

	return (
		<div className="notebook__container">
			<Button type={ButtonTypes.BG_BLUE} onClick={() => router('/notepage')}>Создать</Button>

			{notes && notes.map(note => {
				return (
					<div className="note" key={note.time} onClick={() => router(`/notepage/${note.time}`)} >
						{note.title}
					</div>
				)
			})}

		</div >

	)
}

export default Notebook