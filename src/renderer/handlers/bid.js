import BidContract from '@/contracts/Bid';
import Tender from '@/handlers/tender';
import { ipfsToBytes32, bytes32ToIpfs, send, web3 } from '@/handlers';
import _ from 'lodash';

/**
 * @typedef {Object} standardObservation
 * @property {string} plain - Simple text observation
 * @property {string} hash - IPFS hash of an attached document
 * @property {string} resPlain - Simple text response
 * @property {string} resHash - IPFS hash of an attached document to the response
 */

/**
 * Creates a form instance of a `Bid` handler which encapsulates all the specified bid
 * behavior.
 * @param {string} bidAddress Bid SmartContract's address
 */
export default class Bid {
  constructor(bidAddress) {
    this.address = bidAddress;
    this.instance = new web3.eth.Contract(BidContract.abi, bidAddress);
  }

  /**
   * Deploys a new Bid into the blockchain and register it into the main Tender contract.
   * Returns the deployed contract address.
   * @param {string} cipherBid IPFS hash to the ciphered bid
   * @param {string} tenderer address
   * @param {string} tenderAddress parent smart contract
   * @param {string} from user's account
   * @param {string} publicKey user's publicKey
   * @param {string} privateKey user's privateKey
   * @return {Promise<string>} Transaction
   */
  static deploy(
    cipherBid,
    tenderer,
    tenderAddress,
    from,
    publicKey,
    privateKey,
  ) {
    return new Promise((resolve, reject) => {
      const args = [ipfsToBytes32(cipherBid), tenderer];
      const newBid = new web3.eth.Contract(BidContract.abi);
      const deploy = newBid.deploy({
        data: BidContract.bytecode,
        arguments: args,
      });
      send(
        deploy,
        from,
        null,
        privateKey,
      )
        .then(tx => tx.contractAddress)
        .then((address) => {
          const tender = new Tender(tenderAddress);
          return tender.registerBid(from, privateKey, address);
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Score obtained by this bid during evaluation
   * @return {Promise<number>}
   */
  get score() {
    return new Promise((resolve, reject) => {
      this.instance.methods.score()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Observations on this bid
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
   * IpfsHash of the encripted bid offer
   * @return {Promise<string>}
   */
  get cipherBid() {
    return new Promise((resolve, reject) => {
      this.instance.methods.cipherBid()
        .call()
        .then(bytes32ToIpfs)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * IpfsHash of the plain bid offer
   * @return {Promise<string>}
   */
  get plainBid() {
    return new Promise((resolve, reject) => {
      this.instance.methods.plainBid()
        .call()
        .then(bytes32ToIpfs)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Vendor's hidden private key to decrypt the cipherBid
   * @return {Promise<string>}
   */
  get privateKey() {
    return new Promise((resolve, reject) => {
      this.instance.methods.privateKey()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sets the private key to decrypt this bid
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} privateKeyToRegister decryption privateKey
   * @return {Promise<unknown>}
   */
  setPrivateKey(from, privateKey, privateKeyToRegister) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.setPrivateKey(privateKeyToRegister),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sends a general observation over this bid
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
   * Sends a general response to an observation over this bid
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
   * Publishes the ipfsHash of the plain bid
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {string} plainBid ipfsHash of the plainBid
   * @return {Promise<ethTransaction>}
   */
  setPlainBid(from, privateKey, plainBid) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.setPlainBid(ipfsToBytes32(plainBid)),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }
}
