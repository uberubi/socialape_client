import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from "../utils/myButton";
import { withStyles } from "@material-ui/core";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

const DeleteScream = ({ screamId, classes, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteScream = () => {
    props.deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClick={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
