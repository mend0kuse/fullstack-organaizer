import React, { memo, useContext, useEffect, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { useParams } from 'react-router-dom'
import { AuthToken } from '../../context/authContext'
import { notebookApi } from '../../services/notebookService'
import './NotePage.scss'

import Input from '../../components/UI/input/Input';
import { editorTools } from '../../utils/editorzConfig'
import { useEditorConfig } from '../../hooks/editor/useEditorConfig'
import NotePageButtons from './NotePageButtons'
import { useAppSelector } from '../../hooks/redux/reduxHooks'

const NotePage = memo(() => {

	const params = useParams() //Если есть id, то логика для обновления/удаления, если нет,то для создания

	const { jwtToken } = useContext(AuthToken)

	const noteRedux = useAppSelector(state => state.notes.notes.find(i => i.time.toString() === params.id))
	const { data, isFetching } = notebookApi.useGetNoteByIdQuery([jwtToken, params.id ? params.id : 'null'])

	const note = data ? data : noteRedux

	const ReactEditorJS = createReactEditorJS()
	const { handleSave, handleInitialize } = useEditorConfig()

	const [title, setTitle] = useState('')

	useEffect(() => {
		if (note)
			setTitle(note.title)
	}, [note])


	return (
		<div className='note__container'>

			<Input type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder='Введите название' />
			<NotePageButtons id={params.id} handleSave={handleSave} note={note} title={title} ></NotePageButtons>
			{!isFetching &&
				<ReactEditorJS
					inlineToolbar
					defaultValue={note}
					tools={editorTools}
					onInitialize={handleInitialize}
					placeholder='Let`s write an awesome story!'
					holder="editorjs">
					<div id="editorjs" />
				</ReactEditorJS>}


		</div>
	)
})

export default NotePage