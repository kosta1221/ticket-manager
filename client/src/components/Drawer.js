import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import CheckCircle from "@material-ui/icons/CheckCircle";
import MarkAsUndoneIcon from "@material-ui/icons/HighlightOff";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles({
	left: {
		width: 250,
	},
});

function Drawer({ drawerShowed, setDrawerShowed, setTicketsToRenderKeyword }) {
	const classes = useStyles();

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setDrawerShowed(open);
	};

	const list = () => (
		<div
			className={clsx(classes.left)}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{["All Tickets", "Done", "Undone"].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={() => {
							console.log(["all", "done", "undone"][index]);
							setTicketsToRenderKeyword(["all", "done", "undone"][index]);
						}}
					>
						<ListItemIcon>
							{index % 3 === 0 ? (
								<InboxIcon />
							) : index % 2 === 0 ? (
								<MarkAsUndoneIcon />
							) : (
								<CheckCircle />
							)}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Hidden Tickets"].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={() => {
							setTicketsToRenderKeyword("hidden");
						}}
					>
						<ListItemIcon>{<VisibilityOffIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<React.Fragment>
			<SwipeableDrawer
				open={drawerShowed}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				{list()}
			</SwipeableDrawer>
		</React.Fragment>
	);
}

export default Drawer;
