import React, { FC, useEffect, useState } from 'react'
import KanbanBoard, { KanbanBoardLogic } from '../../../models/kanbanModels/KanbanBoard'
import KanbanBoardItem from '../../../models/kanbanModels/KanbanBoardItem';
import KanbanProject from '../../../models/kanbanModels/KanbanProject';
import { BoardItemDesc, FormsTypes } from '../../../types/KanbanTypes';
import KanbanBoardItemComp from '../KanbanItem/KanbanBoardItemComp';
import './KanbanBoard.scss'

import trashWhite from '../../../img/TrashWhite.svg'
import { CSSTransition } from 'react-transition-group';

interface BoardProps {

	setFormType: (x: FormsTypes) => void;

	setModalVisible: (x: boolean) => void
	setBoardAdd: (x: KanbanBoard) => void

	itemDesc: BoardItemDesc;
	setItemDesc: (i: BoardItemDesc) => void
	board: KanbanBoard;
	project: KanbanProject;

	currentBoard: KanbanBoard | undefined
	setCurrentBoard: (b: KanbanBoard) => void

	getItemToUpdate: (i: KanbanBoardItem) => void

	currentItem: KanbanBoardItem | undefined
	setCurrentItem: (i: KanbanBoardItem) => void

	boards: KanbanBoard[];
	setBoards: (arr: KanbanBoard[]) => void;

}

const KanbanBoardComp: FC<BoardProps> = ({ getItemToUpdate, setModalVisible, setFormType, setBoardAdd, itemDesc, setItemDesc, board, project, setCurrentBoard, setCurrentItem, currentBoard, boards, currentItem, setBoards }) => {

	const boardLogic = new KanbanBoardLogic()

	function addItemModalShow() {
		setItemDesc({ title: '', description: '', direction: '' })
		setFormType(FormsTypes.ADD)
		setBoardAdd(board)
		setModalVisible(true)
	}

	function delDesk(id: number) {
		setAnim(false)

		setTimeout(() => {
			setBoards(boards.filter(b => b.id !== id))
		}, 300)
	}



	const [anim, setAnim] = useState(false)

	useEffect(() => {
		setAnim(true)
	}, [])

	return (
		<div className='project-kanban__board board-project'>
			<CSSTransition in={anim} timeout={300} mountOnEnter classNames='head-board'>
				<div className={`board-project__head head-board ${board.headBg}`} >
					<button className='head-board__delete' onClick={() => delDesk(board.id)}><img src={trashWhite} alt="" /></button>
					<h2 className='head-board__name'><span> {board.name}</span></h2>
					<button className='head-board__add' onClick={addItemModalShow}>+</button>
				</div>
			</CSSTransition>
			<div
				key={board.id}
				onDragOver={e => boardLogic.dragOverHandler(e)}
				onDrop={e => boardLogic.dropCardHandler(e, board, currentBoard, currentItem, boards, setBoards)}
				className='board-project__inner inner-board' >
				{board.items.map(item =>
					<KanbanBoardItemComp key={item.id} getItemToUpdate={getItemToUpdate} board={board} boards={boards} setBoards={setBoards} setBoardAdd={setBoardAdd} currentBoard={currentBoard} currentItem={currentItem} item={item} setCurrentBoard={setCurrentBoard} setCurrentItem={setCurrentItem} />
				)}
			</div>

		</div >

	)
}

export default KanbanBoardComp