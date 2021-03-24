import React from "react";
import Ticket from "./Ticket";

function Tickets({ tickets }) {
	return (
		<div>
			{tickets.map((ticket, i) => (
				<Ticket key={`ticket-${i}`} ticket={ticket} />
			))}
		</div>
	);
}

export default Tickets;
