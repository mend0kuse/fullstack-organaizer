import mongoose from "mongoose";
import { ObjectId } from 'mongoose';

const NoteSchema = new mongoose.Schema({

	userId: [ObjectId],
	time: { type: Number, required: true },
	version: { type: String, required: true },
	blocks: [
		{
			id: { type: String, required: true },
			type: { type: String, required: true },
			data: {
				stretched: { type: Boolean },
				url: { type: String },
				withBackground: { type: Boolean },
				withBorder: { type: Boolean },
				level: { type: Number },
				content: [[String]],
				style: { type: String },
				withHeadings: { type: Boolean },
				text: { type: String },
				caption: { type: String },
				alignment: { type: String },
				link: { type: String },
				meta: {
					description: { type: String },
					image: { url: { type: String } },
					site_name: { type: String },
					title: { type: String },
					type: { type: String },
				},
				items: [String]
			}
		}
	]
})

export const Note = mongoose.model('Note', NoteSchema)