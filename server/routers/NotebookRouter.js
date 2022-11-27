import Router from 'express'
import notebookController from '../controllers/notebookController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const routerNotebook = Router()

routerNotebook.post('/', authMiddleware, notebookController.createOne)
routerNotebook.get('/:id', authMiddleware, notebookController.getOne)
routerNotebook.get('/', authMiddleware, notebookController.getAll)


