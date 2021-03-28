import { useEffect, useState, useRef } from "react";
import "./styles/App.css";
import { fetchTickets } from "./utils";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Fab } from "@material-ui/core";
import Tickets from "./components/Tickets";
import SearchAppBar from "./components/SearchAppBar";
import ScrollTop from "./components/ScrollTop";
import AddTicketForm from "./components/AddTicketForm";

function App() {
	const [addFormOpen, setAddFormOpen] = useState(false);

	const [resultsCount, setResultsCount] = useState(0);
	const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
	const [hiddenTickets, setHiddenTickets] = useState([]);
	const [input, setInput] = useState("");
	const [tickets, setTickets] = useState([]);

	const [searchBy, setSearchBy] = useState("title");

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

	const handleRestoreHiddenClick = (event) => {
		setHideTicketsCounter(0);
		for (const ticket of hiddenTickets) {
			ticket.style.display = "block";
			ticket.classList.add("ticket");
		}
	};

	return (
		<div className="App">
			<SearchAppBar setInput={setInput} searchBy={searchBy} setSearchBy={setSearchBy} />
			<section className="results-info-section" id="back-to-top-anchor">
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

			<AddTicketForm addFormOpen={addFormOpen} setAddFormOpen={setAddFormOpen} />

			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</div>
	);
}

export default App;
