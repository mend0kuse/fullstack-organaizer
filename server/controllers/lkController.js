import { User } from '../models/User.js'
import { Kanban } from '../models/Kanban.js'

import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

class LkConroller {
	async userInfo(req, res) {
		try {
			const userId = req.user.id
			const findedUser = await User.findOne({ _id: userId }, { _id: 1, username: 1, avatar: 1, notifications: 1 })
			res.status(200).send(findedUser)
		} catch (error) {
			res.status(400).send(error.message)
		}

	}
	async uploadAvatar(req, res) {
		try {
			//проверка есть ли у юзера аватар,если есть то удаляет его
			let deleted = await User.findOne({ _id: req.body._id }, { avatar: 1 })
			if (deleted.avatar) {
				fs.unlink(path.join(__dirname, 'server', 'images', deleted.avatar), () => { });
			}

			await User.updateOne({ _id: req.body._id }, { $set: { avatar: req.file.filename } })
			res.send(await User.findOne({ _id: req.body._id }, { _id: 1, username: 1, avatar: 1 }))
		} catch (error) {
			res.status(400).send(error.message)
		}
	}
	async inviteInProject(req, res) {
		const sender = await User.findOne({ _id: req.user.id })
		const invited = req.body.invitedUser
		const project = await Kanban.findOne({ id: req.body.project })

		try {
			await User.updateOne({ username: invited }, { $push: { notifications: { from: sender.username, project: project.name } } })
			res.send(await User.find({ username: invited }))
		} catch (error) {
			console.log(error);
		}

	}
	async acceptInviteProject(req, res) {
		const user = await User.findOne({ _id: req.body.userId })
		const not = user.notifications.find(not => not._id == req.body.notId)
		try {
			await Kanban.updateOne({ name: not.project }, { $push: { userId: user._id } })
			await User.updateOne({ _id: req.body.userId }, { $pull: { notifications: { _id: not._id } } })

			res.send(await User.findById(user))
		} catch (error) {
			console.log(error);
		}

	}
}

export default new LkConroller()