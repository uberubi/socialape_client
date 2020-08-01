import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import MyButton from "../../utils/myButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//MUI STUFF
import {
  withStyles,
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
// MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";

const ScreamDialog = ({
  classes,
  scream,
  UI: { loading },
  screamId,
  userHandle,
  openDialog,
  getScream,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('')
  const [newPath, setNewPath] = useState('')

  const handleOpen = useCallback(() => {
    const oldPathFromHistory= window.location.pathname
    const newPathToHistory = `/users/${userHandle}/scream/${screamId}`
    window.history.pushState(null, null, newPathToHistory)
    setOpen(true);
    setOldPath(oldPathFromHistory)
    setNewPath(newPathToHistory)
    getScream(screamId);
  }, [screamId, userHandle, getScream])

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [openDialog, handleOpen]);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false);
    props.clearErrors();
  };



  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={4}>
      <Grid item sm={5}>
        <img src={scream.userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${scream.userHandle}`}
        >
          @{scream.userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography cariant="body1">{scream.body}</Typography>
        <LikeButton screamId={scream.screamId} />
        <span>{scream.likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{scream.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={scream.screamId} />
      <Comments comments={scream.comments} />
    </Grid>
  );

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

const styles = (theme) => ({
  ...theme.spreadTheme,

  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
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
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));


// const ScreamDialog = ({
//   classes,
//   scream: {
//     screamId,
//     body,
//     createdAt,
//     likeCount,
//     commentCount,
//     userImage,
//     userHandle,
//     comments,
//   },
//   UI: { loading },
//   screamIdFromScream,
//   openDialog,
//   getScream,
//   ...props
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = useCallback(() => {

//     setOpen(true);
//     getScream(screamIdFromScream);
//   }, [screamIdFromScream, getScream]);

//   useEffect(() => {
//     if (openDialog) {
//       handleOpen();
//     }
//   }, [openDialog, handleOpen]);

//   const handleClose = () => {
//     setOpen(false);
//     props.clearErrors();
//   };



//   const dialogMarkup = loading ? (
//     <div className={classes.spinnerDiv}>
//       <CircularProgress size={200} thickness={2} />
//     </div>
//   ) : (
//     <Grid container spacing={4}>
//       <Grid item sm={5}>
//         <img src={userImage} alt="Profile" className={classes.profileImage} />
//       </Grid>
//       <Grid item sm={7}>
//         <Typography
//           component={Link}
//           color="primary"
//           variant="h5"
//           to={`/users/${userHandle}`}
//         >
//           @{userHandle}
//         </Typography>
//         <hr className={classes.invisibleSeparator} />
//         <Typography variant="body2" color="textSecondary">
//           {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
//         </Typography>
//         <hr className={classes.invisibleSeparator} />
//         <Typography cariant="body1">{body}</Typography>
//         <LikeButton screamId={screamId} />
//         <span>{likeCount} likes</span>
//         <MyButton tip="comments">
//           <ChatIcon color="primary" />
//         </MyButton>
//         <span>{commentCount} comments</span>
//       </Grid>
//       <hr className={classes.visibleSeparator} />
//       <CommentForm screamId={screamId} />
//       <Comments comments={comments} />
//     </Grid>
//   );