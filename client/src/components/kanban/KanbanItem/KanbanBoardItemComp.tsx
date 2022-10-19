import React, { FC, useEffect, useRef, useState } from 'react'
import KanbanBoard from '../../../models/kanbanModels/KanbanBoard';
import KanbanBoardItem, { KanbanBoardItemLogic } from '../../../models/kanbanModels/KanbanBoardItem'
import './KanbanItem.scss'
import { CSSTransition } from 'react-transition-group';

import edit from '../../../img/edit.svg'
import trash from '../../../img/Trash.svg'
import pin from '../../../img/Pin.svg'

interface BoardItemProps {
	item: KanbanBoardItem;
	board: KanbanBoard;

	getItemToUpdate: (i: KanbanBoardItem) => void

	currentBoard: KanbanBoard | undefined
	setCurrentBoard: (b: KanbanBoard) => void
	setBoardAdd: (b: KanbanBoard) => void

	currentItem: KanbanBoardItem | undefined
	setCurrentItem: (i: KanbanBoardItem) => void

	boards: KanbanBoard[];
	setBoards: (arr: KanbanBoard[]) => void;
}

const KanbanBoardItemComp: FC<BoardItemProps> = ({ getItemToUpdate, item, board, boards, setBoards, currentBoard, currentItem, setCurrentBoard, setBoardAdd, setCurrentItem }) => {
	const itemLogic = new KanbanBoardItemLogic()

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
				{(hover || pinned)
					&& <button className='task-board__pin' onClick={() => addOrRemovePin()}><img src={pin} alt="" /></button>
				}
				<div className='task-board__info info-task'>
					<p className='info-task__direction'>{item.info.direction}</p>
					<p className='info-task__title'>{item.info.title}</p>
					<p className='info-task__description'>{item.info.description}</p>
				</div>
				{hover &&
					<div className="task-board__btns btns-task">
						<button className='task-board__edit' onClick={() => getItemToUpdate(item)}>
							<img src={edit} alt="" />
						</button>
						<button className='task-board__delete' onClick={e => delItem(e)}>
							<img src={trash} alt="" />
						</button>
					</div>}
			</div>
		</CSSTransition>
	)
}

export default KanbanBoardItemComp