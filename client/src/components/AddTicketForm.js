import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddTicketButton from "./AddTicketButton";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { URL } from "../utils";

function AddTicketForm({ addFormOpen, setAddFormOpen }) {
	const handleClose = () => {
		setAddFormOpen(false);
	};

	return (
		<div>
			<AddTicketButton setAddFormOpen={setAddFormOpen}>
				<Fab size="small" color="primary" aria-label="add">
					<AddIcon />
				</Fab>
			</AddTicketButton>
			<Dialog open={addFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add a New Ticket...</DialogTitle>
				<DialogContent>
					<form
						id="add-ticket-form"
						action={`${URL}/tickets/new`}
						method="POST"
						// onSubmit={(e) => {
						// 	e.preventDefault();
						// 	alert("Submitted form!");
						// 	handleClose();
						// }}
					>
						<DialogContentText>
							To add a new ticket please fill out the required (*) fields. We will do our best to
							review each and every ticket! Thank you for helping us make our platform better.
						</DialogContentText>
						<TextField
							autoFocus
							name="title"
							variant="filled"
							margin="dense"
							id="title"
							label="Title"
							type="text"
							helperText="The title of the ticket"
							fullWidth
							required
						/>
						<TextField
							autoFocus
							name="content"
							variant="filled"
							margin="dense"
							id="content"
							label="Content"
							type="text"
							helperText="The content of the ticket"
							fullWidth
							multiline
							required
						/>
						<TextField
							autoFocus
							name="userEmail"
							variant="filled"
							margin="dense"
							id="name"
							label="Email Address"
							type="email"
							helperText="Your e-mail address. (only a valid e-mail address will be accepted!)"
							fullWidth
							required
						/>
						<TextField
							autoFocus
							name="labels"
							variant="filled"
							margin="dense"
							id="labels"
							label="Labels"
							type="text"
							helperText="Related labels which will be shown on the ticket. (optional)"
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" form="add-ticket-form" label="Submit" color="primary">
						Add Ticket
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default AddTicketForm;
