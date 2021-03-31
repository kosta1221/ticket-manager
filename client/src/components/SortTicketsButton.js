import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(8),
		left: theme.spacing(2),
	},
}));

function SortTicketButton({ children, setSortFormOpen }) {
	const classes = useStyles();

	const handleSortFormOpen = () => {
		setSortFormOpen(true);
	};

	return (
		<Zoom in={true}>
			<div onClick={handleSortFormOpen} role="button" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export default SortTicketButton;
