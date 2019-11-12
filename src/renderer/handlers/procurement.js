import ProcurementContract from '@/contracts/Procurement.json';
import { send, web3 } from '@/handlers/index';
import _ from 'lodash';

// Current Testing
// const procurementContractAddress = '0x6A567e2ff28570883613a70631714CC5207DB69C';

// Development
const procurementContractAddress = '0xbcA494852f4797ce8765F9B0C4E987D0d430838d';

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
      this.instance.methods.tendersSize()
        .call()
        .then(size => _.range(size))
        .then(indices => indices
          .map(idx => this.instance.methods.tenders(idx)
            .call()))
        .then(promises => Promise.all(promises))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Creates a form `Tender` and registers its address into this SmartContract
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @return {Promise<ethTransaction>}
   */
  createTender(from, privateKey) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.createTender(),
        from,
        procurementContractAddress,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }
}
