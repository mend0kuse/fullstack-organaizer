import express from 'express'
import kanbanController from '../controllers/kanbanController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const routerKanban = express.Router();

routerKanban.get('/', authMiddleware, kanbanController.getAllById)
routerKanban.post('/', authMiddleware, kanbanController.createOne)
routerKanban.delete('/:id', authMiddleware, kanbanController.deleteOne)
routerKanban.put('/:id', authMiddleware, kanbanController.updateOne)

