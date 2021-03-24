import axios from "axios";
const URL = `/api`;

export const fetchTickets = async (tickets, setTickets, inputValue) => {
	console.log("trying to fetch...");
	if (inputValue) {
		console.log(`${URL}/tickets/`);
	} else console.log(`${URL}/tickets/?searchText=${inputValue}`);
	try {
		const response = await axios({
			method: "GET",
			url: `${URL}/tickets/?searchText=${inputValue}`,
			headers: { "Content-Type": "application/json" },
		});
		setTickets(response.data);
	} catch (e) {
		console.log(e);
	}
};
