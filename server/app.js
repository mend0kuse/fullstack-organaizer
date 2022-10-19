import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'

import { Kanban } from './models/Kanban.js';

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


app.get('/projects', async (req, res) => {
	const result = await Kanban.find()
	res.send(result)
})

//создание проекта
app.post('/projects', async (req, res) => {
	try {
		const newProj = new Kanban({ ...req.body })
		await newProj.save()
		res.send(newProj)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})
//удаление проекта
app.delete('/projects/:id', async (req, res) => {
	const projectId = req.params.id
	try {
		const deleted = await Kanban.deleteOne({ id: projectId })
		res.send(deleted)
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})
//обновление проекта
app.put('/projects/:id', async (req, res) => {
	const projectId = req.params.id

	try {

		await Kanban.updateOne({ id: projectId }, { $set: { boards: [...req.body.boards] } })
		res.send(await Kanban.findOne({ id: projectId }))

	} catch (error) {

		console.log(error);
		res.status(400).send(error)
	}
})




async function dbsConnect() {
	try {
		await mongoose.connect('mongodb://0.0.0.0:27017/organaizer');
		console.log('База подключена');
	} catch (error) {
		console.log(error);
	}
}
