import { useEffect, useState, useRef } from "react";
import "./styles/App.css";
import { fetchTickets } from "./utils";
import Tickets from "./components/Tickets";

function App() {
	const [resultsCount, setResultsCount] = useState(0);
	const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
	const [hiddenTickets, setHiddenTickets] = useState([]);
	const [input, setInput] = useState("");
	const [tickets, setTickets] = useState([]);

	const hiddenTicketsInfo = useRef(null);

	useEffect(() => {
		fetchTickets(tickets, setTickets, input);
	}, [input]);

	useEffect(() => {
		setResultsCount(tickets.length);
	}, [tickets]);

	useEffect(() => {
		if (hideTicketsCounter === 0) {
			hiddenTicketsInfo.current.style.display = "none";
			return;
		}

		hiddenTicketsInfo.current.style.display = "inline";
	}, [hideTicketsCounter]);

	useEffect(() => {
		for (const ticket of hiddenTickets) {
			ticket.style.display = "none";
		}
	}, [hiddenTickets]);

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	const handleRestoreHiddenClick = (event) => {
		setHideTicketsCounter(0);
		for (const ticket of hiddenTickets) {
			ticket.style.display = "block";
			ticket.classList.add("ticket");
		}
	};

	return (
		<div className="App">
			<input id="searchInput" placeholder="Search..." onChange={handleInputChange} />
			<section className="results-info-section">
				<p>
					<span>{`Showing ${resultsCount} results `}</span>
					<span ref={hiddenTicketsInfo}>
						{`(`}
						<span id="hideTicketsCounter">{hideTicketsCounter}</span>
						{` hidden tickets - `}
						<a id="restoreHideTickets" href="#" onClick={handleRestoreHiddenClick}>
							restore
						</a>
						)
					</span>
				</p>
			</section>
			<Tickets
				tickets={tickets}
				setTickets={setTickets}
				hideTicketsCounter={hideTicketsCounter}
				setHideTicketsCounter={setHideTicketsCounter}
				hiddenTickets={hiddenTickets}
				setHiddenTickets={setHiddenTickets}
			/>
		</div>
	);
}

export default App;
