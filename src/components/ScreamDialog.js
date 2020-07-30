import React, { useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../utils/myButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
//MUI STUFF
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
// MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
// Redux stuff
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const ScreamDialog = ({
  classes,
  scream: {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCountm,
    userImage,
    userHandle,
  },
  UI: { loading },
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.getScream(props.screamId);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <CircularProgress size={200}/>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage}/>
      </Grid>
      <Grid item sm={7}>
        <Typography 
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary" >
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography cariant="body1">
            {body}
          </Typography>
      </Grid>
    </Grid>
  )

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

const styles = theme =>({
  ...theme.spreadTheme,
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  }
})

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
