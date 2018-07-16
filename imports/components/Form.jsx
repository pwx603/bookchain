import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import Icon from '@material-ui/core/Icon';
import web3 from "../utility/web3"
import contract from "../utility/contract"

import { withTracker } from 'meteor/react-meteor-data';

import { Booklist } from '../api/booklist'

import { bytecode } from '../utility/abi'
import { data } from '../utility/data'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Form extends React.Component {
  state = {
    name: '',
    author: '',
    isbn: '',
    price: '',
    contractAdr: '',
    usedPrice: '',
    authorCut: '',
    description: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = async () => {
    this.props.booklist.map((book) => {
      console.log("hello")
      console.log(book);
    })

    let accounts = await web3.eth.getAccounts();

    web3.eth.defaultAccount = accounts[0];

    var name = this.state.name;
    var symbol = this.state.isbn;
    var author = this.state.author;
    var bookipfs = this.props.state.bookipfs;
    var keyipfs = this.props.state.keyipfs;
    var iv = this.props.state.iv;
    var price = this.state.price;
    var usedPrice = this.state.usedPrice;
    var authorCut = this.state.authorCut;

    console.log(name, symbol,
      author,
      bookipfs,
      keyipfs,
      iv,
      price,
      usedPrice,
      authorCut)


    try{

    let result = await contract.deploy({arguments: [name, symbol,
      author,
      bookipfs,
      keyipfs,
      iv,
      price,
      usedPrice,
      authorCut]}).send({from: accounts[0]});

      await this.setState({
        contractAdr: result.options.address
      })

      await Booklist.insert({
        title: this.state.name,
        price: this.state.price,
        contractAdr: this.state.contractAdr,
        createdAt: new Date(), // current time
        description: "machohack is awesome",
        imagePath: "asset/books/images/hunger.png"
      });
      console.log(result.options.address)


    }catch(err){
      console.log(result);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
          <TextField
          required
          id="title"
          label="Book Title"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
        required
          id="author"
          label="Author"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleChange('author')}
          margin="normal"
        />
        <TextField
        required
          id="isbn"
          label="ISBN"
          value={this.state.isbn}
          onChange={this.handleChange('isbn')}
          className={classes.textField}
          margin="normal"
        />


        <TextField
        required
          id="price"
          label="Price"
          value={this.state.price}
          onChange={this.handleChange('price')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

                <TextField
        required
          id="usedPrice"
          label="Used Book Price"
          value={this.state.usedPrice}
          onChange={this.handleChange('usedPrice')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />


                <TextField
        required
          id="authorCut"
          label="Author Cut"
          value={this.state.authorCut}
          onChange={this.handleChange('authorCut')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />


        <TextField
        disabled
          id="contractAdr"
          label="Contract Address"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.contractAdr}
          onChange={this.handleChange('contractAdr')}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" size="large" color="primary" onClick={this.onSubmit}>
          Submit
        <Icon>send</Icon>
        </Button>
      </form>
    );
  }
}


// export default withStyles(styles)(TextFields);

export default withTracker(() => {
  return {
    booklist: Booklist.find({}).fetch(),
  };
})(withStyles(styles)(Form));