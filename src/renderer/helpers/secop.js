import soap from 'soap-as-promised';
import xml2js from 'xml2js';

const parser = new xml2js.Parser();
const headers = {
  'con:Info': {
    'vor:CompanyCode': '700043011',
    'vor:UserCode': '2068013',
  },
};

export default class Secop {
  constructor(url, user, password) {
    this.user = user;
    this.password = password;
    this.eventualClient = soap.createClient(url);
  }
  autenticate() {
    return new Promise((resolve, reject) => {
      this.eventualClient
        .then((client) => {
          const wsSecurity = new soap.WSSecurity(this.user, this.password, { mustUnderstand: '1' });
          client.setSecurity(wsSecurity);
          client.addSoapHeader(headers, '', '', '');
          client.wsdl.definitions.xmlns.con = 'http://www.nextway.pt/externalintegration/ConnectFiles';
          client.wsdl.definitions.xmlns.vor = 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA';
          // eslint-disable-next-line no-underscore-dangle
          client.wsdl.xmlnsInEnvelope = client.wsdl._xmlnsMap();
          resolve();
        })
        .catch(reject);
    });
  }
  sendProcess(process) {
    return new Promise((resolve, reject) => {
      this.autenticate()
        .then(() => this.eventualClient)
        .then(client => client.CreateProcedure(process))
        .then(response => resolve(parser.parseStringPromise(response[1])))
        .catch(reject);
    });
  }
  downloadDocument(docId) {
    return new Promise((resolve, reject) => {
      this.autenticate()
        .then(() => this.eventualClient)
        .then(client => client.DownloadDocument({ DocumentUniqueIdentifier: docId }))
        .then(response => resolve(parser.parseStringPromise(response[1])))
        .catch(reject);
    });
  }
}
