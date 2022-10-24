import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import Kanban from '../../components/kanban/kanbanProject/KanbanProject'
import KanbanProject from '../../models/kanbanModels/KanbanProject'
import './KanbanProjectsPage.scss'

import KanbanAddField from '../../components/kanban/KanbanAddField'
import { kanbanApi } from '../../services/kanbanApi'
import { AuthToken } from '../../context/authContext'

const KanbanProjectsPage: FC = () => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const { data } = kanbanApi.useGetProjectsQuery(jwtToken) //получение с базы проектов
	const [createProj, asd] = kanbanApi.useCreateProjectMutation() // функция создания проекта из kanbanApi


	const kanbProjects = data?.map((i, index) => {
		return new KanbanProject(i.id, i.name, i.boards)
	})

	const [activeProjectId, setActiveProjectId] = useState<number>() //id открытого проекта
	const [nameProject, setNameProject] = useState('') // название проекта
	const [nameInp, setNameInp] = useState(false) //видимость поля ввода имени проекта

	const addProject = useCallback(
		async () => {
			if (nameProject.length !== 0) {
				const newProj = new KanbanProject(Date.now(), nameProject, [])
				await createProj(newProj).unwrap().then(response => setActiveProjectId(response.id))
				hideField()
			}
		}, [nameProject])


	function hideField() {
		// setActiveProjectId(info.data?.id)
		setNameInp(false)
		setNameProject('')
	}

	return (
		<div className='kanban__container'>
			<h2 className='sect-title kanban__title'>Канбан-проекты</h2>
			<div className='kanban__tabs tabs-kanban'>
				<div className="tabs-kanban__names">
					{kanbProjects && kanbProjects.map(proj => {
						return (
							<button className={proj.id === activeProjectId ? 'tabs-kanban__item tab-active' : 'tabs-kanban__item'} key={proj.id} onClick={e => setActiveProjectId(proj.id)}>{proj.name}</button>
						)
					})}
				</div>
				<div className="tabs-kanban__add add-tabs">
					{nameInp && <KanbanAddField className='add-tabs__field' value={nameProject} setValue={setNameProject} fn={addProject} />}
					<button className='add-tabs__open btn-bgnone' onClick={e => setNameInp(!nameInp)}>{nameInp ? 'Закрыть' : '+Проект'}</button>
				</div>
			</div>
			{kanbProjects && kanbProjects.map(project => {
				if (project.id === activeProjectId) {
					return <Kanban project={project} key={project.id} setActiveProjectId={setActiveProjectId} projects={kanbProjects} />
				}
			})}
		</div>
	)
}

export default KanbanProjectsPage