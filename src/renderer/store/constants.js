import moment from 'moment';

// Actions
export const SESSION_LOAD_DB = 'SESSION_LOAD_DB';
export const SESSION_GENERATE_ACCOUNT = 'SESSION_GENERATE_ACCOUNT';
export const SESSION_RECOVER_ACCOUNT = 'SESSION_RECOVER_ACCOUNT';
export const SESSION_SET_CLIENT = 'SESSION_SET_CLIENT';

export const PROCUREMENT_GET_TENDERS = 'PROCUREMENT_GET_TENDERS';
export const PROCUREMENT_CREATE_TENDER = 'PROCUREMENT_CREATE_TENDER';

export const TENDER_SET_TENDER = 'TENDER_SET_TENDER';
export const TENDER_SAVE_DRAFT = 'TENDER_SAVE_DRAFT';
export const TENDER_LOAD_DRAFTS = 'TENDER_LOAD_DRAFTS';
export const TENDER_UPDATE_DRAFT = 'TENDER_UPDATE_DRAFT';
export const TENDER_DELETE_DRAFT = 'TENDER_DELETE_DRAFT';

export const BID_SET_BID = 'BID_SET_BID';
export const BID_SAVE_DRAFT = 'BID_SAVE_DRAFT';
export const BID_LOAD_DRAFTS = 'BID_LOAD_DRAFTS';
export const BID_UPDATE_DRAFT = 'BID_UPDATE_DRAFT';
export const BID_DELETE_DRAFT = 'BID_DELETE_DRAFT';

// Mutations
export const SESSION_SET_PROPERTY = 'SESSION_SET_PROPERTY';

export const PROCUREMENT_SET_PROPERTY = 'PROCUREMENT_SET_PROPERTY';

export const TENDER_SET_PROPERTY = 'TENDER_SET_PROPERTY';
export const TENDER_SET_TENDER_ID = 'TENDER_SET_TENDER_ID';
export const TENDER_ADD_SECTION = 'TENDER_ADD_SECTION';
export const TENDER_DELETE_SECTION = 'TENDER_DELETE_SECTION';
export const TENDER_ADD_QUESTION_TO_SECTION = 'TENDER_ADD_QUESTION_TO_SECTION';
export const TENDER_DELETE_QUESTION_FROM_SECTION = 'TENDER_DELETE_QUESTION_FROM_SECTION';
export const TENDER_ADD_FILE = 'TENDER_ADD_FILE';
export const TENDER_DELETE_FILE = 'TENDER_DELETE_FILE';
export const TENDER_SET_SCHEDULE_DATE = 'TENDER_SET_SCHEDULE_DATE';
export const TENDER_UPDATE_FILE = 'TENDER_UPDATE_FILE';

export const BID_SET_PROPERTY = 'BID_SET_PROPERTY';
export const BID_SET_BID_ID = 'BID_SET_BID_ID';

// Getters
export const SESSION_IS_LOGGED = 'SESSION_IS_LOGGED';

// Constants
export const MAIN_FOLDER = 'procurement';
export const DB_FOLDER = [MAIN_FOLDER, 'db'].join('/');
export const FILE_FOLDER = [MAIN_FOLDER, 'files'].join('/');

