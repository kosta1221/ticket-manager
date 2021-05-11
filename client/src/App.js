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
import SortTicketsForm from "./components/SortTicketsForm";
import LabelInclusionForm from "./components/LabelsInclusionForm";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const initialTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#562500",
		},
		secondary: {
			main: "#d32f2f",
		},
		doneGreen: {
			main: "green",
		},
		ticketBackground: "#f6f5d7",
		background: "linear-gradient(90.5deg, rgba(252, 176, 69, 1) 0%, rgba(243, 244, 99, 1) 100%)",
	},
});

function App() {
	const [theme, setTheme] = useState(initialTheme);

	const useStyles = makeStyles(() => ({
		App: {
			background: theme.palette.background,
		},
	}));

	const classes = useStyles();

	const [allLabels, setAllLabels] = useState([]);
	const [currentLabels, setCurrentLabels] = useState([]);
	const [isLabelInclusion, setIsLabelInclusion] = useState(true);

	const [addFormOpen, setAddFormOpen] = useState(false);
	const [addFormPosted, setAddFormPosted] = useState(false);
	const [sortFormOpen, setSortFormOpen] = useState(false);
	const [labelFormOpen, setLabelFormOpen] = useState(false);

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
	const [sortBy, setSortBy] = useState("date");
	const [sortingOrder, setSortingOrder] = useState("ascending");

	const hiddenTicketsInfo = useRef(null);
	const labelModeKeyword = isLabelInclusion ? "including" : "excluding";
	const labelModeLengthKeyword =
		isLabelInclusion && currentLabels.length === 0 ? "all" : currentLabels.length;

	// This useEffect runs on changes to input, searchBy. it fetches the tickets from database, and sorts them according to sortingOrder and sortBy.
	useEffect(() => {
		setTicketsLoading(true);
		fetchTickets(setTickets, input, searchBy).then((fetchedTickets) => {
			setTicketsLoading(false);

			if (fetchedTickets) {
				handleSort(fetchedTickets);
				setAllLabels(
					Array.prototype.concat
						.apply(
							[],
							fetchedTickets.map((ticket) => ticket.labels)
						)
						.filter(
							(label, i, allLabelsWithDuplicates) => allLabelsWithDuplicates.indexOf(label) === i
						)
						.sort()
				);
			}
		});
	}, [input, searchBy]);

	// This useEffect runs on addFormPosted, and I added a condition so that it runs only when I close the form and the form is posted successfully. What it does is fetch the tickets from database.
	useEffect(() => {
		if (!addFormOpen && addFormPosted) {
			setTicketsLoading(true);

			fetchTickets(setTickets, input, searchBy).then((fetchedTickets) => {
				setTicketsLoading(false);
				setAddFormPosted(false);

				if (fetchedTickets) {
					handleSort(fetchedTickets);
					setAllLabels(
						Array.prototype.concat
							.apply(
								[],
								fetchedTickets.map((ticket) => ticket.labels)
							)
							.filter(
								(label, i, allLabelsWithDuplicates) => allLabelsWithDuplicates.indexOf(label) === i
							)
							.sort()
					);
				}
			});
		}
	}, [addFormPosted]);

	useEffect(() => {
		setResultsCount(ticketsToRender.length);
	}, [ticketsToRender, hiddenTickets]);

	useEffect(() => {
		if (ticketsToRenderKeyword === "all") {
			setTicketsToRender(
				tickets.filter((ticket) => !hiddenTickets.includes(ticket) && ticketLabelCheck(ticket))
			);
		} else if (ticketsToRenderKeyword === "done") {
			setTicketsToRender(
				tickets.filter(
					(ticket) =>
						ticket.done === true && !hiddenTickets.includes(ticket) && ticketLabelCheck(ticket)
				)
			);
		} else if (ticketsToRenderKeyword === "undone") {
			setTicketsToRender(
				tickets.filter(
					(ticket) =>
						ticket.done === false && !hiddenTickets.includes(ticket) && ticketLabelCheck(ticket)
				)
			);
		} else if (ticketsToRenderKeyword === "hidden") {
			setTicketsToRender(hiddenTickets.filter((hiddenTicket) => ticketLabelCheck(hiddenTicket)));
		}
	}, [ticketsToRenderKeyword, tickets, hiddenTickets, currentLabels, isLabelInclusion]);

	useEffect(() => {
		setAllLabels(
			Array.prototype.concat
				.apply(
					[],
					tickets.map((ticket) => ticket.labels)
				)
				.filter((label, i, allLabelsWithDuplicates) => allLabelsWithDuplicates.indexOf(label) === i)
				.sort()
		);
	}, [tickets]);

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

	const handleSort = (ticketsToSort) => {
		console.log("sorting by:", sortBy);
		console.log("order:", sortingOrder);

		if (sortBy === "date") {
			if (sortingOrder === "ascending") {
				// Sort by creation date ascending
				setTickets([
					...ticketsToSort.sort((a, b) => {
						return a.creationTime - b.creationTime;
					}),
				]);
			} else if (sortingOrder === "descending") {
				// Sort by creation date descending
				setTickets([
					...ticketsToSort.sort((a, b) => {
						return b.creationTime - a.creationTime;
					}),
				]);
			}
			return;
		}

		if (sortingOrder === "ascending") {
			// Sort by ascending order alphabetically according to prop passed (either title, content or userEmail)
			setTickets([
				...tickets.sort((a, b) => {
					return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
				}),
			]);
		} else if (sortingOrder === "descending") {
			// Sort by descending order alphabetically according to prop passed (either title, content or userEmail)
			setTickets([
				...tickets.sort((a, b) => {
					return b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
				}),
			]);
		}
	};

	// A function for checking wheter to render a ticket or not based on included labels.
	const ticketLabelCheck = (ticket) => {
		// If no labels are selected for inclusion, I want to show all of the tickets.
		if (currentLabels.length === 0) {
			return true;
		}

		if (isLabelInclusion) {
			// If mode is inclusion based on labels, if ticket's labels includes any of the current labels, it'll pass the check.
			for (const label of currentLabels) {
				if (ticket.labels.includes(label)) {
					return true;
				}
			}

			return false;
		} else {
			// If mode is exclusion based on labels, if ticket's labels includes any of the current labels, it'll fail the check. only if it includes none of the excluded/blacklisted labels it'll pass.
			for (const label of currentLabels) {
				if (ticket.labels.includes(label)) {
					return false;
				}
			}

			return true;
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={`${classes.App} App`}>
				<SearchAppBar
					setInput={setInput}
					searchBy={searchBy}
					setSearchBy={setSearchBy}
					ticketsToRenderKeyword={ticketsToRenderKeyword}
					setTicketsToRenderKeyword={setTicketsToRenderKeyword}
					sortBy={sortBy}
					sortingOrder={sortingOrder}
					initialTheme={initialTheme}
					setTheme={setTheme}
				/>
				<section className="results-info-section" id="back-to-top-anchor">
					<p>
						<span>
							<span>{`Showing ${resultsCount} results, viewing ${ticketsToRenderKeyword}, ${labelModeKeyword} ${labelModeLengthKeyword} labels `}</span>
							<span ref={hiddenTicketsInfo}>
								{`(`}
								<span id="hideTicketsCounter">{hideTicketsCounter}</span>
								{` hidden tickets - `}
								<a id="restoreHideTickets" href="#" onClick={handleRestoreHiddenClick}>
									restore
								</a>
								)
							</span>
						</span>
						<span id="sorted-by-info">{`Sorted by: ${sortBy}, ${sortingOrder}`}</span>
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

				<LabelInclusionForm
					labelFormOpen={labelFormOpen}
					setLabelFormOpen={setLabelFormOpen}
					allLabels={allLabels}
					currentLabels={currentLabels}
					setCurrentLabels={setCurrentLabels}
					isLabelInclusion={isLabelInclusion}
					setIsLabelInclusion={setIsLabelInclusion}
				/>

				<SortTicketsForm
					sortFormOpen={sortFormOpen}
					setSortFormOpen={setSortFormOpen}
					setTickets={setTickets}
					tickets={tickets}
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortingOrder={sortingOrder}
					setSortingOrder={setSortingOrder}
					handleSort={handleSort}
				/>

				<AddTicketForm
					addFormOpen={addFormOpen}
					setAddFormOpen={setAddFormOpen}
					setAddFormPosted={setAddFormPosted}
				/>

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
