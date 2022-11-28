import React, { FC, memo } from 'react'
import { NoteBlock } from '../../models/notebookModels/Note';

interface EditorProps {
	blocks?: NoteBlock[]
}

const Editor: FC<EditorProps> = memo(({ blocks }) => {
	return (
		<></>
	)
})

export default Editor