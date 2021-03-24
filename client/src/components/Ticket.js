import React from "react";

function Tickets({ ticket }) {
	const creationTime = new Date(ticket.creationTime).toLocaleString();

	return (
		<div className="ticket">
			<h1>{ticket.title}</h1>
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
