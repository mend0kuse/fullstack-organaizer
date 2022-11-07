import React, { FC, memo, useContext, useState } from 'react'
import Kanban from '../../components/kanban/kanbanProject/KanbanProject'
import KanbanProject from '../../models/kanbanModels/KanbanProject'
import './KanbanProjectsPage.scss'

import { kanbanApi } from '../../services/kanbanApi'
import { AuthToken } from '../../context/authContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { addKanbProject } from '../../store/store'
import KanbanProjectsTabs from './KanbanProjectsTabs'

const KanbanProjectsPage: FC = memo(() => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const projects = useAppSelector((state) => state.kanban.projects)
	const dispatch = useAppDispatch()

	const { data, isError } = kanbanApi.useGetProjectsQuery(jwtToken) //получение с базы проектов
	const [createProj, asd] = kanbanApi.useCreateProjectMutation() // функция создания проекта в базу данных

	const kanbProjects = data ? data.map(i => new KanbanProject(i.id, i.name, i.boards)) : projects.map(i => new KanbanProject(i.id, i.name, i.boards))

	//ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН,ТО ПРОЕКТЫ С БАЗЫ,ЕСЛИ НЕТ,ТО РАБОТАЕТ С ПРОЕКТАМИ С РЕДАКСА
	const [activeProjectId, setActiveProjectId] = useState<number | null>(null)

	const addProject = async (nameProject: string) => {
		const newProj = new KanbanProject(Date.now(), nameProject, [])
		if (jwtToken) {
			await createProj(newProj)
		} else {
			dispatch(addKanbProject(newProj))
		}
		setActiveProjectId(newProj.id)
	}


	return (
		<div className='kanban__container'>
			<h2 className='sect-title kanban__title'>Канбан-проекты</h2>
			<KanbanProjectsTabs activeProjectId={activeProjectId} addProject={addProject} kanbProjects={kanbProjects} setActiveProjectId={setActiveProjectId} />
			{kanbProjects && kanbProjects.map(project => {
				if (project.id === activeProjectId) {
					return <Kanban project={project} key={project.id} setActiveProjectId={setActiveProjectId} projects={kanbProjects} />
				}
			})}
		</div>
	)
})

export default KanbanProjectsPage