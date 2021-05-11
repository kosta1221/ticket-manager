import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(14),
		left: theme.spacing(2),
	},
}));

function LabelsInclusionButton({ children, setLabelFormOpen }) {
	const classes = useStyles();

	const handleLabelFormOpen = () => {
		setLabelFormOpen(true);
	};

	return (
		<Zoom in={true}>
			<div onClick={handleLabelFormOpen} role="button" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export default LabelsInclusionButton;
