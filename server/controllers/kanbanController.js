import { Kanban } from '../models/Kanban.js';

class KanbanConroller {
	async getAllById(req, res) {
		try {
			const user = req.user.id
			const result = await Kanban.find({ userId: user })
			res.status(200).send(result)
		} catch (error) {
			res.status(400).send(error.message)
		}
	}
	async createOne(req, res) {
		try {
			const userId = req.user.id
			const newProj = new Kanban({ ...req.body, userId: userId })
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
	async postMsgInChat(id, username, msg) {
		try {
			await Kanban.updateOne({ id: id }, {
				$push: { messages: { username: username, content: msg.content, date: msg.date } }
			})

			let proj = await Kanban.findOne({ id: id })

			return proj.messages
		} catch (error) {
			console.log(error);
		}
	}

}

export default new KanbanConroller()