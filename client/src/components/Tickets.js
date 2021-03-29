import React from "react";
import Ticket from "./Ticket";

function Tickets({
	tickets,
	setTickets,
	hideTicketsCounter,
	setHideTicketsCounter,
	hiddenTickets,
	setHiddenTickets,
	ticketsToRenderKeyword,
	setTicketsToRenderKeyword,
	ticketsToRender,
}) {
	console.log(ticketsToRenderKeyword);
	console.log(hiddenTickets);

	return (
		<div>
			{ticketsToRender.map((ticket, i) => {
				return (
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
				);
			})}
		</div>
	);
}

export default Tickets;
