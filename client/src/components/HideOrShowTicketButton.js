import React from "react";

import { IconButton } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityOnIcon from "@material-ui/icons/Visibility";

function HideOrShowTicketButton({
	ticketsToRenderKeyword,
	handleHideTicketClick,
	handleShowTicketClick,
}) {
	if (ticketsToRenderKeyword === "hidden") {
		return (
			<div>
				<IconButton
					aria-label="show ticket"
					className="hideTicketButton"
					onClick={handleShowTicketClick}
				>
					<VisibilityOnIcon />
				</IconButton>
			</div>
		);
	} else {
		return (
			<div>
				<IconButton
					aria-label="hide ticket"
					className="hideTicketButton"
					onClick={handleHideTicketClick}
				>
					<VisibilityOffIcon />
				</IconButton>
			</div>
		);
	}
}

export default HideOrShowTicketButton;
