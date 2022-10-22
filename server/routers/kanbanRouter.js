import express from 'express'

export const routerKanban = express.Router();
import { Kanban } from '../models/Kanban.js';

routerKanban.get('/', async (req, res) => {
	const result = await Kanban.find()
	res.send(result)
})

//создание проекта
routerKanban.post('/', async (req, res) => {
	try {
		const newProj = new Kanban({ ...req.body })
		await newProj.save()
		res.send(newProj)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})
//удаление проекта
routerKanban.delete('/:id', async (req, res) => {
	const projectId = req.params.id
	try {
		const deleted = await Kanban.deleteOne({ id: projectId })
		res.send(deleted)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})
//обновление проекта
routerKanban.put('/:id', async (req, res) => {
	const projectId = req.params.id

	try {

		await Kanban.updateOne({ id: projectId }, { $set: { boards: [...req.body.boards] } })
		res.send(await Kanban.findOne({ id: projectId }))

	} catch (error) {

		console.log(error);
		res.status(400).send(error)
	}
})

