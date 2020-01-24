import _ from 'lodash';
import TenderContract from '@/contracts/Tender';
import { bytes32ToIpfs, ipfsToBytes32, send, web3 } from '@/handlers';
import Procurement from '@/handlers/procurement';
import { TENDER_BASE_TENDER } from '@/store/constants';
import { log } from 'electron-log';

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

const contractTypeToNumber = (contractType) => {
  switch (contractType) {
    case 'FrameworkAgreement':
      return 0;
    case 'LeaseFurniture':
      return 1;
    case 'PublicPrivatePartnership':
      return 2;
    case 'Trading':
      return 3;
    case 'Concession':
      return 4;
    case 'BusinessTrust':
      return 5;
    case 'Work':
      return 6;
    case 'Otro':
      return 7;
    case 'ServicesProvisioning':
      return 8;
    case 'Insurance':
      return 9;
    case 'FinancialServices':
      return 10;
    default:
      return 11;
  }
};

const budgetOriginToNumber = (budgetOrigin) => {
  switch (budgetOrigin) {
    case 'OwnResources':
      return 0;
    case 'NationalTerritorialBudget':
      return 0;
    case 'Royalties':
      return 0;
    case 'CreditResources':
      return 0;
    case 'SGP':
      return 0;
    default:
      return 0;
  }
};

