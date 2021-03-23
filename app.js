const express = require("express");
const app = express();

const Ticket = require("./models/Ticket");

app.use(express.static("client/build"));
app.use(express.json());

// GET route to /api/tickets - returns an array of all tickets in the collection tickets in database.
app.get("/api/tickets", (req, res) => {
	Ticket.find({}).then((tickets) => {
		res.json(tickets);
	});
});

module.exports = app;
