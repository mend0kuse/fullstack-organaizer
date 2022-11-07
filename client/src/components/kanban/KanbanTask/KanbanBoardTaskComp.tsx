import React, { FC, memo, useEffect, useRef, useState } from 'react'
import KanbanBoard from '../../../models/kanbanModels/KanbanBoard';
import './KanbanItem.scss'
import { CSSTransition } from 'react-transition-group';

import KanbanTask, { KanbanTaskLogic } from '../../../models/kanbanModels/KanbanTask';
import TaskInfo from './TaskInfo';
import TaskButtons from './TaskButtons';

interface BoardTaskProps {
	item: KanbanTask;
	board: KanbanBoard;

	getItemToUpdate: (i: KanbanTask) => void

	currentBoard: KanbanBoard | null
	setCurrentBoard: (b: KanbanBoard) => void
	setBoardAdd: (b: KanbanBoard) => void

	currentItem: KanbanTask | null
	setCurrentItem: (i: KanbanTask) => void

	boards: KanbanBoard[];
	setBoards: (arr: KanbanBoard[]) => void;
}

const KanbanBoardTaskComp: FC<BoardTaskProps> = memo(({ getItemToUpdate, item, board, boards, setBoards, currentBoard, currentItem, setCurrentBoard, setCurrentItem }) => {
	const itemLogic = new KanbanTaskLogic()

	const [anim, setAnim] = useState(false)

	function delItem(e: React.MouseEvent<HTMLButtonElement>) {
		setAnim(false)

		setTimeout(() => {
			e.stopPropagation()
			setBoards(boards.map(b => {
				if (b.id !== board.id) {
					return b
				}
				let asd = board.items.filter(i => i.id !== item.id)
				board.items = asd
				return board
			}))
		}, 200)
	}

	const [hover, setHover] = useState(false)
	const [pinned, setPinned] = useState(item.pinned)

	useEffect(() => {
		setAnim(true)
	}, [])

	return (
		<CSSTransition
			classNames='task-board'
			in={anim}
			mountOnEnter
			timeout={300}
		>
			<div
				className='inner-board__task task-board'
				draggable={true}
				onMouseEnter={e => setHover(true)}
				onMouseMove={e => setHover(true)}
				onMouseLeave={e => setHover(false)}
				onDragOver={(e) => itemLogic.dragOverHandler(e)}
				onDragStart={pinned ? e => e.preventDefault() : () => itemLogic.dragStartHandler(item, board, setCurrentBoard, setCurrentItem)}
				onDrop={(e) => itemLogic.dropHandler(e, board, item, currentBoard, currentItem, boards, setBoards)}
			>
				{(hover || pinned) && <button className={pinned ? 'task-board__pin pinned  _icon-Pin' : 'task-board__pin _icon-Pin'} onClick={() => setPinned(itemLogic.pin(item))}></button>}
				<TaskInfo item={item} />
				{hover && <TaskButtons delItem={delItem} getItemToUpdate={getItemToUpdate} item={item} />}
			</div>
		</CSSTransition>
	)
})

export default KanbanBoardTaskComp