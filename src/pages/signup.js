import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
// MUI stuff
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
// Redux stuff

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({ ...theme.spreadTheme });

const Signup = ({ classes, UI, ...props }) => {
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    props.signupUser(newUserData, props.history);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(errors);
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="app icon" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={newUserData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={newUserData.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm assword"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={newUserData.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={newUserData.handle}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={UI.loading}
          >
            Sign Up
            {UI.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
