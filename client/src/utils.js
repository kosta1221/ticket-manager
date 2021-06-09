import axios from "axios";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";

export const URL = `/api`;

export const fetchTickets = async (setTickets, inputValue, searchBy) => {
	let urlToFetch = `${URL}/tickets?searchText=${inputValue}&searchBy=${searchBy}`;

	console.log("trying to fetch...");
	if (!inputValue) {
		urlToFetch = `${URL}/tickets`;
	}

	console.log(urlToFetch);

	try {
		const response = await axios({
			method: "GET",
			url: urlToFetch,
			headers: { "Content-Type": "application/json" },
		});
		setTickets(response.data);
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

export const fetchTicketsDebounced = AwesomeDebouncePromise(fetchTickets, 400);

export const deleteTicket = async (ticketId, tickets, setTickets) => {
	console.log(`trying to delete ticket id ${ticketId}...`);
	console.log(`${URL}/tickets/${ticketId}`);
	try {
		const response = await axios({
			method: "DELETE",
			url: `${URL}/tickets/${ticketId}`,
			headers: { "Content-Type": "application/json" },
		});
		console.log(response.data);
		setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
	} catch (e) {
		console.log(e);
	}
};

export const postTicket = async (ticket) => {
	console.log(`trying to post new ticket: `, ticket);
	console.log(`to: ${URL}/tickets/new`);
	try {
		const response = await axios({
			method: "POST",
			url: `${URL}/tickets/new`,
			headers: { "Content-Type": "application/json" },
			data: ticket,
		});
		return response.data;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const toggleTicketDone = async (ticketId, done, setDone, tickets, setTickets) => {
	let doneWord = "done";

	// If the ticket is done doneWord needs to be undone because it represents the wanted "new" state
	if (done) {
		doneWord = "undone";
	}

	console.log(`trying to patch ticket id ${ticketId} to become ${doneWord}...`);
	console.log(`${URL}/tickets/${ticketId}/${doneWord}`);

	try {
		const response = await axios({
			method: "PATCH",
			url: `${URL}/tickets/${ticketId}/${doneWord}`,
			headers: { "Content-Type": "application/json" },
		});
		console.log(response.data);
		if (response.data.updated) {
			setDone(!done);
			console.log("All good! Ticket done state updated!");
		}

		const newTickets = tickets.map((ticket) => {
			if (ticket.id === ticketId) {
				ticket.done = !done;
			}
			return ticket;
		});
		setTickets(newTickets);
	} catch (e) {
		console.log(e);
	}
};
