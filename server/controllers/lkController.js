import { User } from '../models/User.js'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

class LkConroller {
	async userInfo(req, res) {
		try {
			const userId = req.user.id
			const findedUser = await User.findOne({ _id: userId }, { _id: 1, username: 1, avatar: 1 })
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
}

export default new LkConroller()