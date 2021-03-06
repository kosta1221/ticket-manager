import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import SortIcon from "@material-ui/icons/Sort";
import SortTicketButton from "./SortTicketsButton";
import { Fab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		flexGrow: 1,
	},
	selectsDiv: {
		display: "flex",
		[theme.breakpoints.down(500)]: {
			flexDirection: "column",
		},
	},
}));

function SortTicketsForm({
	tickets,
	sortBy,
	setSortBy,
	sortingOrder,
	setSortingOrder,
	sortFormOpen,
	setSortFormOpen,
	handleSort,
}) {
	const classes = useStyles();

	// This is a textual cue for explaining that descending/ascending by title/userEmail/content means alphabetical descending/ascending, and it is added to the select's label
	const [sortingOrderAddedWord, setSortingOrderAddedWord] = useState("");

	const handleClose = () => {
		setSortFormOpen(false);
	};

	const handleSortBySelectChange = (event) => {
		setSortBy(event.target.value);

		// This is a textual cue for explaining that descending/ascending by title/userEmail/content means alphabetical descending/ascending, and it is added to the select's label
		if (event.target.value === "date") {
			setSortingOrderAddedWord("");
		} else {
			setSortingOrderAddedWord(" (Alphabetical)");
		}
	};

	const handleSortingOrderSelectChange = (event) => {
		setSortingOrder(event.target.value);
	};

	const handleSortClick = () => {
		handleSort(tickets);
		handleClose();
	};

	return (
		<div>
			<SortTicketButton setSortFormOpen={setSortFormOpen}>
				<Fab size="small" color="primary" aria-label="sort tickets">
					<SortIcon />
				</Fab>
			</SortTicketButton>
			<Dialog open={sortFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Choose Tickets' Sorting</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please select your preferred sorting order for the tickets. It will not impact them,
						just change the order in which they'll be shown on your screen.
					</DialogContentText>
					<div className={classes.selectsDiv}>
						<FormControl className={classes.formControl}>
							<InputLabel shrink id="sort-by-select-label">
								Sort By...
							</InputLabel>
							<Select
								labelId="sort-by-select-label"
								id="sort-by-select"
								value={sortBy}
								onChange={handleSortBySelectChange}
								displayEmpty
							>
								<MenuItem value={"date"}>Date</MenuItem>
								<MenuItem value={"title"}>Title</MenuItem>
								<MenuItem value={"userEmail"}>Author's Email</MenuItem>
								<MenuItem value={"content"}>Content</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel shrink id="order-select-label">
								{`Order...${sortingOrderAddedWord}`}
							</InputLabel>
							<Select
								labelId="order-select-label"
								id="order-select"
								value={sortingOrder}
								onChange={handleSortingOrderSelectChange}
								displayEmpty
							>
								<MenuItem value={"ascending"}>Ascending</MenuItem>
								<MenuItem value={"descending"}>Descending</MenuItem>
							</Select>
						</FormControl>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSortClick} color="primary">
						Sort
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default SortTicketsForm;
