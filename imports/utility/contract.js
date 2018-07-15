import web3 from './web3';
import abi from './abi';
import data from './data'

console.log(abi);
console.log("account dddress: ", web3.eth.accounts[0]);

export default new web3.eth.Contract(abi, {data: data});