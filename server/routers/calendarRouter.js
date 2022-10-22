import express from 'express'

export const routerCalendar = express.Router();
import { CalendarEvent } from '../models/CalendarEvent.js'

routerCalendar.get('/', async (req, res) => {
	const result = await CalendarEvent.find()
	res.send(result)
})

//создание события
routerCalendar.post('/', async (req, res) => {
	try {
		const newEvent = new CalendarEvent({ ...req.body })
		await newEvent.save()
		res.send(newEvent)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})

//события по дню
routerCalendar.get('/:id', async (req, res) => {
	const dayId = req.params.id
	try {
		const events = await CalendarEvent.find({ dayId: dayId })
		res.send(events)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})

//удаление события
routerCalendar.delete('/:id', async (req, res) => {
	const eventId = req.params.id
	try {
		const deleted = await CalendarEvent.deleteOne({ id: eventId })
		res.send(deleted)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})

//обновление проекта
// routerKanban.put('/:id', async (req, res) => {
// 	const projectId = req.params.id

// 	try {

// 		await Kanban.updateOne({ id: projectId }, { $set: { boards: [...req.body.boards] } })
// 		res.send(await Kanban.findOne({ id: projectId }))

// 	} catch (error) {

// 		console.log(error);
// 		res.status(400).send(error)
// 	}
// })

