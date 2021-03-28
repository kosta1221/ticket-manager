import React, { useState } from "react";
import { Button, Card, CardContent, IconButton, CardActions } from "@material-ui/core";
import { deleteTicket, toggleTicketDone } from "../utils";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";
import MarkAsUndoneIcon from "@material-ui/icons/HighlightOff";

function Ticket({
	ticket,
	tickets,
	setTickets,
	hideTicketsCounter,
	setHideTicketsCounter,
	hiddenTickets,
	setHiddenTickets,
}) {
	const [done, setDone] = useState(ticket.done);

	const creationTime = new Date(ticket.creationTime).toLocaleString();

	const handleHideTicketClick = (event) => {
		const ticketElement = event.target.closest(".ticket");
		ticketElement.style.display = "none";
		ticketElement.classList.remove("ticket");
		console.log(ticket);

		const newHiddenTickets = {
			tickets: [...hiddenTickets.tickets, ticket],
			ticketElements: [...hiddenTickets.ticketElements, ticketElement],
		};

		console.log(newHiddenTickets);
		setHiddenTickets(newHiddenTickets);
		setHideTicketsCounter(hideTicketsCounter + 1);
	};

	const handleDeleteTicket = async (event) => {
		await deleteTicket(ticket.id, tickets, setTickets);
	};

	const handleDoneToggle = async (event) => {
		await toggleTicketDone(ticket.id, done, setDone);
	};

	const labelArray = ticket.labels ? ticket.labels : [];

	if (done) {
		return (
			<Card className="ticket done" elevation={6}>
				<CardContent>
					<Button className="hideTicketButton" onClick={handleHideTicketClick}>
						Hide
					</Button>
					<h2>{ticket.title}</h2>
					<p>{ticket.content}</p>
					<section className="info-section">
						<p>
							By <span>{ticket.userEmail}</span> | <span>{creationTime}</span>
						</p>

						<div>
							{labelArray.map((label, i) => (
								<Button
									key={`label-${i}`}
									className="label"
									variant="contained"
									size="small"
									color="primary"
								>
									{label}
								</Button>
							))}
						</div>
					</section>
					<CardActions disableSpacing>
						<IconButton aria-label="delete ticket" onClick={handleDeleteTicket}>
							<DeleteIcon />
						</IconButton>
						<IconButton aria-label="mark as undone" onClick={handleDoneToggle}>
							<MarkAsUndoneIcon />
						</IconButton>
					</CardActions>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card className="ticket" elevation={6}>
				<CardContent>
					<Button className="hideTicketButton" onClick={handleHideTicketClick}>
						Hide
					</Button>
					<h2>{ticket.title}</h2>
					<p>{ticket.content}</p>
					<section className="info-section">
						<p>
							By <span>{ticket.userEmail}</span> | <span>{creationTime}</span>
						</p>

						<div>
							{labelArray.map((label, i) => (
								<Button
									key={`label-${i}`}
									className="label"
									variant="outlined"
									size="small"
									color="primary"
								>
									{label}
								</Button>
							))}
						</div>
					</section>
					<CardActions disableSpacing>
						<IconButton aria-label="delete ticket" onClick={handleDeleteTicket}>
							<DeleteIcon />
						</IconButton>
						<IconButton aria-label="mark as done" onClick={handleDoneToggle}>
							<CheckCircle />
						</IconButton>
					</CardActions>
				</CardContent>
			</Card>
		);
	}
}

export default Ticket;
