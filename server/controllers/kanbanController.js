import { Kanban } from '../models/Kanban.js';

class KanbanConroller {
	async getAll(req, res) {
		try {
			const result = await Kanban.find()
			res.status(200).send(result)
		} catch (error) {
			res.status(400).send(error.message)
		}

	}
	async createOne(req, res) {
		try {
			const newProj = new Kanban({ ...req.body })
			await newProj.save()
			res.send(newProj)
		} catch (error) {
			console.log(error);
			res.status(400).send(error.message)
		}
	}
	async deleteOne(req, res) {
		const projectId = req.params.id
		try {
			const deleted = await Kanban.deleteOne({ id: projectId })
			res.send(deleted)
		} catch (error) {
			console.log(error);
			res.status(400).send(error)
		}
	}
	async updateOne(req, res) {
		const projectId = req.params.id

		try {
			await Kanban.updateOne({ id: projectId }, { $set: { boards: [...req.body.boards] } })
			res.send(await Kanban.findOne({ id: projectId }))

		} catch (error) {

			console.log(error);
			res.status(400).send(error)
		}
	}
}

export default new KanbanConroller()