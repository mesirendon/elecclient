import Web3 from 'web3';
import BidContract from '@/contracts/Bid';
import _ from 'lodash';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


/**
 * @typedef Observation
 * @type {object}
 * @property {string} plain - text of the observation.
 * @property {string} hash - hash representing a file on IPFS.
 */

/**
 *
 * @type {{
 * init: Bid.init(function(bidAddress <string>)),
 * instance: null,
 * getScore: (function(): Promise<number>),
 * getScoreObservations: (function(): Promise<Observation[]>),
 * getObservations: (function(): Promise<Observation[]>)}}
 */
const Bid = {
  instance: null,

  /**
   * Initializes a Tender contract instance
   * @param bidAddress <string> tender address
   */
  init: (bidAddress) => {
    Bid.instance = new web3.eth.Contract(BidContract.abi, bidAddress);
  },
  /**
   * Gets the score of the bid
   * @returns {Promise<number>}
   */
  getScore: () => new Promise((resolve, reject) => {
    Bid.instance.methods.score()
      .call()
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the current observations of a bid
   * @returns {Promise<[Observation]>} The promise of the Observations array in the tender
   */
  getObservations: () => new Promise((resolve, reject) => {
    Bid.instance.methods.getObservationsLength()
      .call()
      .then(observationsLength => _.range(observationsLength))
      .then(observationsIndexes => observationsIndexes
        .map(idx => Bid.instance.methods.observations(idx).call()))
      .then(eventualObservations => Promise.all(eventualObservations))
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Gets the current observations about the score of a bid
   * @returns {Promise<[Observation]>} The promise of the scoreObservations array in the bid
   */
  getScoreObservations: () => new Promise((resolve, reject) => {
    Bid.instance.methods.getScoreObservationsLength()
      .call()
      .then(scoreObservationsLength => _.range(scoreObservationsLength))
      .then(scoreObservationsIndexes => scoreObservationsIndexes
        .map(idx => Bid.instance.methods.scoreObservations(idx).call()))
      .then(eventualScoreObservations => Promise.all(eventualScoreObservations))
      .then(resolve)
      .catch(reject);
  }),
};

export default Bid;
