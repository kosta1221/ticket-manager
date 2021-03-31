import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(8),
		left: theme.spacing(2),
	},
}));

function SortTicketButton({
	children,
	ticketsToRender,
	setTicketsToRender,
	sortingOrder,
	setSortingOrder,
}) {
	const classes = useStyles();

	const handleSortClick = () => {
		if (sortingOrder.ascending) {
			setTicketsToRender([
				...ticketsToRender.sort((a, b) => {
					return b.creationTime - a.creationTime;
				}),
			]);

			setSortingOrder({ sortBy: sortingOrder.sortBy, ascending: false });
		} else {
			setTicketsToRender([
				...ticketsToRender.sort((a, b) => {
					return a.creationTime - b.creationTime;
				}),
			]);

			setSortingOrder({ sortBy: sortingOrder.sortBy, ascending: true });
		}
	};

	return (
		<Zoom in={true}>
			<div onClick={handleSortClick} role="button" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export default SortTicketButton;
