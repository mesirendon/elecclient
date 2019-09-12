import Web3 from 'web3';
// eslint-disable-next-line no-unused-vars
import log from 'electron-log';
import ProcurementContract from '@/contracts/Procurement.json';
import _ from 'lodash';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const procurementContractAddress = '0xA9e2E789F6b43DbEC3Ce7a0E72F9F81bFEA4F5F7';

const Procurement = {
  instance: null,
  init: () => {
    Procurement.instance = new web3.eth
      .Contract(ProcurementContract.abi, procurementContractAddress);
  },
  getTenders: () => new Promise((resolve, reject) => {
    Procurement.instance.methods.tendersSize()
      .call()
      .then(size => _.range(size))
      .then(indices => indices
        .map(idx => Procurement.instance.methods.tenders(idx).call()))
      .then(promises => Promise.all(promises))
      .then(resolve)
      .catch(reject);
  }),
};

export default Procurement;
