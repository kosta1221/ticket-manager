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
		event.target.closest(".ticket").style.display = "none";
		console.log(event.target.closest(".ticket"));

		const newHiddenTickets = [...hiddenTickets];
		newHiddenTickets.push(event.target.closest(".ticket"));

		setHiddenTickets(newHiddenTickets);
		setHideTicketsCounter(hideTicketsCounter + 1);
	};

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
					{ticket.labels.map((label, i) => (
						<span key={`label-${i}`} className="label">
							{`${label} `}
						</span>
					))}
				</p>
			</section>
		</div>
	);
}

export default Tickets;
