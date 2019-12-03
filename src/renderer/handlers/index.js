import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx';

/**
 * Returns the web3 instance
 * @type {Web3}
 */
// Ropsten
export const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/0d08a0269fb64ef8a892396738655216'));

// Development
// export const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/**
 * @typedef {Object} ethTransaction
 * @property {string} transactionHash 32 Bytes hash of the transaction
 * @property {number} transactionIndex Integer of the transactions index position in the block
 * @property {string} blockHash 32 Bytes hash of the block where this transaction was in
 * @property {number} blockNumber Block number where this transaction was in
 * @property {string} from Address of the sender
 * @property {string} to Address of the receiver. `null` when its a contract creation transaction
 * @property {number} gasUsed The amount of gas used by this specific transaction alone
 * @property {number} cumulativeGasUsed The total amount of gas used when this transaction was
 * executed in the block
 * @property {string} contractAddress The contract address created, if the transaction was a
 * contract creation, otherwise null
 * @property {[Object]} logs Array of log objects, which this transaction generated
 * @property {boolean} status TRUE if the transaction was successful, FALSE, if the EVM reverted
 * the transaction
 */

/**
 * The transaction object.
 * Check more info at {@link https://web3js.readthedocs.io/en/v1.2.1/web3-eth-contract.html#id14|Transaction object}
 * @typedef {Object} txObject
 * @property {function} call Will call the “constant” method and execute its smart contract
 * method in the EVM without sending a transaction (Can’t alter the smart contract state)
 * @property {function} send Will send a transaction to the smart contract and execute its method
 * (Can alter the smart contract state)
 * @property {function} estimateGas Will estimate the gas used when the method would be executed on
 * chain
 * @property {function} encodeABI Encodes the ABI for this method. This can be send using a
 * transaction, call the method or passing into another smart contracts method as argument
 */

/**
 * Sends a locally signed transaction upon desired contract method
 * @param {txObject} signature SmartContract signature method
 * @param {string} from Account that sends the transaction
 * @param {string} to SmartContract deployed address
 * @param {string} privateKey Account's private key
 * @return {Promise<ethTransaction>}
 */
export const send = (
  signature,
  from,
  to,
  privateKey,
) => new Promise((resolve, reject) => {
  const data = signature.encodeABI();
  web3.eth.getGasPrice()
    .then(gasPrice => [
      web3.eth.getTransactionCount(from),
      gasPrice,
      signature.estimateGas({ from }),
    ])
    .then(promises => Promise.all(promises))
    .then(([nonce, gasPrice, gasLimit]) => {
      const txParams = {
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit,
        data,
        nonce,
      };
      if (to) txParams.to = to;
      const tx = new Transaction(txParams, { chain: 'ropsten' });
      tx.sign(Buffer.from(privateKey.replace('0x', ''), 'hex'));
      return tx.serialize()
        .toString('hex');
    })
    .then(serializedTx => web3.eth.sendSignedTransaction(`0x${serializedTx}`))
    .then(resolve)
    .catch(reject);
});
