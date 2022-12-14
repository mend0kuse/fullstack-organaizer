import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import jwt from 'jsonwebtoken'

import { secret } from './config.js'
import { routerAuth } from './routers/AuthRouter.js'
import { routerKanban } from './routers/kanbanRouter.js';
import { routerCalendar } from './routers/calendarRouter.js';
import { lkRouter } from './routers/lkRouter.js';
import http from 'http'
import { Server } from "socket.io";
import kanbanController from './controllers/kanbanController.js';

import og from 'open-graph'
import { routerNotebook } from './routers/NotebookRouter.js'


const app = express()
const server = http.Server(app)

const io = new Server(server, {
	cors: {
		origin: "https://fullstack-organaizer.vercel.app/",
		methods: ["GET", "POST"]
	}
})

io.on("connection", (socket) => {
	const room = socket.handshake.query.room
	socket.join(room)
	try {
		const token = socket.handshake.auth.token
		const user = jwt.verify(token, secret)

		socket.on('send msg', (req) => {
			kanbanController.postMsgInChat(req.id, user.username, req.msg)
				.then(res => socket.to(room).emit('res msg', { msg: res[res.length - 1] }))
		})

	} catch (err) {
		console.log(err);
	}

});



const __dirname = path.resolve()
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(express.json({ extended: true }))
app.use('/images', express.static(path.resolve(__dirname, 'server/images')));


app.use('/projects', routerKanban)
app.use('/calendar', routerCalendar)
app.use('/auth', routerAuth)
app.use('/lk', lkRouter)
app.use('/notebook', routerNotebook)


app.get('/fetchUrl', (req, res) => {
	const url = req.query.url
	og(url, function (err, meta) {
		if (meta) res.json({ success: 1, meta });
		else res.json({ success: 0, meta: {} });
	});
})

server.listen(PORT, dbsConnect)

async function dbsConnect() {
	try {
		// await mongoose.connect('mongodb://0.0.0.0:27017/organaizer');
		// await mongoose.connect('mongodb://10.100.3.210:27017/organaizer');
		await mongoose.connect('mongodb://mongo:6lgYmHL1u230trZ5qV6B@containers-us-west-81.railway.app:6122');

		console.log('???????? ????????????????????');
	} catch (error) {
		console.log(error);
	}
}
