import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	avatar: { type: String },
	notifications: [
		{
			from: { type: String, required: true },
			project: { type: Number, required: true }
		}
	]
})

export const User = mongoose.model('User', UserSchema)