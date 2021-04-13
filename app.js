const express = require("express");
const app = express();
const morgan = require("morgan");
const Ticket = require("./models/Ticket");

morgan.token("reqbody", (req) => {
	return JSON.stringify(req.body);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static("client/build"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"));

// GET route to /api/tickets - returns an array of all tickets in the collection tickets in database.
app.get("/api/tickets", (req, res, next) => {
	const searchText = req.query.searchText;
	let propToSearchBy = req.query.searchBy;

	if (
		propToSearchBy !== "title" &&
		propToSearchBy !== "content" &&
		propToSearchBy !== "userEmail"
	) {
		// default
		propToSearchBy = "title";
	}
	console.log(propToSearchBy);

	const searchTextRegex = new RegExp(searchText, "i");
	const query = {};
	query[propToSearchBy] = searchTextRegex;

	Ticket.find(query)
		.then((tickets) => {
			res.json(tickets);
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
});

app.patch("/api/tickets/:ticketId/:state", (req, res, next) => {
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
			// 404 are not errors here, axios will throw errors to frontend upon receiving 404, which is why this isn't in the error handler.
			if (!ticket) {
				return res.status(404).send();
			}

			let toUpdateOrNot = true;

			if ((ticket.done && state === "done") || (!ticket.done && state === "undone")) {
				toUpdateOrNot = false;
			}

			const updateValue = toUpdateOrNot ? !ticket.done : ticket.done;

			ticket.updateOne({ done: updateValue }).then(() => {
				res.json({ updated: toUpdateOrNot });
			});
		})
		.catch((error) => {
			next(error);
		});
});

// POST route to /api/tickets/new to add a new ticket
app.post("/api/tickets/new", (req, res, next) => {
	const { body } = req;

	let { labels } = body;

	if (!Array.isArray(labels) && typeof labels === "string") {
		if (labels === "") {
			body.labels = [];
		} else {
			labels = labels.replace(/[^ 0-9a-z]/gi, "");
			// Make the string into an array seperated by spaces
			body.labels = labels.split(" ").map((label) => capitalizeFirstLetter(label.toLowerCase()));
		}
	}

	const creationTime = Date.now();
	const newTicket = { ...body, creationTime };

	Ticket.create(newTicket)
		.then(() => {
			res.status(201).json(newTicket);
		})
		.catch((error) => {
			next(error);
		});
});

// DELETE route to /api/tickets/:ticketId to delete a ticket by it's id
app.delete("/api/tickets/:ticketId", (req, res, next) => {
	const { ticketId } = req.params;

	Ticket.findByIdAndRemove(ticketId)
		.then((deletedTicket) => {
			// 404 are not errors here, axios will throw errors to frontend upon receiving 404, which is why this isn't in the error handler.
			// Also I intended not to handle the 404 case in delete by design (not found -> not deleted -> no problem), did it anyway because I do get the deleted ticket if it in fact was deleted so now there's a distinction between these 2 cases.
			if (!deletedTicket) {
				return res.status(404).send();
			}

			res.json({ message: `ticket with id ${ticketId} deleted` });
		})
		.catch((error) => {
			next(error);
		});
});

const errorHandler = (error, request, response, next) => {
	console.error(error);
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).json({ message: "invalid id format!", name: "CastError" });
	}

	if (error.name === "ValidationError") {
		return response.status(400).json({ message: error.message, name: "ValidationError" });
	}

	if (error.name === "MongoError") {
		return response.status(400).json({ message: error.message, name: "MongoError" });
	}

	if (error.name === "BadStateParamError") {
		return response.status(400).json({ message: error.message, name: "BadStateParamError" });
	}

	next(error);
};

app.use(errorHandler);

// Utility function for capitalizing the first letter of a string
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = app;
