import React, { FC } from 'react'
import KanbanBoard from '../../../models/kanbanModels/KanbanBoard';
import KanbanBoardItem, { KanbanBoardItemLogic } from '../../../models/kanbanModels/KanbanBoardItem';
import { BoardItemDesc, ButtonTypes, FormsTypes } from '../../../types/KanbanTypes'
import Button from '../../UI/button/Button';
import InputWithUp from '../../UI/input/InputWithUp';
import './kanabanForms.scss'

interface ItemFormProps {

	itemToUpdate?: KanbanBoardItem | null;
	typeForm: FormsTypes | undefined;

	itemDesc: BoardItemDesc;

	setItemDesc: (i: BoardItemDesc) => void;

	addItem: (board: KanbanBoard) => void
	updateItem: () => void
	board: KanbanBoard | undefined;
}

const KanbanItemForm: FC<ItemFormProps> = ({ itemToUpdate, board, typeForm, addItem, itemDesc, setItemDesc, updateItem }) => {

	const itemLogic = new KanbanBoardItemLogic()

	function create(e: React.FormEvent) {
		e.preventDefault()
		if (board) {
			addItem(board)
		}
	}

	function update(e: React.FormEvent) {
		e.preventDefault()
		if (itemToUpdate) {
			itemLogic.update(itemToUpdate, itemDesc)
		}
		if (updateItem && board) {
			updateItem()
		}
	}

	return (
		<form className='kanban-form'>
			<InputWithUp type='text' placeholder='Название' value={itemDesc.title} onChange={e => setItemDesc({ ...itemDesc, title: e.target.value })} />
			<InputWithUp type='text' placeholder='Описание' value={itemDesc.description} onChange={e => setItemDesc({ ...itemDesc, description: e.target.value })} />
			<InputWithUp type='text' placeholder='Направление' value={itemDesc.direction} onChange={e => setItemDesc({ ...itemDesc, direction: e.target.value })} />
			<Button type={ButtonTypes.BG_BLUE} onClick={typeForm === FormsTypes.ADD ? e => create(e) : e => update(e)}>{typeForm === FormsTypes.ADD ? 'Создать' : 'Обновить'}</Button>
		</form >
	)
}

export default KanbanItemForm