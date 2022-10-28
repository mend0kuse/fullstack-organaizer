import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import Kanban from '../../components/kanban/kanbanProject/KanbanProject'
import KanbanProject from '../../models/kanbanModels/KanbanProject'
import './KanbanProjectsPage.scss'

import KanbanAddField from '../../components/kanban/KanbanAddField'
import { kanbanApi } from '../../services/kanbanApi'
import { AuthToken } from '../../context/authContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { addKanbProject } from '../../store/store'

const KanbanProjectsPage: FC = () => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const projects = useAppSelector((state) => state.kanban.projects)
	const dispatch = useAppDispatch()

	const { data, isError } = kanbanApi.useGetProjectsQuery(jwtToken) //получение с базы проектов
	const [createProj, asd] = kanbanApi.useCreateProjectMutation() // функция создания проекта из в базу данных

	const kanbProjects = data ? data.map(i => new KanbanProject(i.id, i.name, i.boards)) : projects.map(i => new KanbanProject(i.id, i.name, i.boards))

	//ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН,ТО ПРОЕКТЫ С БАЗЫ,ЕСЛИ НЕТ,ТО РАБОТАЕТ С ПРОЕКТАМИ С РЕДАКСА

	const [activeProjectId, setActiveProjectId] = useState<number>() //id открытого проекта
	const [nameProject, setNameProject] = useState('') // название проекта
	const [nameInp, setNameInp] = useState(false) //видимость поля ввода имени проекта

	const addProject = async () => {
		if (nameProject.length !== 0) {
			const newProj = new KanbanProject(Date.now(), nameProject, [])
			if (jwtToken) {
				await createProj(newProj)
			} else {
				dispatch(addKanbProject(newProj))
			}
			setActiveProjectId(newProj.id)
			hideField()
		}
	}


	function hideField() {
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