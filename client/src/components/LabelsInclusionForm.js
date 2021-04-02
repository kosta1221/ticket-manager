import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import SortIcon from "@material-ui/icons/Sort";
import LabelsInclusionButton from "./LabelsInclusionButton";
import { Fab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import LabelIcon from "@material-ui/icons/LocalOfferOutlined";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme) => ({
	label: {
		margin: theme.spacing(0.3),
	},
	noTransform: {
		textTransform: "none",
	},
}));

function SortTicketsForm({
	labelFormOpen,
	setLabelFormOpen,
	allLabels,
	currentLabels,
	setCurrentLabels,
	isLabelInclusion,
	setIsLabelInclusion,
}) {
	const classes = useStyles();

	const handleClose = () => {
		setLabelFormOpen(false);
	};

	const handleInclusionOrExclusionChange = (event, newMode) => {
		setIsLabelInclusion(newMode);
	};

	const handleLabelsChange = (event, newLabels) => {
		setCurrentLabels(newLabels);
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
					<ToggleButtonGroup
						value={isLabelInclusion}
						exclusive
						onChange={handleInclusionOrExclusionChange}
						aria-label="inclusion or exclusion mode"
					>
						<ToggleButton className={classes.noTransform} value={true} aria-label="include labels">
							Labels to Include
						</ToggleButton>
						<ToggleButton className={classes.noTransform} value={false} aria-label="exclude labels">
							Labels to Exclude
						</ToggleButton>
					</ToggleButtonGroup>

					<ToggleButtonGroup
						value={currentLabels}
						onChange={handleLabelsChange}
						aria-label="text formatting"
					>
						{allLabels.map((label, i) => (
							<ToggleButton
								className={`${classes.label} ${classes.noTransform}`}
								key={`toggle-button-label-${i}`}
								value={label}
								aria-label={label}
								onClick={() => {}}
								color="primary"
							>
								<Chip
									key={`label-${i}`}
									className="label"
									label={label}
									onClick={() => {}}
									color="primary"
								></Chip>
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default SortTicketsForm;
