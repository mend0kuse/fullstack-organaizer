import mongoose from 'mongoose';

const CalendarEventSchema = new mongoose.Schema({
	dayId: { type: String, required: true },
	content: { type: String, required: true },
});

export const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema)