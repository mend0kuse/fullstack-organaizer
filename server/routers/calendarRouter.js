import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';

import calendarController from '../controllers/calendarController.js';

export const routerCalendar = express.Router();

routerCalendar.get('/', authMiddleware, calendarController.getAll)

routerCalendar.post('/', authMiddleware, calendarController.createOne)

routerCalendar.get('/:id', authMiddleware, calendarController.getByDayId)

routerCalendar.delete('/:id', authMiddleware, calendarController.deleteOne)

