import React, { FC, memo } from 'react'
import KanbanTask from '../../../models/kanbanModels/KanbanTask'

interface TaskInfoProps {
	item: KanbanTask
}

const TaskInfo: FC<TaskInfoProps> = memo(({ item }) => {
	return (
		<div className='task-board__info info-task'>
			<p className='info-task__direction'>{item.info.direction}</p>
			<p className='info-task__title'>{item.info.title}</p>
			<p className='info-task__description'>{item.info.description}</p>
		</div>
	)
})

export default TaskInfo