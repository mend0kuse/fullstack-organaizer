import Tippy from '@tippyjs/react'
import React, { FC, memo } from 'react'
import KanbanBoard from '../../../models/kanbanModels/KanbanBoard'

interface KanbanBoardHeadProps {
	board: KanbanBoard;
	addItemModalShow: () => void
	delDesk: (id: number) => void
}

const KanbanBoardHead: FC<KanbanBoardHeadProps> = memo(({ board, addItemModalShow, delDesk }) => {

	return (
		<div className={`board-project__head head-board ${board.headBg}`} >
			<button className='head-board__delete _icon-Trash' onClick={() => delDesk(board.id)}></button>
			<Tippy content={board.name} theme="light" >
				<h2 className='head-board__name'>
					<span>{board.name}</span>
				</h2>
			</Tippy>
			<button className='head-board__add' onClick={addItemModalShow}>+</button>
		</div>
	)
})

export default KanbanBoardHead