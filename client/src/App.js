import { useEffect, useState } from "react";
import "./styles/App.css";
import { fetchTickets } from "./utils";
import Tickets from "./components/Tickets";

function App() {
	const [input, setInput] = useState("");
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		fetchTickets(tickets, setTickets, input);
	}, [input]);

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	return (
		<div className="App">
			<input id="searchInput" placeholder="Search..." onChange={handleInputChange} />
			<Tickets tickets={tickets} setTickets={setTickets} />
		</div>
	);
}

export default App;
