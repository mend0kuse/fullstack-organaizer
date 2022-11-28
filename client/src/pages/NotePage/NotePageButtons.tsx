import { OutputData } from '@editorjs/editorjs';
import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import { AuthToken } from '../../context/authContext';
import { useAppDispatch } from '../../hooks/redux/reduxHooks';
import Note from '../../models/notebookModels/Note';
import { notebookApi } from '../../services/notebookService';
import { addNote, deleteeeNote, saveNote } from '../../store/store';
import { ButtonTypes } from '../../types/KanbanTypes';

interface NotePageButtonsProps {
	id: string | undefined;
	note: Note | undefined;
	handleSave: () => Promise<OutputData | undefined>;
	title: string;
}


const NotePageButtons: FC<NotePageButtonsProps> = ({ id, handleSave, note, title }) => {
	const router = useNavigate()
	const { jwtToken } = useContext(AuthToken)

	const dispatch = useAppDispatch()

	const [createNote] = notebookApi.useCreateNoteMutation()
	const [updateNote] = notebookApi.useUpdateNoteMutation()
	const [deleteNote] = notebookApi.useDeleteNoteMutation()


	function createNoteHandler() {
		handleSave()
			.then(async (savedData) => {
				const newNote = savedData as Note
				if (jwtToken) {
					await createNote([newNote, title, jwtToken]).unwrap().then(note => router(`/notepage/${note.time}`))
				} else {
					dispatch(addNote({ ...newNote, title }))
					router(`/notepage/${newNote.time}`)
				}
			})
	}
	function updateNoteHandler() {
		handleSave()
			.then(async (savedData) => {
				const newNote = savedData as Note
				if (note) {
					jwtToken
						? await updateNote([note.time, newNote.blocks, title, jwtToken])
						: dispatch(saveNote({ time: note.time, blocks: newNote.blocks, title }))
				}
			})
	}
	async function deleteNoteHandler() {
		if (note) {
			jwtToken
				? await deleteNote([note.time, jwtToken])
				: dispatch(deleteeeNote(note.time))
		}
		router('/notebook')
	}

	return (
		<div className='note__buttons'>
			{id
				?
				<>
					<Button type={ButtonTypes.BG_BLUE} onClick={updateNoteHandler}>Обновить </Button>
					<Button type={ButtonTypes.BG_BLUE} onClick={deleteNoteHandler} >Удалить </Button>
				</>

				: <Button type={ButtonTypes.BG_BLUE} onClick={createNoteHandler}>Сохранить </Button>
			}
		</div>
	)
}

export default NotePageButtons