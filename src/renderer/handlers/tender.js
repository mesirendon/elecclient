import Web3 from 'web3';
import TenderContract from '@/contracts/Tender';
import _ from 'lodash';
// eslint-disable-next-line no-unused-vars
import { error, log } from 'electron-log';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/**
 * @typedef Observation
 * @type {object}
 * @property {string} plain - text of the observation.
 * @property {string} hash - hash representing a file on IPFS.
 */

/**
 *
 * * @type {{
 * init: Tender.init(function(tenderAddress <string>)),
 * instance: null,
 * getBids: (function(): Promise<[Bid]>),
 * createBid: (function({string} account): Promise<Transaction>),
 * sendMessage: (function({string} account, {string} message): Promise<Transaction>),
 * getDescription: (function(): Promise<string>),
 * getMessages: (function(): Promise<[string]>),
 * getBiddingPeriod:(function(): Promise<boolean>)}}
 * getWinnerObservations: (function(): Promise<Observation[]>),
 * getObservations: (function(): Promise<Observation[]>)
 * getWinner: (function(): Promise<string>)
 * }}
 */
const Tender = {
  instance: null,

  /**
   * Initializes a Tender contract instance
   * @param tenderAddress <string> tender address
   */
  init: (tenderAddress) => {
    Tender.instance = new web3.eth
      .Contract(TenderContract.abi, tenderAddress);
  },

  /**
   * Creates a bid
   * @param {string} account Vendor account address
   * @returns {Promise<Transaction>}
   */
  createBid: account => new Promise((resolve, reject) => {
    const createBid = Tender.instance.methods.createBid();
    createBid.estimateGas({ from: account })
      .then(gas => createBid.send({
        from: account,
        gas,
      }))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the description of a tender
   * @returns {Promise<string>}
   */
  getDescription: () => new Promise((resolve, reject) => {
    Tender.instance.methods.description()
      .call()
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the actual state of the biddingPeriod
   * @returns {Promise<boolean>}
   */
  getBiddingPeriod: () => new Promise((resolve, reject) => {
    Tender.instance.methods.biddingPeriod()
      .call()
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the current bids of a tender
   * @returns {Promise<[string]>} The promise of an array of strings representing the addresses of
   * the bids
   */
  getBids: () => new Promise((resolve, reject) => {
    Tender.instance.methods.getBidsLength()
      .call()
      .then(bidsLength => _.range(bidsLength))
      .then(bidsIndexes => bidsIndexes
        .map(idx => Tender.instance.methods.bids(idx)
          .call()))
      .then(eventualbids => Promise.all(eventualbids))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Submits a new message to the tender
   * @param {string} message
   * @param {string} account - Vendor account address
   * @returns {Promise<object>}
   */
  sendMessage: (message, account) => new Promise((resolve, reject) => {
    const submitMessage = Tender.instance.methods.submitMessage(message);
    submitMessage.estimateGas({ from: account })
      .then(gas => submitMessage.send({
        from: account,
        gas,
      }))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the current messages of a tender
   * @returns {Promise<[string]>}
   */
  getMessages: () => new Promise((resolve, reject) => {
    Tender.instance.methods.getMessagesLength()
      .call()
      .then(messagesLength => _.range(messagesLength))
      .then(messagesIndexes => messagesIndexes
        .map(idx => Tender.instance.methods.messages(idx)
          .call()))
      .then(eventualMessages => Promise.all(eventualMessages))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the current observations of a tender
   * @returns {Promise<[Observation]>} The promise of the Observations array in the tender
   */
  getObservations: () => new Promise((resolve, reject) => {
    Tender.instance.methods.getObservationsLength()
      .call()
      .then(observationsLength => _.range(observationsLength))
      .then(observationsIndexes => observationsIndexes
        .map(idx => Tender.instance.methods.observations(idx)
          .call()))
      .then(eventualObservations => Promise.all(eventualObservations))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the current observations about the winner of a tender
   * @returns {Promise<[Observation]>} The promise of the winnerObservations array in the tender
   */
  getWinnerObservations: () => new Promise((resolve, reject) => {
    Tender.instance.methods.getWinnerObservationsLength()
      .call()
      .then(winnerObservationsLength => _.range(winnerObservationsLength))
      .then(winnerObservationsIndexes => winnerObservationsIndexes
        .map(idx => Tender.instance.methods.winnerObservations(idx)
          .call()))
      .then(eventualWinnerObservations => Promise.all(eventualWinnerObservations))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Returns the winner of the tender
   * @returns {Promise<string>} address of the winning vendor
   */
  getWinner: () => new Promise((resolve, reject) => {
    Tender.instance.methods.winnigVendor()
      .call()
      .then(resolve)
      .catch(reject);
  }),

  sendObservation: (account, { plain, hash }) => new Promise((resolve, reject) => {
    log(plain);
    const submitObservation = Tender.instance.methods.submitObservation(plain, hash);
    log(hash);
    submitObservation.estimateGas({ from: account })
      .then((gas) => {
        log(gas);
        return submitObservation.send({
          from: account,
          gas,
        });
      })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  }),

  startAuction: from => new Promise((resolve, reject) => {
    const sa = Tender.instance.methods.startAuction();
    sa.estimateGas({ from })
      .then(gas => sa.send({
        from,
        gas,
      }))
      .then(resolve)
      .catch(reject);
  }),
};

export default Tender;
