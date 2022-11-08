import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'


import { routerAuth } from './routers/AuthRouter.js'
import { routerKanban } from './routers/kanbanRouter.js';
import { routerCalendar } from './routers/calendarRouter.js';
import { lkRouter } from './routers/lkRouter.js';



const app = express()
const __dirname = path.resolve()
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(express.json({ extended: true }))
app.use('/images', express.static(path.resolve(__dirname, 'server/images')));

app.listen(PORT, dbsConnect)

app.use('/projects', routerKanban)
app.use('/calendar', routerCalendar)
app.use('/auth', routerAuth)
app.use('/lk', lkRouter)


async function dbsConnect() {
	try {
		await mongoose.connect('mongodb://0.0.0.0:27017/organaizer');
		console.log('База подключена');
	} catch (error) {
		console.log(error);
	}
}
