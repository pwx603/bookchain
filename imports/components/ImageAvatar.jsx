
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import Cart from '@material-ui/icons/AddShoppingCart';

const styles = {
  row: {
    display: 'inline-flex',
    justifyContent: 'center',
    marginLeft: 'auto', 
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Cart style={{marginRight :'10px'}}/>
      <MailIcon style={{marginRight :'10px'}}/>
      <Avatar alt="Vincy Sharp" src = 'asset/images/vincy.png' className={classes.avatar} />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);