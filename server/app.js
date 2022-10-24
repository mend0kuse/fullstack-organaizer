import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'

import { routerAuth } from './routers/AuthRouter.js'
import { routerKanban } from './routers/kanbanRouter.js';
import { routerCalendar } from './routers/calendarRouter.js';

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
}

const app = express()

const PORT = 5000;

app.use(bodyParser.json());
app.use(cors(corsOptions))

app.listen(PORT, dbsConnect)

app.use('/projects', routerKanban)
app.use('/calendar', routerCalendar)
app.use('/auth', routerAuth)


async function dbsConnect() {
	try {
		await mongoose.connect('mongodb://0.0.0.0:27017/organaizer');
		console.log('База подключена');
	} catch (error) {
		console.log(error);
	}
}
