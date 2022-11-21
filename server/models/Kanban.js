import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const KanbanSchema = new mongoose.Schema({
	userId: [ObjectId],
	id: { type: Number, required: true },
	name: { type: String, required: true },
	boards: [
		{
			id: { type: Number, required: true },
			name: { type: String, required: true },
			headBg: { type: String, required: true },
			items: [
				{
					id: { type: Number, required: true },
					info: {
						description: { type: String },
						direction: { type: String },
						title: { type: String }
					},
					pinned: { type: Boolean, required: true }
				}
			]
		}
	],
	messages: [
		{
			username: { type: String, required: true },
			content: { type: String, required: true }
		}
	]
});

export const Kanban = mongoose.model('Kanban', KanbanSchema)
