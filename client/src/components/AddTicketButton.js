import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(2),
		left: theme.spacing(2),
	},
}));

function AddTicketButton({ children, setAddFormOpen }) {
	const classes = useStyles();

	const handleClickOpen = () => {
		setAddFormOpen(true);
	};

	return (
		<Zoom in={true}>
			<div onClick={handleClickOpen} role="button" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export default AddTicketButton;
