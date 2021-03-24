import React from "react";
import Ticket from "./Ticket";

function Tickets({
	tickets,
	hideTicketsCounter,
	setHideTicketsCounter,
	hiddenTickets,
	setHiddenTickets,
}) {
	return (
		<div>
			{tickets.map((ticket, i) => (
				<Ticket
					key={`ticket-${i}`}
					ticket={ticket}
					hideTicketsCounter={hideTicketsCounter}
					setHideTicketsCounter={setHideTicketsCounter}
					hiddenTickets={hiddenTickets}
					setHiddenTickets={setHiddenTickets}
				/>
			))}
		</div>
	);
}

export default Tickets;
