import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone'
import Button from "@material-ui/core/Button"
import Icon from '@material-ui/core/Icon';

var Buffer = require('buffer/').Buffer
import ipfs from '../utility/ipfs';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withTracker } from 'meteor/react-meteor-data';
 
import { Booklist } from '../api/booklist';
import Form from '../components/Form';

const styles = theme => ({
  // root: {
  //   flexGrow: 1,
  //   backgroundColor: theme.palette.background.paper,
  // },
});

class UploadFile extends React.Component {


  state = {
    file: null,
    cipher: null,
    buffer: null,
    encryptedBuffer: null,
    keyipfs: null,

  };

  onDrop = (files) => {
    let file = files[0];
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    await this.setState({ buffer });
    console.log(this.state.buffer)
  };

  onSend = async () => {
    let data = await new Promise(this.getBuffer);
    await this.setState({
      fileBuffer: data
    })
    await this.generateCipher();
    await this.encryptData();

    console.log("hello world")
  }

  getBuffer = (resolve) => {
    var reader = new FileReader();
    reader.readAsArrayBuffer(this.state.file);
    reader.onload = function () {
      var arrayBuffer = reader.result
      resolve(arrayBuffer);
    }
  }

  encrypt = async () => {
    await this.generateCipher();
    await this.encryptData();
  }

  generateCipher = async () => {
    try {
      let cipher = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256, //can be  128, 192, or 256
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
      )

      await this.setState({
        cipher
      });

      console.log("Cipher:", this.state.cipher);

      const keydata = await window.crypto.subtle.exportKey(
        "raw", //can be "jwk" or "raw"
        this.state.cipher //extractable must be true
      )

      console.log("raw : ", keydata);
      let uint8key = new Uint8Array(keydata)
      console.log("uint 8raw : ", new Uint8Array(keydata));

      await ipfs.files.add(Buffer.from(uint8key), (err, ipfsHash) => {
        this.setState({
          keyipfs: ipfsHash[0].hash
        })
        console.log("send key to ipfs: ", ipfsHash);
        console.log(err, ipfsHash);
      })

      console.log("back to raw :", new ArrayBuffer(new Uint8Array(keydata)))

      let key = await window.crypto.subtle.importKey(
        "raw", //can be "jwk" or "raw"
        uint8key,
        {   //this is the algorithm options
          name: "AES-GCM",
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
      )

      console.log("waht is key: ", key);

    } catch (err) {
      console.log(err)
    }
  }

  encryptData = async () => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    console.log(iv);

    try {
      console.log(this.state.cipher)
      console.log(this.state.buffer)
      let encrypted = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",

          iv: iv,
        },
        this.state.cipher, //from generateKey or importKey above
        this.state.buffer //ArrayBuffer of data you want to encrypt
      )
      console.log("Typed: ", new Uint8Array(encrypted))
      let encryptedBuf = Buffer.from(new Uint8Array(encrypted))
      await this.setState({
        encryptedBuffer: encryptedBuf
      })

      console.log("encrypted Buffer: ", this.state.encryptedBuffer);
    } catch (err) {
      console.log(err)
    }
  }

  onTransfer = async () => {
    console.log("original file", this.state.buffer);
    console.log("encrypted file", this.state.encryptedBuffer);
    await ipfs.files.add(this.state.encryptedBuffer, (err, ipfsHash) => {
      this.setState({
        bookipfs: ipfsHash[0].hash
      })
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash 

    })
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <Button variant="contained" size="large" color="primary" onClick={this.encrypt}>
          Encrypt
        <Icon>send</Icon>
        </Button>
        <Button variant="contained" size="large" color="primary" onClick={this.onTransfer}>
          IPFS
        <Icon>send</Icon>
        </Button>
        <Form state = {this.state} />
      </div>
    );
  }
}

// export default withStyles(styles)(UploadFile);


export default withTracker(() => {
  return {
    booklist: Booklist.find({}).fetch(),
  };
})(UploadFile);