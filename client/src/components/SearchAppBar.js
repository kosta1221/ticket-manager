import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		textAlign: "left",
		position: "sticky",
		top: "0",
		zIndex: 10,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	formControl: {
		margin: theme.spacing(1),
	},
}));

export default function SearchAppBar({
	setInput,
	searchBy,
	setSearchBy,
	setTicketsToRenderKeyword,
}) {
	const classes = useStyles();

	// Set the initial state of the drawer to not show
	const [drawerShowed, setDrawerShowed] = useState(false);

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	const handleSelectChange = (event) => {
		setSearchBy(event.target.value);
	};

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setDrawerShowed(open);
	};

	return (
		<div className={classes.root}>
			<AppBar position="sticky" top={0}>
				<Drawer
					drawerShowed={drawerShowed}
					setDrawerShowed={setDrawerShowed}
					setTicketsToRenderKeyword={setTicketsToRenderKeyword}
				/>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						onClick={toggleDrawer(true)}
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Kosta's Ticket Manager
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							id="searchInput"
							label="Search"
							onChange={handleInputChange}
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<FormControl className={classes.formControl}>
						<InputLabel shrink id="demo-simple-select-placeholder-label-label">
							Search By...
						</InputLabel>
						<Select
							labelId="demo-simple-select-placeholder-label-label"
							id="demo-simple-select-placeholder-label"
							value={searchBy}
							onChange={handleSelectChange}
							displayEmpty
						>
							<MenuItem value="title">
								<em>Title</em>
							</MenuItem>
							<MenuItem value={"content"}>Content</MenuItem>
							<MenuItem value={"userEmail"}>Author's E-mail</MenuItem>
						</Select>
					</FormControl>
				</Toolbar>
			</AppBar>
		</div>
	);
}
