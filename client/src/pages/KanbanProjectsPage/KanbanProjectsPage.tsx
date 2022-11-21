import React, { FC, memo, useContext, useEffect, useState } from 'react'
import Kanban from '../../components/kanban/kanbanProject/KanbanProject'
import KanbanProject from '../../models/kanbanModels/KanbanProject'
import './KanbanProjectsPage.scss'

import { kanbanApi } from '../../services/kanbanApi'
import { AuthToken } from '../../context/authContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { addKanbProject } from '../../store/store'
import KanbanProjectsTabs from './KanbanProjectsTabs'
import { authService } from '../../services/authService'


const KanbanProjectsPage: FC = memo(() => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)
	const { data: user } = authService.useUserInfoQuery(jwtToken)

	const projects = useAppSelector((state) => state.kanban.projects)
	const dispatch = useAppDispatch()

	const { data, refetch } = kanbanApi.useGetProjectsQuery(jwtToken) //получение с базы проектов
	const [createProj, asd] = kanbanApi.useCreateProjectMutation() // функция создания проекта в базу данных

	useEffect(() => { refetch() }, [jwtToken])

	//ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН,ТО ПРОЕКТЫ С БАЗЫ,ЕСЛИ НЕТ,ТО РАБОТАЕТ С ПРОЕКТАМИ С РЕДАКСА
	const kanbProjects = data
		? data.map(i => new KanbanProject(i.id, i.name, i.boards, i.messages))
		: projects.map(i => new KanbanProject(i.id, i.name, i.boards, i.messages))

	const [activeProjectId, setActiveProjectId] = useState<number | null>(null)

	const addProject = async (nameProject: string) => {
		const newProj = new KanbanProject(Date.now(), nameProject, [], [])

		jwtToken ? await createProj([newProj, jwtToken]) : dispatch(addKanbProject(newProj))

		setActiveProjectId(newProj.id)
	}


	return (
		<div className='kanban__container'>
			<h2 className='sect-title kanban__title'>Канбан-проекты</h2>
			<KanbanProjectsTabs activeProjectId={activeProjectId} addProject={addProject} kanbProjects={kanbProjects} setActiveProjectId={setActiveProjectId} />
			{kanbProjects && kanbProjects.map(project => {
				if (project.id === activeProjectId) {
					return <Kanban username={user && user.username} project={project} key={project.id} setActiveProjectId={setActiveProjectId} projects={kanbProjects} />
				}
			})}
		</div>
	)
})

export default KanbanProjectsPage