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
}) {
	let ticketsToRender = [...tickets];
	if (ticketsToRenderKeyword === "done") {
		ticketsToRender = ticketsToRender.filter((ticket) => ticket.done === true);
	} else if (ticketsToRenderKeyword === "undone") {
		ticketsToRender = ticketsToRender.filter((ticket) => ticket.done === false);
	} else if (ticketsToRenderKeyword === "hidden") {
		ticketsToRender = [...hiddenTickets.tickets];
	}
	console.log(ticketsToRenderKeyword);
	console.log(ticketsToRender);

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
