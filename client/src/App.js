import { useEffect, useState } from "react";
import "./styles/App.css";
import { fetchTickets } from "./utils";
import Tickets from "./components/Tickets";

function App() {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		fetchTickets(tickets, setTickets);
	}, []);

	return (
		<div className="App">
			<Tickets tickets={tickets} setTickets={setTickets} />
		</div>
	);
}

export default App;
