import React from 'react';
import PropTypes from 'prop-types';
import Book from '../components/Book'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// const bookData = require('../BookList/books.json');
// const bookList = bookData['books'];
// const paths = bookList.map(book => require(book.imagePath));
// console.log(bookList);

const styles = theme => ({
    root: {
      flexGrow: 1,
    //   padding: 'none',
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });
  

const BookList = (props) => {
    const { classes, bookList } = props;
    const books = bookList.map(book => {
        return (
            <Grid item xs key={book.author} style={{marginTop: '30px'}}>
                < Book book={book}
                       key={book.title}>
                </Book>
            </Grid>
    );
    });
    return(
        <div className={classes.root}>
      <Grid container spacing={24} alignItems="center">
        {books}
      </Grid>
    </div>
    )
}
export default withStyles(styles)(BookList);