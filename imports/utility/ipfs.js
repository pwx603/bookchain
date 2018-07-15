// var ipfsAPI = require('ipfs-api')

// const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });



var ipfs = window.IpfsApi('localhost', '5001')

export default ipfs;