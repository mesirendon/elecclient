import ProcurementContract from '@/contracts/Procurement.json';
import { development, send, web3 } from '@/handlers';
import _ from 'lodash';

// Current Testing
const procurementContractAddress = development ?
  '0xCfEB869F69431e42cdB54A4F4f105C19C080A601' : // Local contract
  '0xAda9860E64cb7070400188f9e5B2f7F9aeD7Bd2b'; // Ropsten contract

/**
 * The `Procurement` handler encapsulates all procurement main contract's behavior
 */
export default class Procurement {
  constructor() {
    this.instance = new web3.eth.Contract(ProcurementContract.abi, procurementContractAddress);
  }

  /**
   * Gets all the tender procurement processes addresses registered into this SmartContract
   * @return {Promise<[string]>}
   */
  get tenders() {
    return new Promise((resolve, reject) => {
      this.instance.methods.getTendersSize()
        .call()
        .then(size => _.range(size))
        .then(indices => indices
          .map(idx => this.instance.methods.getTender(idx)
            .call()))
        .then(promises => Promise.all(promises))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Creates a form `Tender` and registers its address into this SmartContract
   * @param {string} address Account address of the deployed Tender contract
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @return {Promise<ethTransaction>}
   */
  registerTender(address, from, privateKey) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.registerTender(address),
        from,
        procurementContractAddress,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }
}
