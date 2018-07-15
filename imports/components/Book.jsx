import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './Modal';
import Favourite from '@material-ui/icons/FavoriteBorder';


const styles = {
  card: {
    width: '345px',
  },
  media: {
    height: '80px',
    paddingTop: '56.25%', // 16:9
  },
};


function SimpleBookCard(props){
  const { classes, book } = props;
  const {title, imagePath, description} = book;

  
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image = {imagePath}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            More Info
          </Button>
          <Modal book={book} />
         <Favourite style={{marginLeft: 'auto'}}>112 </Favourite>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleBookCard.propTypes = {
  classes: PropTypes.object.isRequired,
  imagePath: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default withStyles(styles)(SimpleBookCard);