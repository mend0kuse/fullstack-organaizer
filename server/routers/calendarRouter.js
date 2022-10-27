import express from 'express'

import calendarController from '../controllers/calendarController.js';

export const routerCalendar = express.Router();

routerCalendar.get('/', calendarController.getAll)

routerCalendar.post('/', calendarController.createOne)

routerCalendar.get('/:id', calendarController.getByDayId)

routerCalendar.delete('/:id', calendarController.deleteOne)