const expenseTypeToNumber = (expenseType) => {
  switch (expenseType) {
    case 'WorkingExpense':
      return 0;
    case 'Investment':
      return 1;
    default:
      return 2;
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
  constructor(tenderAddress, from) {
    this.address = tenderAddress;
    this.from = { from };
    this.instance = new web3.eth.Contract(TenderContract.abi, tenderAddress);
  }

  /**
   * Deploys a new Tender into the blockchain and register it into the main Procurement contract.
   * Returns the deployed contract address.
   * @param {Object} tender Tender object from local database
   * @param {string} from user's account
   * @param {string} publicKey user's publicKey
   * @param {string} privateKey user's privateKey
   * @return {Promise<string>} Transaction
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
        basePrice,
        office,
        name,
        description,
        procedureTeam,
        schedule,
        unspsc,
        duration,
        durationType,
        contractType,
        peaceAgreement,
        expenseType,
        budgetOrigin,
        registeredInSIIF,
        definePaymentPlan,
        advancePayments,
        warranties,
        seriousness,
        compliance,
        complianceInvestment,
        complianceContract,
        complianceWages,
        complianceGoodsQuality,
        civilLiability,
        filesList,
        questionnaireHash,
        lotsHash,
      } = tender;
      const ipfsHashes = _.concat(
        ipfsToBytes32(questionnaireHash),
        ipfsToBytes32(lotsHash),
        filesList.map(file => ipfsToBytes32(file.ipfsHash)),
      );
      const publicKeyBytes = web3.utils.hexToBytes(publicKey);
      const r = publicKeyBytes.slice(0, 17);
      const s = publicKeyBytes.slice(17);
      const pubkey = [r, s];
      const contractInfo = [
        duration,
        timeToNumber(durationType),
        contractTypeToNumber(contractType),
        peaceAgreement ? 1 : 0,
        expenseTypeToNumber(expenseType),
        budgetOriginToNumber(budgetOrigin),
        registeredInSIIF ? 1 : 0,
      ];
      const generalInfoFlags = [
        definePaymentPlan,
        advancePayments,
        warranties,
        seriousness,
        compliance,
        complianceInvestment,
        complianceContract,
        complianceWages,
        complianceGoodsQuality,
        civilLiability,
      ];
      const generalInfoValues = [];
      if (seriousness) {
        switch (tender.seriousnessCheck) {
          case 'seriousnessPercentageCheck':
            generalInfoValues.push(0);
            generalInfoValues.push(tender.seriousnessPercentage);
            break;
          case 'seriousnessMinWagesCheck':
            generalInfoValues.push(1);
            generalInfoValues.push(tender.seriousnessMinWages);
            break;
          default:
        }
      }
      if (complianceInvestment) {
        generalInfoValues.push(tender.complianceInvestmentPercentage);
        generalInfoValues.push(tender.complianceInvestmentStartDate);
        generalInfoValues.push(tender.complianceInvestmentEndDate);
      }
      if (complianceContract) {
        generalInfoValues.push(tender.complianceContractPercentage);
        generalInfoValues.push(tender.complianceContractStartDate);
        generalInfoValues.push(tender.complianceContractEndDate);
      }
      if (complianceWages) {
        generalInfoValues.push(tender.complianceWagesPercentage);
        generalInfoValues.push(tender.complianceWagesStartDate);
        generalInfoValues.push(tender.complianceWagesEndDate);
      }
      if (complianceGoodsQuality) {
        generalInfoValues.push(tender.complianceGoodsPercentage);
        generalInfoValues.push(tender.complianceGoodsStartDate);
        generalInfoValues.push(tender.complianceGoodsEndDate);
      }
      if (civilLiability) {
        switch (tender.civilLiabilityCheck) {
          case 'civilLiabilityMinWagesCheck':
            generalInfoValues.push(0);
            generalInfoValues.push(tender.civilLiabilityMinWages);
            break;
          case 'civilLiabilityPercentageCheck':
            generalInfoValues.push(1);
            generalInfoValues.push(tender.civilLiabilityPercentage);
            break;
          case 'civilLiabilityValueCheck':
            generalInfoValues.push(2);
            generalInfoValues.push(tender.civilLiabilityValue);
            break;
          default:
        }
      }
      schedule.bidMaintenanceTermType = timeToNumber(schedule.bidMaintenanceTermType);
      const args = [
        number,
        basePrice,
        office,
        name,
        description,
        procedureTeam,
        pubkey,
        ipfsHashes,
        Object.values(schedule),
        [unspsc],
        contractInfo,
        generalInfoValues,
        generalInfoFlags,
      ];
      const newTender = new web3.eth.Contract(TenderContract.abi);
      const deploy = newTender.deploy({
        data: TenderContract.bytecode,
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
          const procurement = new Procurement();
          return procurement.registerTender(address, from, privateKey);
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Tenderer address
   * @return {Promise<String>}
   */
  get tenderer() {
    return new Promise((resolve, reject) => {
      this.instance.methods.owner()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Bid SmartContracts' addresses
   * @return {Promise<[Hash]>}
   */
  get bids() {
    const { from } = this;
    return new Promise((resolve, reject) => {
      this.instance.methods.getBidsSize()
        .call(from)
        .then(bidsLength => _.range(bidsLength))
        .then(bidsIndexes => bidsIndexes
          .map(idx => this.instance.methods.getBid(idx)
            .call(from)))
        .then(eventualBids => Promise.all(eventualBids))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Name of the tender
   * @return {Promise<String>}
   */
  get name() {
    return new Promise((resolve, reject) => {
      this.instance.methods.name()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Number of the tender
   * @return {Promise<Number>}
   */
  get number() {
    return new Promise((resolve, reject) => {
      this.instance.methods.number()
        .call()
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
   * Tender lots to generate bid form
   * @return {Promise<Hash>}
   */
  get lots() {
    return new Promise((resolve, reject) => {
      this.instance.methods.ipfsHashes(1)
        .call()
        .then(lotsBytes => bytes32ToIpfs(lotsBytes))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Tender questionnaire to generate bid form
   * @return {Promise<Object>}
   */
  get questionnaire() {
    return new Promise((resolve, reject) => {
      this.instance.methods.ipfsHashes(0)
        .call()
        .then(questionnaireBytes => bytes32ToIpfs(questionnaireBytes))
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
   * Base price of the tender
   * @return {Promise<Number>}
   */
  get basePrice() {
    return new Promise((resolve, reject) => {
      this.instance.methods.basePrice()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Bid Maintenance Term of the tender
   * @return {Promise<Number>}
   */
  get bidMaintenanceTerm() {
    return new Promise((resolve, reject) => {
      this.instance.methods.scheduleDates(16)
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Bid Maintenance Term Type of the tender
   * @return {Promise<Number>}
   */
  get bidMaintenanceTermType() {
    return new Promise((resolve, reject) => {
      this.instance.methods.scheduleDates(17)
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Bid Maintenance Term Type of the tender
   * @return {Promise<Number>}
   */
  get publicKey() {
    return new Promise((resolve, reject) => {
      this.instance.methods.publicKey()
        .call()
        .then(pubKeyObject => `${pubKeyObject.r}${pubKeyObject.s.substr(2)
          .slice(0, -2)}`.substr(2))
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

  get schedule() {
    return new Promise((resolve, reject) => {
      const scheduleKeys = Object.keys(TENDER_BASE_TENDER.schedule);
      const eventualDates = _.range(scheduleKeys.length)
        .map(idx => this.instance.methods.scheduleDates(idx)
          .call());
      Promise.all(eventualDates)
        .then(dates => _.zip(scheduleKeys, dates))
        .then((dates) => {
          const schedule = { ...TENDER_BASE_TENDER.schedule };
          dates.forEach(([dateKey, date]) => {
            schedule[dateKey] = parseInt(date, 10);
          });
          resolve(schedule);
        })
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

  /**
   * Resgisters a new bid to the tender contract
   * @param {string} from Account that sends the transaction
   * @param {string} privateKey Account's private key
   * @param {address} contractAddress bid address
   * @returns {Promise<ethTransaction>}
   */
  registerBid(from, privateKey, contractAddress) {
    return new Promise((resolve, reject) => {
      send(
        this.instance.methods.registerBid(contractAddress),
        from,
        this.address,
        privateKey,
      )
        .then(resolve)
        .catch(reject);
    });
  }

  getBidAddress(from) {
    return new Promise((resolve, reject) => {
      this.instance.methods.getBidAddress()
        .call({ from })
        .then((result) => {
          log(result);
          resolve(result);
        })
        .catch(reject);
    });
  }
}
