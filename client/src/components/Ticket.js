import React from "react";
import { Button, Card, CardContent, IconButton, CardActions } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";

function Ticket({
	ticket,
	hideTicketsCounter,
	setHideTicketsCounter,
	hiddenTickets,
	setHiddenTickets,
}) {
	const creationTime = new Date(ticket.creationTime).toLocaleString();

	const handleHideTicketClick = (event) => {
		const ticketElement = event.target.closest(".ticket");
		ticketElement.style.display = "none";
		ticketElement.classList.remove("ticket");
		console.log(ticket);

		const newHiddenTickets = [...hiddenTickets];
		newHiddenTickets.push(ticketElement);

		setHiddenTickets(newHiddenTickets);
		setHideTicketsCounter(hideTicketsCounter + 1);
	};

	const labelArray = ticket.labels ? ticket.labels : [];

	return (
		<Card className="ticket" elevation={6} classes={{ root: "ticket" }}>
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
					<IconButton aria-label="delete ticket">
						<DeleteIcon />
					</IconButton>
					<IconButton aria-label="mark as done">
						<CheckCircle />
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	);
}

export default Ticket;
