import React, { FC, useState } from 'react'
import KanbanAddField from '../../components/kanban/KanbanAddField';
import KanbanProject from '../../models/kanbanModels/KanbanProject'

interface KanbanProjectsTabsProps {
	kanbProjects: KanbanProject[];
	addProject: (nameProject: string) => void
	
	activeProjectId: number | null;
	setActiveProjectId: (id: number) => void
}

const KanbanProjectsTabs: FC<KanbanProjectsTabsProps> = ({ addProject, kanbProjects, activeProjectId, setActiveProjectId }) => {
	const [nameProject, setNameProject] = useState('')
	const [nameInpVisible, setNameInpVisible] = useState(false)

	function hideField() {
		setNameInpVisible(false)
		setNameProject('')
	}

	return (
		<div className='kanban__tabs tabs-kanban'>
			<div className="tabs-kanban__names">
				{kanbProjects && kanbProjects.map(proj => {
					return (
						<button className={proj.id === activeProjectId ? 'tabs-kanban__item tab-active' : 'tabs-kanban__item'} key={proj.id} onClick={() => setActiveProjectId(proj.id)}>{proj.name}</button>
					)
				})}
			</div>
			<div className="tabs-kanban__add add-tabs">
				{nameInpVisible && <KanbanAddField className='add-tabs__field' value={nameProject} setValue={setNameProject} fn={() => { addProject(nameProject); hideField() }} />}
				<button className='add-tabs__open btn-bgnone' onClick={e => setNameInpVisible(!nameInpVisible)}>{nameInpVisible ? 'Закрыть' : '+Проект'}</button>
			</div>
		</div>
	)
}

export default KanbanProjectsTabs