// Types
export const TENDER_BASE_TENDER = {
  number: '3490',
  office: null,
  unspsc: null,
  name: 'Programa de alimentos escolar',
  description: null,
  relatedToProcess: null,
  paa: null,
  contractType: null,
  notifications: null,
  commercialAgreements: null,
  insideDocuments: null,
  priceBenchmarkDocs: [],
  schedule: {
    rfpPublishingAnnouncementStudies: moment().format('X'),
    rfpObservationDeadline: moment()
      .add(10, 'days').format('X'),
    rfpObservationResponsesDeadline: moment()
      .add(15, 'days')
      .format('X'),
    definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease: moment()
      .add(15, 'days')
      .format('X'),
    riskAssignationHearing: moment()
      .add(15, 'days')
      .format('X'),
    finalRfpObservationsDeadline: moment()
      .add(16, 'days')
      .format('X'),
    finalRfpObservationsResponsesDeadline: moment()
      .add(21, 'days')
      .format('X'),
    addendumIssuingDeadline: moment()
      .add(25, 'days')
      .format('X'),
    bidOfferingsClosed: moment()
      .add(25, 'days')
      .format('X'),
    bidsOpening: moment()
      .add(25, 'days')
      .format('X'),
    bidOfferingReport: moment()
      .add(25, 'days')
      .format('X'),
    bidOfferingReportPublishing: moment()
      .add(30, 'days')
      .format('X'),
    observationsOnEvaluationOrVerificationReport: moment()
      .add(35, 'days')
      .format('X'),
    adjudicationHearingAdministrativeActPublishing: moment()
      .add(36, 'days')
      .format('X'),
    contractSign: moment()
      .add(37, 'days')
      .format('X'),
    bidValidWarranties: moment()
      .add(38, 'days')
      .format('X'),
    duration: '90',
    durationType: 'Days',
  },
  definePaymentPlan: null,
  advancePayments: null,
  warranties: null,
  seriousness: null,
  compliance: null,
  civilLiability: null,
  mipymes: false,
  allowVisitsToThePlaceOfWork: null,
  defineLots: null,
  definePriceBoundariesPerLot: null,
  basePrice: '999',
  peaceAgreement: null,
  expenseType: null,
  budgetOrigin: null,
  registeredInSIIF: null,
  defineAdvancedSettings: false,
  questionnaireHash: null,
  questionnaire: [{
    name: 'criterios habilitantes',
    lots: [],
    questions: [{
      type: 'BOOLEAN', text: 'cerrada 1', weight: '444', mandatory: '1', priceList: [],
    }, {
      type: 'FILE', text: 'archivo 1', weight: '555', mandatory: '1', priceList: [],
    }],
  }, {
    name: 'criterios ponderantes',
    lots: [],
    questions: [{
      type: 'TEXT_AREA', text: 'abierta 1', weight: '444', mandatory: '', priceList: [],
    }, {
      type: 'NUMBER', text: 'numero 1', weight: '66', mandatory: '1', priceList: [],
    }],
  }],
  lots: [],
  filesList: [
    { name: 'Analisis de sector EP', ipfsHash: '', extension: '' },
    { name: 'Estudio previo', ipfsHash: '', extension: '' },
    { name: 'Especificaciones tecnicas', ipfsHash: '', extension: '' },
    { name: 'Certificados disponibilidad presupuestal', ipfsHash: '', extension: '' },
    { name: 'Contexto y matriz de riesgo', ipfsHash: '', extension: '' },
    { name: 'Presupuesto lotes', ipfsHash: '', extension: '' },
    { name: 'Aviso convocatoria', ipfsHash: '', extension: '' },
    { name: 'Proyecto de pliego de condiciones', ipfsHash: '', extension: '' },
    { name: 'Anexo A - ciclos de menu', ipfsHash: '', extension: '' },
    { name: 'Anexo B - caracteristicas de alimentos', ipfsHash: '', extension: '' },
    { name: 'Anexo C - cobertura PAE x IE', ipfsHash: '', extension: '' },
    { name: 'Anexo D - marcas de productos', ipfsHash: '', extension: '' },
    { name: 'Anexo E - Guias de preparacion', ipfsHash: '', extension: '' },
    { name: 'Anexo F - Plan de alimentacion', ipfsHash: '', extension: '' },
    { name: 'Pliego de condiciones', ipfsHash: '', extension: '' },
    { name: 'Resolucion de apertura', ipfsHash: '', extension: '' },
    { name: 'Adenda 01', ipfsHash: '', extension: '' },
  ],
};

export const TENDER_BASE_SECTION = {
  name: null,
  lots: [],
  questions: [],
};

export const TENDER_BASE_LOT = {
  priceEstimated: null,
  priceList: [],
};

export const TENDER_BASE_QUESTION = {
  type: null,
  text: null,
  weight: null,
  mandatory: '',
  priceList: [],
};

export const TENDER_BASE_PRICE_ITEM = {
  reference: null,
  unspscCode: null,
  description: null,
  quantity: null,
  unit: null,
  estimatedUnitaryPrice: null,
  estimatedTotalPrice: null,
};

export const TENDER_BASE_LIST_OPTION = {
  code: null,
  text: null,
};

export const TENDER_BASE_FILE = {
  name: null,
};

export const TENDER_STATE = {
  DRAFT: 'DRAFT',
  DEPLOYED: 'DEPLOYED',
};

export const TENDER_BASE_DATA_TYPES = {
  TEXT: 'TEXT',
  TEXT_AREA: 'TEXT_AREA',
  BOOLEAN: 'BOOLEAN',
  DROPDOWN: 'DROPDOWN',
  FILE: 'FILE',
  TEXT_AND_DROPDOWN: 'TEXT_AND_DROPDOWN',
  CHECKBOX: 'CHECKBOX',
  LIST: 'LIST',
  NUMBER: 'NUMBER',
  DATE: 'DATE',
  DYNAMIC_FILE: 'DYNAMIC_FILE',
};

export const TENDER_BASE_USER_DEFINED_DATA_TYPES = {
  TEXT_AREA: 'Abierta',
  BOOLEAN: 'Cerrada',
  FILE: 'Archivo',
  NUMBER: 'Número',
  // PRICE_LIST: 'Lista de precios',
};

export const OBSERVATION_FORM_TYPES = {
  RESPONSE: 'respuesta',
  OBSERVATION: 'observación',
};

export const FILE_LOADER_TYPES = {
  IPFS: 'IPFS',
  DATABASE: 'DATABASE',
};

export const BID_BASE_BID = {};
