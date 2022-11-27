import React, { useContext } from 'react'
import EditorJS from '@editorjs/editorjs';
import { useParams } from 'react-router-dom'
import { AuthToken } from '../../context/authContext'
import { notebookApi } from '../../services/notebookService'
import createEditor from '../../utils/createEditor';
import './NotePage.scss'
import Note from '../../models/notebookModels/Note';

const NotePage = () => {
	const params = useParams()

	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const [createNote] = notebookApi.useCreateNoteMutation()
	const { data: note, isSuccess, isError } = notebookApi.useGetNoteByIdQuery([jwtToken, params.id ? params.id : 'null'])

	let editor: EditorJS;

	if (isSuccess) {
		editor = createEditor('editorjs', note.blocks)
	}
	if (isError) {
		editor = createEditor('editorjs')
	}

	return (
		<div className='note__container'>
			<div id="editorjs">

			</div>

			{params.id
				? <button >Обновить</button>
				: <button onClick={() => { editor.save().then(savedData => createNote([savedData as Note, jwtToken])) }} >Создать</button>
			}

		</div>
	)
}

export default NotePage