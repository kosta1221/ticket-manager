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
	Ticket.find({}).then((tickets) => {
		res.json(tickets);
	});
});

module.exports = app;
