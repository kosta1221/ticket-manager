const express = require("express");
const app = express();
const morgan = require("morgan");
const Ticket = require("./models/Ticket");

morgan.token("reqbody", (req) => {
	return JSON.stringify(req.body);
});

app.use(express.static("client/build"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"));

// GET route to /api/tickets - returns an array of all tickets in the collection tickets in database.
app.get("/api/tickets", (req, res) => {
	const searchText = req.query.searchText;

	const searchTextRegex = new RegExp(searchText, "i");

	Ticket.find({ title: searchTextRegex })
		.then((tickets) => {
			res.json(tickets);
		})
		.catch((error) => {
			console.log(error);
		});
});

app.patch("/api/tickets/:ticketId/:state", (req, res) => {
	const { ticketId } = req.params;
	const { state } = req.params;

	try {
		if (state !== "done" && state !== "undone") {
			const badStateParamError = new Error("param should be done or undone!");
			badStateParamError.name = "BadStateParamError";
			throw badStateParamError;
		}
	} catch (error) {
		next(error);
	}

	Ticket.findById(ticketId)
		.then((ticket) => {
			ticket.updateOne({ done: !ticket.done }).then(() => {
				res.json({ updated: true });
			});
		})
		.catch((error) => {
			next(error);
		});
});

const errorHandler = (error, request, response, next) => {
	console.error(error);
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ message: "invalid id format!", name: "CastError" });
	}

	if (error.name === "ValidationError") {
		return response.status(400).json({ message: error.message, name: "CastError" });
	}

	if (error.name === "MongoError") {
		return response.status(400).json({ message: error.message, name: "CastError" });
	}

	if (error.name === "BadStateParamError") {
		return response.status(400).json({ message: error.message, name: "CastError" });
	}

	next(error);
};

app.use(errorHandler);

module.exports = app;
