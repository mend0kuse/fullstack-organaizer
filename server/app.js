import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'

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



async function dbsConnect() {
	try {
		await mongoose.connect('mongodb://10.100.3.210:27017/usersdb_20054');
		console.log('База подключена');
	} catch (error) {
		console.log(error);
	}
}
