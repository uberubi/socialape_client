import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI stuff
import  {Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { markNotificationsRead } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const Notifications = ({ notifications, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  dayjs.extend(relativeTime)

  const handleOpen = e => {
    setAnchorEl(e.target)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications.filter(not => !not.read)
    .map(not => not.notificationId)
    props.markNotificationsRead(unreadNotificationsIds)
  }

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup = notifications && notifications.length > 0 ? (
    notifications.map(not => {
      const verb = not.type === 'like' ? 'liked' : 'commented on'
      const time = dayjs(not.createdAt).fromNow()
      const iconColor = not.read ? 'primary' : 'secondary'
      const icon = not.type === 'like' ? (
        <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
      ) : (
        <ChatIcon color={iconColor} style={{marginRight: 10}} />
      )

      return (
        <MenuItem key={not.createdAt} onClick={handleClose}>
          {icon}
          <Typography
            component={Link}
            color="default"
            variant="body1"
            to={`/users/${not.recipient}/scream/${not.screamId}`}>
              {not.sender} {verb} your scream {time}
            </Typography>
        </MenuItem>
      )
    })
  ) : (
    <MenuItem onClick={handleClose}>
      You have no notifications
    </MenuItem>
  )

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
