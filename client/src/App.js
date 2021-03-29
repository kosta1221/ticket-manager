import "./styles/App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useEffect, useState, useRef } from "react";
import { fetchTickets } from "./utils";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Fab } from "@material-ui/core";
import Tickets from "./components/Tickets";
import SearchAppBar from "./components/SearchAppBar";
import ScrollTop from "./components/ScrollTop";
import AddTicketForm from "./components/AddTicketForm";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#006064",
		},
		secondary: {
			main: "#d32f2f",
		},
	},
});

function App() {
	const [addFormOpen, setAddFormOpen] = useState(false);

	const [resultsCount, setResultsCount] = useState(0);
	const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
	const [hiddenTickets, setHiddenTickets] = useState([]);
	const [input, setInput] = useState("");
	const [tickets, setTickets] = useState([]);
	const [ticketsToRender, setTicketsToRender] = useState([]);

	const [searchBy, setSearchBy] = useState("title");

	// "all" for rendering all tickets, "done" for done, "undone" for undone, "hidden" for hidden.
	const [ticketsToRenderKeyword, setTicketsToRenderKeyword] = useState("all");
	const [ticketsLoading, setTicketsLoading] = useState(true);

	const hiddenTicketsInfo = useRef(null);

	useEffect(() => {
		fetchTickets(setTickets, input, searchBy).then(() => {
			setTicketsLoading(false);
		});
	}, [input, searchBy]);

	useEffect(() => {
		setResultsCount(ticketsToRender.length);
	}, [ticketsToRender, hiddenTickets]);

	useEffect(() => {
		if (ticketsToRenderKeyword === "all") {
			setTicketsToRender(tickets.filter((ticket) => !hiddenTickets.includes(ticket)));
		} else if (ticketsToRenderKeyword === "done") {
			setTicketsToRender(
				tickets.filter((ticket) => ticket.done === true && !hiddenTickets.includes(ticket))
			);
		} else if (ticketsToRenderKeyword === "undone") {
			setTicketsToRender(
				tickets.filter((ticket) => ticket.done === false && !hiddenTickets.includes(ticket))
			);
		} else if (ticketsToRenderKeyword === "hidden") {
			setTicketsToRender([...hiddenTickets]);
		}
	}, [ticketsToRenderKeyword, tickets, hiddenTickets]);

	useEffect(() => {
		if (hideTicketsCounter === 0) {
			hiddenTicketsInfo.current.style.display = "none";
			return;
		}

		hiddenTicketsInfo.current.style.display = "inline";
	}, [hideTicketsCounter]);

	const handleRestoreHiddenClick = (event) => {
		setHideTicketsCounter(0);

		setHiddenTickets([]);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<SearchAppBar
					setInput={setInput}
					searchBy={searchBy}
					setSearchBy={setSearchBy}
					setTicketsToRenderKeyword={setTicketsToRenderKeyword}
				/>
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
					ticketsToRenderKeyword={ticketsToRenderKeyword}
					setTicketsToRenderKeyword={setTicketsToRenderKeyword}
					ticketsToRender={ticketsToRender}
					ticketsLoading={ticketsLoading}
					setTicketsLoading={setTicketsLoading}
				/>

				<AddTicketForm addFormOpen={addFormOpen} setAddFormOpen={setAddFormOpen} />

				<ScrollTop>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
			</div>
		</ThemeProvider>
	);
}

export default App;
