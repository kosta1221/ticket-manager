import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import SortIcon from "@material-ui/icons/Sort";
import LabelsInclusionButton from "./LabelsInclusionButton";
import { Fab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import LabelIcon from "@material-ui/icons/LocalOfferOutlined";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
	},
}));

function SortTicketsForm({ tickets, labelFormOpen, setLabelFormOpen }) {
	const classes = useStyles();

	const handleClose = () => {
		setLabelFormOpen(false);
	};

	return (
		<div>
			<LabelsInclusionButton setLabelFormOpen={setLabelFormOpen}>
				<Fab size="small" color="primary" aria-label="pick labels">
					<LabelIcon />
				</Fab>
			</LabelsInclusionButton>
			<Dialog open={labelFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Which Labels to Include?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please select the labels/tags of the tickets that you'd like to include. If none are
						chosen, all tickets will be shown.
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default SortTicketsForm;
