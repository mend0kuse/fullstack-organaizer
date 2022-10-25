import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { User } from '../models/User.js'

export const lkRouter = express.Router();
const __dirname = path.resolve()

const store = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `./server/images`); // ваша папка для файлов на сервере
    },
    filename(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage: store }).single('file'); // загрузка одного файла

lkRouter.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id
    const findedUser = await User.findOne({ _id: userId }, { _id: 1, username: 1, avatar: 1 })
    res.status(200).send(findedUser)
})

lkRouter.post('/avatar', upload, async (req, res) => {
    try {
        let deleted = await User.findOne({ _id: req.body._id }, { avatar: 1 })

        fs.unlink(path.join(__dirname, 'server', 'images', deleted.avatar), () => { });

        await User.updateOne({ _id: req.body._id }, { $set: { avatar: req.file.filename } })
        res.send(await User.findOne({ _id: req.body._id }, { _id: 1, username: 1, avatar: 1 }))
    } catch (error) {
        res.status(400).send(error)
    }
})