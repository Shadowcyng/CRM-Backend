const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	userid: { required: true, type: String },
	title: { required: true, type: String },
	startDate: {
		required: true,
		type: Date,
		min: new Date().getDate(),
		default: new Date(),
	},
	endDate: { required: false, type: Date },
	allDay: { required: true, type: Boolean, default: false },
	resource: { required: false, type: String },
	description: { required: false, type: String },
});
const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;
