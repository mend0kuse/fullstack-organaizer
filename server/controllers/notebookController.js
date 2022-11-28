import { Note } from "../models/Note.js";

class NotebookController {
	async createOne(req, res) {
		try {
			const userId = req.user.id
			const newNote = new Note({ ...req.body, userId: userId })
			await newNote.save()
			res.status(200).send(newNote)
		} catch (error) {
			console.log(error);
			res.status(400).send(error.message)
		}
	}
	async getOne(req, res) {
		try {
			if (req.params.id == 'null') throw new Error('')

			const result = await Note.findOne({ time: req.params.id })
			res.status(200).send(result)

		} catch (error) {
			res.status(400).send(error.message)
		}
	}
	async getAll(req, res) {
		try {
			const user = req.user.id
			const result = await Note.find({ userId: user })
			res.status(200).send(result)
		} catch (error) {
			res.status(400).send(error.message)
		}
	}
	async deleteOne(req, res) {
		const noteId = req.params.id
		try {
			const deleted = await Note.deleteOne({ time: noteId })
			res.send(deleted)
		} catch (error) {
			console.log(error);
			res.status(400).send(error)
		}
	}
	async updateOne(req, res) {
		const noteId = req.params.id

		try {
			await Note.updateOne({ time: noteId }, { $set: { blocks: req.body.blocks } })
			await Note.updateOne({ time: noteId }, { title: req.body.title })

			res.send(await Note.findOne({ time: noteId }))

		} catch (error) {

			console.log(error);
			res.status(400).send(error)
		}
	}
}

export default new NotebookController()