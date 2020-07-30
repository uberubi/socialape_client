import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import MyButton from "../utils/myButton";
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'


const Scream = ({
  classes,
  scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
  user: {likes, authenticated, credentials: {handle}},
  ...props
}) => {
  const likedScream = () => {
    if(likes &&  likes.find(like => like.screamId === screamId)) {
      return true
    } else {
      return false
    }
  }
  const likeScream = () => {
    props.likeScream(screamId)
  }
  const unlikeScream = () => {
    props.unlikeScream(screamId)
  }

  dayjs.extend(relativeTime);

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : (
    likedScream() ? (
      <MyButton tip="Undo like" onClick={unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
    )
  )

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId}/>
  ) : null

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
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    position: 'relative',
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
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
