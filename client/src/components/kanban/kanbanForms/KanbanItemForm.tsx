import React, { FC, memo } from 'react'
import KanbanBoard from '../../../models/kanbanModels/KanbanBoard';
import KanbanTask from '../../../models/kanbanModels/KanbanTask';
import { BoardItemDesc, ButtonTypes, FormsTypes } from '../../../types/KanbanTypes'
import Button from '../../UI/button/Button';
import InputWithUp from '../../UI/input/InputWithUp';
import './kanabanForms.scss'

interface ItemFormProps {

	itemToUpdate?: KanbanTask | null;
	typeForm: FormsTypes | undefined;

	itemDesc: BoardItemDesc;

	setItemDesc: (i: BoardItemDesc) => void;

	addItem: (board: KanbanBoard) => void
	updateItem: () => void
	board: KanbanBoard | undefined;
}

const KanbanItemForm: FC<ItemFormProps> = memo(({ itemToUpdate, board, typeForm, addItem, itemDesc, setItemDesc, updateItem }) => {

	function create(e: React.FormEvent) {
		e.preventDefault()
		if (board) {
			addItem(board)
		}
	}

	function update(e: React.FormEvent) {
		e.preventDefault()
		if (itemToUpdate && updateItem) {
			console.log(itemDesc);
			itemToUpdate.info = itemDesc
			updateItem()
		}
	}

	return (
		<form className='kanban-form'>
			<InputWithUp type='text' className='black' placeholder='Название' value={itemDesc.title} onChange={e => setItemDesc({ ...itemDesc, title: e.target.value })} />
			<InputWithUp type='text' className='black' placeholder='Описание' value={itemDesc.description} onChange={e => setItemDesc({ ...itemDesc, description: e.target.value })} />
			<InputWithUp type='text' className='black' placeholder='Направление' value={itemDesc.direction} onChange={e => setItemDesc({ ...itemDesc, direction: e.target.value })} />
			<Button type={ButtonTypes.BG_BLUE} onClick={typeForm === FormsTypes.ADD ? e => create(e) : e => update(e)}>{typeForm === FormsTypes.ADD ? 'Создать' : 'Обновить'}</Button>
		</form >
	)
})

export default KanbanItemForm