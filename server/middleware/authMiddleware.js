import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export function authMiddleware(req, res, next) {

	try {
		const token = req.headers.authorization
		if (!token) {
			return res.status(403).json({ message: 'Пользователь не авторизован' })
		}

		const decodedData = jwt.verify(token, secret)
		req.user = decodedData
		next()

	} catch (error) {
		console.log(error);
		return res.status(403).json({ message: 'Пользователь не авторизован' })
	}
	
}