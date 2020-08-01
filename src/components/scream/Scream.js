import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../utils/myButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const Scream = ({
  classes,
  scream: {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  },
  user: {
    likes,
    authenticated,
    credentials: { handle },
  },
  openDialog,
  ...props
}) => {

  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId}/>
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
