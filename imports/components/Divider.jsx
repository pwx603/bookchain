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
import Book from './Book';
import Document from './Document';

 /// TODO: UPDATE ME !!!!!
// import samplePDF from '../../public/asset/test.pdf';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
  },
});

const bookProps = {
  title: "The Hunger Games",
  imagePath: "../asset/books/images/hunger.png",
  description: "The book follows the story of a young female protagonist, Katniss Everdeen. She is born in a poor sector of her society and she voluntarily participates in a yearly battle royale between sectors of her society to protect her younger sister.",
  price: 10,
}

function InsetDividers(props) {
  const { classes } = props;
  let bookSelect = false;
  // const renderDoc = () => {
  //   return (
      
  //   )
  // }
  return (
    <div className={classes.root} style={{display: 'inline-flex'}}>
      <List style={{display: 'inline-block'}}>
        <ListItem style={{width: '300px'}}>
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
      <Book book={bookProps} onClick={console.log('clicked')}/>
      {bookSelect && <Document style={{display: 'inline-flex'}}/>}
    </div>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);