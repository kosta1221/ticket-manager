import React from "react";
import Ticket from "./Ticket";

function Tickets({ tickets, hideTicketsCounter, setHideTicketsCounter }) {
	return (
		<div>
			{tickets.map((ticket, i) => (
				<Ticket
					key={`ticket-${i}`}
					ticket={ticket}
					hideTicketsCounter={hideTicketsCounter}
					setHideTicketsCounter={setHideTicketsCounter}
				/>
			))}
		</div>
	);
}

export default Tickets;
