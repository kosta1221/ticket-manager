import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, IconButton, CardActions } from "@material-ui/core";
import { deleteTicket, toggleTicketDone } from "../utils";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";
import MarkAsUndoneIcon from "@material-ui/icons/HighlightOff";
import Chip from "@material-ui/core/Chip";

import HideOrShowTicketButton from "./HideOrShowTicketButton";

import Loader from "react-loader-spinner";

function Ticket({
	ticket,
	tickets,
	setTickets,
	hideTicketsCounter,
	setHideTicketsCounter,
	hiddenTickets,
	setHiddenTickets,
	ticketsToRenderKeyword,
}) {
	const [done, setDone] = useState(ticket.done);
	const [ticketLoading, setTicketLoading] = useState(false);

	useEffect(() => {
		setDone(ticket.done);
	}, [ticket]);

	const creationTime = new Date(ticket.creationTime).toLocaleString();

	const handleHideTicketClick = (event) => {
		console.log("ticket to hide:", ticket);

		const newHiddenTickets = [...hiddenTickets, ticket];

		console.log(newHiddenTickets);
		setHiddenTickets(newHiddenTickets);
		setHideTicketsCounter(hideTicketsCounter + 1);
	};

	const handleShowTicketClick = (event) => {
		console.log("ticket to show:", ticket);

		const newHiddenTickets = hiddenTickets.filter((hiddenTicket) => hiddenTicket.id !== ticket.id);

		console.log(newHiddenTickets);
		setHiddenTickets(newHiddenTickets);
		setHideTicketsCounter(hideTicketsCounter - 1);
	};

	const handleDeleteTicket = async (event) => {
		setTicketLoading(true);
		await deleteTicket(ticket.id, tickets, setTickets);
		setTicketLoading(false);
	};

	const handleDoneToggle = async (event) => {
		setTicketLoading(true);
		await toggleTicketDone(ticket.id, done, setDone, tickets, setTickets);
		setTicketLoading(false);
	};

	const labelArray = ticket.labels ? ticket.labels : [];

	if (done) {
		if (ticketLoading) {
			return <Loader type="MutatingDots" color="#00BFFF" height={100} width={100} />;
		} else {
			return (
				<Card className="ticket done" elevation={6}>
					<CardContent>
						<HideOrShowTicketButton
							ticketsToRenderKeyword={ticketsToRenderKeyword}
							handleHideTicketClick={handleHideTicketClick}
							handleShowTicketClick={handleShowTicketClick}
						/>
						<h2>{ticket.title}</h2>
						<p>{ticket.content}</p>
						<section className="info-section">
							<p>
								By <span>{ticket.userEmail}</span> | <span>{creationTime}</span>
							</p>

							<div>
								{labelArray.map((label, i) => (
									<Chip
										key={`label-${i}`}
										className="label"
										label={label}
										onClick={() => {}}
										color="primary"
									></Chip>
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
		}
	} else {
		if (ticketLoading) {
			return <Loader type="MutatingDots" color="#00BFFF" height={100} width={100} />;
		} else {
			return (
				<Card className="ticket" elevation={6}>
					<CardContent>
						<HideOrShowTicketButton
							ticketsToRenderKeyword={ticketsToRenderKeyword}
							handleHideTicketClick={handleHideTicketClick}
							handleShowTicketClick={handleShowTicketClick}
						/>
						<h2>{ticket.title}</h2>
						<p>{ticket.content}</p>
						<section className="info-section">
							<p>
								By <span>{ticket.userEmail}</span> | <span>{creationTime}</span>
							</p>

							<div>
								{labelArray.map((label, i) => (
									<Chip
										key={`label-${i}`}
										className="label"
										label={label}
										onClick={() => {}}
										color="primary"
									></Chip>
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
}

export default Ticket;
