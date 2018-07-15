import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import BookIcon from '@material-ui/icons/LibraryBooks';
import MyAccountIcon from '@material-ui/icons/AccountCircle';
import FavouriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetDividers(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <BookIcon />
          </Avatar>
          <ListItemText primary="My Books" secondary="Last Read: July 14th, 2018" />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <MyAccountIcon />
          </Avatar>
          <ListItemText primary="My Account" secondary="Last log in: July 14th, 2018" />
        </ListItem>
        <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <FavouriteIcon />
          </Avatar>
          <ListItemText primary="Favourites" secondary="My favourite books" />
        </ListItem>
      <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <PeopleIcon />
          </Avatar>
          <ListItemText primary="Transfer" secondary="Sell my books" />
        </ListItem>
      </List>
    </div>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);