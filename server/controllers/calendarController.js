import { CalendarEvent } from '../models/CalendarEvent.js'

class CalendarController {
	async getAll(req, res) {
		try {
			const result = await CalendarEvent.find()
			res.status(200).send(result)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}
	async createOne(req, res) {
		try {
			const newEvent = new CalendarEvent({ ...req.body })
			await newEvent.save()
			res.status(200).send(newEvent)
		} catch (error) {
			console.log(error);
			res.status(400).send(error.message)
		}
	}
	async getByDayId(req, res) {
		const dayId = req.params.id
		try {
			const events = await CalendarEvent.find({ dayId: dayId })
			res.status(200).send(events)
		} catch (error) {
			console.log(error);
			res.status(400).send(error.message)
		}
	}
	async deleteOne(req, res) {
		const eventId = req.params.id
		try {
			const deleted = await CalendarEvent.deleteOne({ id: eventId })
			res.status(200).send(deleted)
		} catch (error) {
			console.log(error);
			res.status(400).send(error)
		}
	}
}
export default new CalendarController()