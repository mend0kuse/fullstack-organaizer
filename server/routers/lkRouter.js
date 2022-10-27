import express from 'express'
import multer from 'multer';

import { authMiddleware } from '../middleware/authMiddleware.js';
import LkConroller from '../controllers/lkController.js';

export const lkRouter = express.Router();

const store = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `./server/images`); // ваша папка для файлов на сервере
    },
    filename(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage: store }).single('file'); // загрузка одного файла

lkRouter.get('/', authMiddleware, LkConroller.userInfo)

lkRouter.post('/avatar', upload, LkConroller.uploadAvatar)