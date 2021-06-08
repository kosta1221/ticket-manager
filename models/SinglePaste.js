const mongoose = require("mongoose");

const singlePasteSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

singlePasteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		delete returnedObject.__v;
		returnedObject.id = returnedObject._id;
	},
});

module.exports = mongoose.model("SinglePaste", singlePasteSchema);
