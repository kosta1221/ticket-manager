import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";

import LabelsInclusionButton from "./LabelsInclusionButton";
import { Fab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import LabelIcon from "@material-ui/icons/LocalOfferOutlined";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme) => ({
	label: {
		margin: theme.spacing(0.5),
		padding: 0,
		border: "none",
		background: "none !important",
	},
	noTransform: {
		textTransform: "none",
	},
	toggled: {
		background: `${theme.palette.primary.main} !important`,
		color: "white",
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
				<DialogTitle id="form-dialog-title">Which Labels to Include / Exclude?</DialogTitle>
				<DialogContent id="label-inclusion-dialogue-content">
					<DialogContentText>
						Please select if you'd like to include or exclude ticket based on labels. Then pick the
						labels/tags of the tickets that you'd like to include / exclude. If none are chosen, all
						tickets will be shown. Selecting every label in include mode will show only the labeled
						tickets, while doing so in exclude mode will show only labelless tickets.
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
								onClick={(e) => {
									e.target.closest("DIV").classList.toggle(classes.toggled);
								}}
								color="primary"
							>
								<Chip
									key={`label-${i}`}
									className="label"
									label={label}
									onClick={() => {}}
									variant="outlined"
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
