import React, { FC, memo } from 'react'
import KanbanTask from '../../../models/kanbanModels/KanbanTask'

interface TaskButtonsProps {
	getItemToUpdate: (item: KanbanTask) => void
	delItem: (e: React.MouseEvent<HTMLButtonElement>) => void
	item: KanbanTask
}

const TaskButtons: FC<TaskButtonsProps> = memo(({ delItem, getItemToUpdate, item }) => {
	return (
		<div className="task-board__btns btns-task">
			<button className='btns-task__edit _icon-edit' onClick={() => getItemToUpdate(item)}></button>
			<button className='btns-task__delete _icon-Trash' onClick={e => delItem(e)}></button>
		</div>
	)
})

export default TaskButtons