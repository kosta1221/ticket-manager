import React from "react";

function Tickets({ ticket }) {
	const creationTime = new Date(ticket.creationTime).toLocaleString();

	return (
		<div className="ticket">
			<h1>{ticket.title}</h1>
			<p>{ticket.content}</p>
			<p>
				By <span>{ticket.userEmail}</span> | <span>{creationTime}</span>
			</p>
		</div>
	);
}

export default Tickets;
