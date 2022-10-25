import express from 'express'
import path from 'path'
import fs from 'fs'


import { authMiddleware } from '../middleware/authMiddleware.js';
import { User } from '../models/User.js'

const __dirname = path.resolve()
let avatars = path.join(__dirname, 'server', 'avatars')

export const lkRouter = express.Router();

lkRouter.get('/', authMiddleware, async (req, res) => {

    const userId = req.user.id

    const findedUser = await User.findOne({ _id: userId })

    res.status(200).send(findedUser)

})

lkRouter.post('/avatar', async (req, res) => {
    try {
        fs.writeFile(avatars, req.file[0])
    } catch (error) {
        res.status(400).send(error)
    }
})