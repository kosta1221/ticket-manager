import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles({
	left: {
		width: 250,
	},
});

function Drawer({ drawerShowed, setDrawerShowed }) {
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
		></div>
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
