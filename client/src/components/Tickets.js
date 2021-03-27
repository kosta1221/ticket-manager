import React from "react";
import Ticket from "./Ticket";

function Tickets({
	tickets,
	setTickets,
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
					tickets={tickets}
					setTickets={setTickets}
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
