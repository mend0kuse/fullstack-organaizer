import { Note } from "../models/Note.js";

class NotebookController {
	async createOne(req, res) {
		try {
			const userId = req.user.id
			const newNote = new Note({ ...req.body, userId: userId })
			await newNote.save()
			res.send(newNote)
		} catch (error) {
			console.log(error);
			res.status(400).send(error.message)
		}
	}
	async getOne(req, res) {
		try {
			if (req.params.id == 'null') throw new Error('')

			const result = await Note.findOne({ _id: req.params.id })
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
			const deleted = await Note.deleteOne({ _id: noteId })
			res.send(deleted)
		} catch (error) {
			console.log(error);
			res.status(400).send(error)
		}
	}
}

export default new NotebookController()