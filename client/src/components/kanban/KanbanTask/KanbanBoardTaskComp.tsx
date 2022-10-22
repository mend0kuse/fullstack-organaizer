import React, { FC, useEffect, useRef, useState } from 'react'
import KanbanBoard from '../../../models/kanbanModels/KanbanBoard';
import './KanbanItem.scss'
import { CSSTransition } from 'react-transition-group';

import KanbanTask, { KanbanTaskLogic } from '../../../models/kanbanModels/KanbanTask';

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

const KanbanBoardTaskComp: FC<BoardTaskProps> = ({ getItemToUpdate, item, board, boards, setBoards, currentBoard, currentItem, setCurrentBoard, setBoardAdd, setCurrentItem }) => {
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

	const addOrRemovePin = () => {
		if (pinned) {
			setPinned(false)
		} else {
			setPinned(true)
		}
		itemLogic.pin(item)
		setBoards(boards.map(b => b.id == board.id ? board : b))
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
				onDragStart={pinned ? e => e.preventDefault() : (e) => itemLogic.dragStartHandler(item, board, setCurrentBoard, setCurrentItem)}
				onDrop={(e) => itemLogic.dropHandler(e, board, item, currentBoard, currentItem, boards, setBoards)}
			>
				{(hover || pinned) && <button className={pinned ? 'task-board__pin pinned  _icon-Pin' : 'task-board__pin _icon-Pin'} onClick={() => addOrRemovePin()}></button>}
				<div className='task-board__info info-task'>
					<p className='info-task__direction'>{item.info.direction}</p>
					<p className='info-task__title'>{item.info.title}</p>
					<p className='info-task__description'>{item.info.description}</p>
				</div>
				{hover &&
					<div className="task-board__btns btns-task">
						<button className='btns-task__edit _icon-edit' onClick={() => getItemToUpdate(item)}>
						</button>
						<button className='btns-task__delete _icon-Trash' onClick={e => delItem(e)}>
						</button>
					</div>}
			</div>
		</CSSTransition>
	)
}

export default KanbanBoardTaskComp