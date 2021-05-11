import React from "react";
import Ticket from "./Ticket";

import Loader from "react-loader-spinner";

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
	ticketsLoading,
	setTicketsLoading,
}) {
	// console.log(ticketsToRenderKeyword);
	// console.log("hidden tickets: ", hiddenTickets);

	if (ticketsLoading) {
		return <Loader type="MutatingDots" color="#00BFFF" height={100} width={100} />;
	} else {
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
							ticketsToRenderKeyword={ticketsToRenderKeyword}
						/>
					);
				})}
			</div>
		);
	}
}

export default Tickets;
