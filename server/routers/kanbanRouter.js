import express from 'express'
import kanbanController from '../controllers/kanbanController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const routerKanban = express.Router();

routerKanban.get('/', authMiddleware, kanbanController.getAll)
routerKanban.post('/', kanbanController.getAll)
routerKanban.delete('/:id', kanbanController.deleteOne)
routerKanban.put('/:id', kanbanController.updateOne)

