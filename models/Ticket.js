const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
	title: {
		type: String,
		minLength: 3,
		required: true,
	},
	content: { type: String, minLength: 3, required: true },
	userEmail: { type: String, minLength: 3, required: true },
	done: { type: Boolean, required: true, default: false },
	creationTime: { type: Number, required: true },
	labels: { type: Array, required: false },
});

ticketSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		delete returnedObject.__v;
		returnedObject.id = returnedObject._id;
	},
});

module.exports = mongoose.model("Ticket", ticketSchema);
