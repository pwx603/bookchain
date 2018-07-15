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

class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    price: '',
    contractAdr: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = async () => {
    await Booklist.insert({
      name: this.state.name,
      price: this.state.price,
      contractAdr: this.state.contractAdr,
      createdAt: new Date(), // current time
    });
    console.log(this.state)

    this.props.booklist.map((book) => {
      console.log(book);
    })

    let accounts = await web3.eth.getAccounts();

    web3.eth.defaultAccount = accounts[0];

    var name = "Harry Potter"
    var symbol = "123";
    var author = "JK";
    var bookipfs = this.props.state.bookipfs;
    var keyipfs = this.props.state.keyipfs;
    var iv = window.crypto.getRandomValues(new Uint8Array(12));
    var price = 2000;
    var usedPrice = 1000;
    var authorCut = 200;


    try{

    let result = await contract.deploy({arguments: [name, symbol,
      author,
      bookipfs,
      keyipfs,
      iv,
      price,
      usedPrice,
      authorCut]}).send({from: accounts[0]});

      console.log(result.options.address);

    }catch(err){
      console.log(result);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="author"
          label="Author"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="isbn"
          label="ISBN"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="price"
          label="Original Price"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />


        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="contractAdr"
          label="Contract Address"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange('contractAdr')}
          helperText="Full width!"
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

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(TextFields);

export default withTracker(() => {
  return {
    booklist: Booklist.find({}).fetch(),
  };
})(withStyles(styles)(TextFields));