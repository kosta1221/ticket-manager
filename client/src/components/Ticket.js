import React from "react";

function Tickets({
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

		const newHiddenTickets = [...hiddenTickets];
		newHiddenTickets.push(ticketElement);

		setHiddenTickets(newHiddenTickets);
		setHideTicketsCounter(hideTicketsCounter + 1);
	};

	const labelArray = ticket.labels ? ticket.labels : [];

	return (
		<div className="ticket">
			<button className="hideTicketButton" onClick={handleHideTicketClick}>
				Hide
			</button>
			<h2>{ticket.title}</h2>
			<p>{ticket.content}</p>
			<section className="info-section">
				<p>
					By <span>{ticket.userEmail}</span> | <span>{creationTime}</span>
				</p>

				<p>
					{labelArray.map((label, i) => (
						<span key={`label-${i}`} className="label">
							{label}
						</span>
					))}
				</p>
			</section>
		</div>
	);
}

export default Tickets;
