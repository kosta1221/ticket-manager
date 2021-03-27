import axios from "axios";
export const URL = `/api`;

export const fetchTickets = async (tickets, setTickets, inputValue) => {
	console.log("trying to fetch...");
	let urlToFetch = `${URL}/tickets?searchText=${inputValue}`;
	if (!inputValue) {
		console.log(`${URL}/tickets`);
		urlToFetch = `${URL}/tickets`;
	} else console.log(`${URL}/tickets?searchText=${inputValue}`);
	try {
		const response = await axios({
			method: "GET",
			url: urlToFetch,
			headers: { "Content-Type": "application/json" },
		});
		setTickets(response.data);
	} catch (e) {
		console.log(e);
	}
};
