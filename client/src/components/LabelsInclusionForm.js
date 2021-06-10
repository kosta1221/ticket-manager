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
import LabelIconFilled from "@material-ui/icons/LocalOffer";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme) => ({
	labelButton: {
		margin: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(0.5)}px 0`,
		padding: 0,
		border: "none",
		background: "none !important",
	},
	labelChip: {
		[theme.breakpoints.down(500)]: {
			fontSize: "0.65rem",
			height: 26,
		},
	},
	noTransform: {
		textTransform: "none",
	},
	toggled: {
		background: `${theme.palette.primary.main} !important`,
		color: "white",
	},
	labelGroup: {
		display: "block",
	},
	includeExcludeGroup: {
		display: "flex",
		justifyContent: "space-evenly",
		margin: "5vh 0",
	},
	dialogText: {
		fontSize: "0.9rem",
	},
	exclusiveToggle: {
		flexGrow: 1,
	},
	dialogBottom: {
		display: "flex",
		margin: "2vh 0",
	},
	dialogBottomChild: {
		flexGrow: 1,
	},
	icon: {
		[theme.breakpoints.down(500)]: {
			display: "none",
		},
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

	const handleSelectNone = () => {
		setCurrentLabels([]);
	};

	const variantToRender = (label) => {
		if (currentLabels.includes(label?.text)) {
			return "default";
		} else return "outlined";
	};

	return (
		<div>
			<LabelsInclusionButton setLabelFormOpen={setLabelFormOpen}>
				<Fab size="small" color="primary" aria-label="pick labels">
					<LabelIcon />
				</Fab>
			</LabelsInclusionButton>
			<Dialog open={labelFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Which Labels to Include / Exclude?🏷️</DialogTitle>
				<DialogContent id="label-inclusion-dialogue-content">
					<DialogContentText className={classes.dialogText}>
						Please select if you'd like to include or exclude tickets based on labels. Then pick the
						labels/tags of the tickets that you'd like to include / exclude. If none are chosen, all
						tickets will be shown. Selecting every label in include mode will show only the labeled
						tickets, while doing so in exclude mode will show only labelless tickets.
					</DialogContentText>
					<ToggleButtonGroup
						className={classes.includeExcludeGroup}
						value={isLabelInclusion}
						exclusive
						onChange={handleInclusionOrExclusionChange}
						aria-label="inclusion or exclusion mode"
					>
						<ToggleButton
							className={`${classes.noTransform} ${classes.exclusiveToggle}`}
							value={true}
							aria-label="include labels"
						>
							Labels to Include
						</ToggleButton>
						<ToggleButton
							className={`${classes.noTransform} ${classes.exclusiveToggle}`}
							value={false}
							aria-label="exclude labels"
						>
							Labels to Exclude
						</ToggleButton>
					</ToggleButtonGroup>

					<ToggleButtonGroup
						className={classes.labelGroup}
						value={currentLabels}
						onChange={handleLabelsChange}
						aria-label="text formatting"
					>
						{allLabels.map((label, i) => (
							<ToggleButton
								className={`${classes.labelButton} ${classes.noTransform}`}
								key={`toggle-button-label-${i}`}
								value={label}
								aria-label={label}
								onClick={() => {}}
								color="primary"
							>
								<Chip
									key={`label-${i}`}
									className={`${classes.labelChip} label`}
									label={label}
									onClick={() => {}}
									icon={
										variantToRender(label) === "outlined" ? (
											<LabelIconFilled fontSize="small" className={classes.icon} />
										) : (
											<LabelIcon fontSize="small" className={classes.icon} />
										)
									}
									variant={variantToRender(label)}
									color="primary"
								></Chip>
							</ToggleButton>
						))}
					</ToggleButtonGroup>
					<div className={classes.dialogBottom}>
						<Chip
							className={`label ${classes.dialogBottomChild}`}
							label="Select None"
							onClick={() => {
								handleSelectNone();
							}}
							variant="outlined"
							color="secondary"
						></Chip>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default SortTicketsForm;
