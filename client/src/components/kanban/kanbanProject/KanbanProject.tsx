import React, { FC, memo, useContext, useMemo, useState } from 'react'
import KanbanBoard, { KanbanBoardLogic } from '../../../models/kanbanModels/KanbanBoard';
import KanbanBoardItem from '../../../models/kanbanModels/KanbanTask';
import KanbanProject from '../../../models/kanbanModels/KanbanProject';
import { BoardHeadColors, BoardItemDesc, ButtonTypes, FormsTypes } from '../../../types/KanbanTypes';
import Modal from '../../UI/modal/modal';

import './kanbanProject.scss'

import KanbanBoardComp from '../kanbanBoard/KanbanBoardComp';
import KanbanItemForm from '../kanbanForms/KanbanItemForm';
import KanbanAddField from '../KanbanAddField';
import Button from '../../UI/button/Button';
import { kanbanApi } from '../../../services/kanbanApi';
import KanbanTask from '../../../models/kanbanModels/KanbanTask';
import { AuthToken } from '../../../context/authContext';
import { useAppDispatch } from '../../../hooks/redux/reduxHooks';
import { deleteKanbProject, saveKanbProject } from '../../../store/store';
import KanbanProjectChat from './KanbanProjectChat';
import { authService } from '../../../services/authService';

interface KanbanProps {
	username?: string | undefined
	project: KanbanProject;
	projects: KanbanProject[];
	setActiveProjectId: (x: number) => void
}

const Kanban: FC<KanbanProps> = memo(({ project, projects, setActiveProjectId, username }) => {

	const { jwtToken, setJwtToken } = useContext(AuthToken)

	const dispatch = useAppDispatch()

	const [deleteProject] = kanbanApi.useDeleteProjectMutation() //запрос на удаление с бд
	const [saveProject] = kanbanApi.useUpdateProjectMutation() //запрос на обновление проекта в бд
	const [invite] = authService.useInviteToProjectMutation()

	const [boards, setBoards] = useState<KanbanBoard[]>(
		project.boards.map(b => {
			const items = b.items.map(i => new KanbanBoardItem(i.id, i.info, i.pinned))
			return new KanbanBoard(b.id, b.name, b.headBg, items)
		}
		))

	const [newDeskTitle, setNewDeskTitle] = useState('') //название новой доски
	const [newDeskInpVisible, setNewDeskInpVisible] = useState(false) //видимость инпута для создания новой доски

	const [itemDesc, setItemDesc] = useState<BoardItemDesc>({ title: '', description: '', direction: '' }) // описание итема

	const [currentBoard, setCurrentBoard] = useState<KanbanBoard | null>(null)//доска из которой тянут элемент
	const [currentItem, setCurrentItem] = useState<KanbanTask | null>(null)//элемент,который тянут

	const [modalVisible, setModalVisible] = useState(false) // видимость модалки

	const [boardAdd, setBoardAdd] = useState<KanbanBoard | undefined>() //доска в которую надо добавить

	const [formType, setFormType] = useState<FormsTypes>()
	const [itemToUpdate, setItemToUpdate] = useState<KanbanTask | null>(null)

	const [colorNumber, setColorNumber] = useState(0)

	function getColor() {
		setColorNumber(prev => prev + 1)
		if (colorNumber === 2) {
			setColorNumber(0)
		}
		const color = BoardHeadColors[colorNumber]
		return color
	}

	function addNewItem(board: KanbanBoard) {
		const newItem = new KanbanBoardItem(Date.now(), itemDesc, false)
		board.items.push(newItem)
		setModalVisible(false)
		setItemDesc({ title: '', description: '', direction: '' })
	}

	function getItemToUpdate(item: KanbanTask) {
		setItemDesc({ title: item.info.title, description: item.info.description, direction: item.info.direction })
		setItemToUpdate(item)

		setFormType(FormsTypes.UPDATe)
		setModalVisible(true)
	}

	function finishUpdateItem() {
		setModalVisible(false)
		setItemDesc({ title: '', description: '', direction: '' })
		setItemToUpdate(null)
	}

	async function addDesk() {
		if (newDeskTitle.length !== 0) {
			const newBoard = new KanbanBoard(Date.now(), newDeskTitle, getColor(), [])
			setBoards([...boards, newBoard])
			setNewDeskTitle('')
			setNewDeskInpVisible(false)
		}
	}

	async function deleteProjHandler(projId: number) {
		if (projects.length > 1) {
			setActiveProjectId(projects[projects.length - 2].id)
		}
		jwtToken ? await deleteProject([projId, jwtToken]) : dispatch(deleteKanbProject(projId))
	}

	const [inviteUser, setInviteUser] = useState('')
	return (
		<>
			<div className='kanban__project project-kanban'>
				{jwtToken && <div className="">
					<input type="text" value={inviteUser} onChange={e => setInviteUser(e.target.value)} />
					<button onClick={() => invite([{ project: project.id, invitedUser: inviteUser }, jwtToken])}>Пригласить</button>
				</div>}
				{jwtToken && <KanbanProjectChat projectId={project.id} messages={project.messages} username={username} />}
				<div className='project-kanban__inner'>
					{boards.map(board =>
						<KanbanBoardComp key={board.id} setBoardAdd={setBoardAdd} setFormType={setFormType} setModalVisible={setModalVisible} board={board} setBoards={setBoards} setItemDesc={setItemDesc} itemDesc={itemDesc} boards={boards} currentBoard={currentBoard} currentItem={currentItem} project={project} setCurrentBoard={setCurrentBoard} setCurrentItem={setCurrentItem} getItemToUpdate={getItemToUpdate} />
					)}
					<div className='project-kanban__add-desk add-desk'>
						{newDeskInpVisible && <KanbanAddField className='add-desk__field' value={newDeskTitle} setValue={setNewDeskTitle} fn={addDesk} />}
						<Button type={ButtonTypes.BG_NONE} className='add-desk__btn' onClick={e => setNewDeskInpVisible(!newDeskInpVisible)}>{newDeskInpVisible ? 'Закрыть' : '+ Доска'}</Button>
					</div>
				</div>
				<div className='project-kanban__buttons'>
					<Button type={ButtonTypes.BG_BLUE} onClick={() => deleteProjHandler(project.id)} >Удалить проект</Button>
					<Button type={ButtonTypes.BG_BLUE}
						onClick={jwtToken
							? () => saveProject([project.id, boards, jwtToken])
							: () => dispatch(saveKanbProject({ id: project.id, boards }))}>Сохранить</Button>
				</div>
			</div >

			<Modal visible={modalVisible} setVisible={setModalVisible}>
				<KanbanItemForm itemDesc={itemDesc} board={boardAdd} itemToUpdate={itemToUpdate} setItemDesc={setItemDesc} typeForm={formType} addItem={addNewItem} updateItem={finishUpdateItem} />
			</Modal>

		</>
	)
})

export default Kanban