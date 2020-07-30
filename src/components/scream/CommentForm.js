import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// MUI stuff
import { Button, Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
//Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const CommentForm = ({ classes, authenticated, screamId, UI, ...props }) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if(!UI.errors && !UI.loading) {
      setBody('')
      setErrors({})
    }
  }, [UI.errors, UI.loading]);

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitComment(screamId, { body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.error ? true : false}
          helperText={errors.error}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

const styles = (theme) => ({
  ...theme.spreadTheme,
});

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
