import Web3 from 'web3';
// eslint-disable-next-line no-unused-vars
import log from 'electron-log';
import ProcurementContract from '@/contracts/Procurement.json';
import _ from 'lodash';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const procurementContractAddress = '0x5603b70b2061140140F358D81d33a1eEb767617f';

/**
 * Procurement Smart Contract Handler
 * @type {{init: Procurement.init, instance: null, getTenders: (function(): Promise<string[]>)}}
 */
const Procurement = {
  instance: null,

  /**
   * Initializes a Procurement instance
   */
  init: () => {
    Procurement.instance = new web3.eth
      .Contract(ProcurementContract.abi, procurementContractAddress);
  },

  /**
   * Gets the list of tenders' addresses registered on the Procurement
   * Smart Contract.
   * @return {Promise<[string]>}
   */
  getTenders: () => new Promise((resolve, reject) => {
    Procurement.instance.methods.tendersSize()
      .call()
      .then(size => _.range(size))
      .then(indices => indices
        .map(idx => Procurement.instance.methods.tenders(idx)
          .call()))
      .then(promises => Promise.all(promises))
      .then(resolve)
      .catch(reject);
  }),
};

export default Procurement;
