import axios from "axios";
const URL = `/api`;

export const fetchTickets = async (tickets, setTickets) => {
	console.log("trying to fetch...");
	console.log(`${URL}/tickets/`);
	try {
		const response = await axios({
			method: "GET",
			url: `${URL}/tickets/`,
			headers: { "Content-Type": "application/json" },
		});
		setTickets({ tickets: response.data.tickets });
	} catch (e) {
		console.log(e);
	}
};
