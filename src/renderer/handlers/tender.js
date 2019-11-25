import _ from 'lodash';
import bs58 from 'bs58';
import TenderContract from '@/contracts/Tender';
import { web3, send } from '@/handlers';
import Procurement from '@/handlers/procurement';
import { log } from 'electron-log';

/**
 * Converts an ipfsHash into bytes32 data type
 * @param {string} ipfsHash
 * @return {string} ipfsHash in its bytes32 representation
 */
const ipfsToBytes32 = ipfsHash => `0x${bs58.decode(ipfsHash)
  .slice(2)
  .toString('hex')}`;

/**
 * Converts an ipfsHash in its bytes32 representation into the bitcoin format
 * @param {string} bytesHash the bytes32 ipfsHash representation
 * @return {string} plain ipfsHash
 */
// const bytes32ToIpfs = bytesHash => bs58.encode(Buffer.from(`1220${bytesHash.slice(2)}`, 'hex'));

const timeToNumber = (time) => {
  switch (time) {
    case 'Second':
      return 0;
    case 'Minute':
      return 1;
    case 'Hour':
      return 2;
    case 'Day':
      return 3;
    case 'Week':
      return 4;
    case 'Month':
      return 5;
    default:
      return 6;
  }
};

/**
 * @typedef {Object} standardObservation
 * @property {string} plain - Simple text observation
 * @property {string} hash - IPFS hash of an attached document
 * @property {string} resPlain - Simple text response
 * @property {string} resHash - IPFS hash of an attached document to the response
 */

/**
 * Creates a form instance of a `Tender` handler which encapsulates all the specified tender
 * behavior.
 * @param {string} tenderAddress Tender SmartContract's address
 */
export default class Tender {
  constructor(tenderAddress) {
    this.address = tenderAddress;
    this.instance = new web3.eth.Contract(TenderContract.abi, tenderAddress);
  }

  /**
   * Deploys a new Tender into the blockchain and register it into the main Procurement contract.
   * Returns the deployed contract address.
   * @param {Object} tender Tender object from local database
   * @param {string} from user's account
   * @param {string} publicKey user's publicKey
   * @param {string} privateKey user's privateKey
   * @return {Promise<string>}
   */
  static deploy(
    tender,
    from,
    publicKey,
    privateKey,
  ) {
    return new Promise((resolve, reject) => {
      const {
        number,
        office,
        name,
        description,
        questionnaireHash,
        basePrice,
        schedule,
        filesList,
      } = tender;
      const ipfsHashes = filesList.map(file => ipfsToBytes32(file.ipfsHash));
      const questionnaires = [ipfsToBytes32(questionnaireHash)];
      const publicKeyBytes = web3.utils.hexToBytes(publicKey);
      const r = publicKeyBytes.slice(0, 17);
      const s = publicKeyBytes.slice(17);
      const pubkey = [r, s];
      schedule.durationType = timeToNumber(schedule.durationType);
      log(
        filesList,
        ipfsHashes,
        questionnaires,
        basePrice,
        Object.values(schedule),
      );
      const newTender = new web3.eth.Contract(TenderContract.abi);
      const deploy = newTender.deploy({
        data: TenderContract.bytecode,
        arguments: [
          number,
          office,
          name,
          description,
          100, // enabling score
          pubkey,
          ipfsHashes,
          questionnaires,
          basePrice,
          Object.values(schedule),
        ],
      });
      send(
        deploy,
        from,
        privateKey,
      )
        .then(tx => tx.contractAddress)
        .then((address) => {
          const procurement = new Procurement();
          procurement.registerTender(address);
          return address;
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Tender description
   * @return {Promise<string>}
   */
  get description() {
    return new Promise((resolve, reject) => {
      this.instance.methods.description()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Tells whether or not this tender is accepting bid offerings
   * @return {Promise<boolean>}
   */
  get biddingPeriodStatus() {
    return new Promise((resolve, reject) => {
      this.instance.methods.biddingPeriod()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Bid SmartContracts' addresses
   * @return {Promise<[string]>}
   */
  get bids() {
    return new Promise((resolve, reject) => {
      this.instance.methods.getBidsLength()
        .call()
        .then(bidsLength => _.range(bidsLength))
        .then(bidsIndexes => bidsIndexes
          .map(idx => this.instance.methods.bids(idx)
            .call()))
        .then(eventualBids => Promise.all(eventualBids))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Winner bid offering SmartContract address
   * @return {Promise<string>}
   */
  get winner() {
    return new Promise((resolve, reject) => {
      this.instance.methods.winningVendor()
        .call()
        .then(winner => (winner === '0x0000000000000000000000000000000000000000' ? null : winner))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Observations on this tender
   * @return {Promise<[standardObservation]>}
   */
  get observations() {
    return new Promise((resolve, reject) => {
      this.instance.methods.getObservationsLength()
        .call()
        .then(observationsLength => _.range(observationsLength))
        .then(observationsIndexes => observationsIndexes
          .map(idx => this.instance.methods.observations(idx)
            .call()))
        .then(eventualObservations => Promise.all(eventualObservations))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Messages on this tender
   * @return {Promise<[string]>}
   */
  get messages() {
    return new Promise((resolve, reject) => {
      this.instance.methods.getMessagesLength()
        .call()
        .then(messagesLength => _.range(messagesLength))
        .then(messagesIndexes => messagesIndexes
          .map(idx => this.instance.methods.messages(idx)
            .call()))
        .then(eventualMessages => Promise.all(eventualMessages))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Observations over winner selection
   * @return {Promise<[standardObservation]>}
   */
  get winnerObservations() {
    return new Promise((resolve, reject) => {
      this.instance.methods.getWinnerObservationsLength()
        .call()
        .then(winnerObservationsLength => _.range(winnerObservationsLength))
        .then(winnerObservationsIndexes => winnerObservationsIndexes
          .map(idx => this.instance.methods.winnerObservations(idx)
            .call()))
        .then(eventualWinnerObservations => Promise.all(eventualWinnerObservations))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Starts the bidding process allowing Vendors to place their bids
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @returns {Promise<ethTransaction>}
   */
  startAuction(from, privateKey) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.startAuction(),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Creates a form `Bid` SmartContract instance for the specified bid address
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @return {Promise<ethTransaction>}
   */
  createBid(from, privateKey) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.createBid(),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sends a general observation over this tender
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} plain
   * @param {string} hash
   * @return {Promise<ethTransaction>}
   */
  sendObservation(from, privateKey, { plain, hash }) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.submitObservation(plain, hash),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sends a general response to an observation over this tender
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} plain
   * @param {string} hash
   * @return {Promise<ethTransaction>}
   */
  respondObservation(from, privateKey, { plain, hash, key }) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.respondObservation(key, plain, hash),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sends an observation over the winner of this tender
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} plain
   * @param {string} hash
   * @return {Promise<ethTransaction>}
   */
  sendWinnerObservation(from, privateKey, { plain, hash }) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.submitWinnerObservation(plain, hash),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sends a response to an observation over the winner of this tender
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} plain
   * @param {string} hash
   * @return {Promise<ethTransaction>}
   */
  respondWinnerObservation(from, privateKey, { plain, hash, key }) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.respondWinnerObservation(key, plain, hash),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sends a message over this tender
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} message
   * @return {Promise<ethTransaction>}
   */
  sendMessage(from, privateKey, message) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.submitMessage(message),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }
}
