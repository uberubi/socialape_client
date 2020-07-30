import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// MUI stuff
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import MyButton from "../utils/myButton";
import { postScream, clearErrors } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const PostScream = ({ classes, UI, ...props }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }

    if (!UI.errors && !UI.loading) {
      setBody("");
      setOpen(false);
      setErrors({});
    }
  }, [UI.errors, UI.loading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.clearErrors();
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postScream({ body });
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <>
      <MyButton onClick={handleOpen} tip="Post a scream!">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const styles = (theme) => ({
  ...theme.spreadTheme,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
