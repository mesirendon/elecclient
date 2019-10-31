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

export const BID_INIT = 'BID_INIT';

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

export const BID_SET_PROPERTY = 'BID_SET_PROPERTY';

// Getters
export const SESSION_IS_LOGGED = 'SESSION_IS_LOGGED';

// Constants
export const DB_FOLDER = 'procurement';
export const FILE_FOLDER = 'files';

// Types
export const TENDER_BASE_TENDER = {
  number: null,
  office: null,
  unspsc: null,
  name: null,
  description: null,
  relatedToProcess: null,
  paa: null,
  contractType: null,
  notifications: null,
  comercialAgreements: null,
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
  basePrice: null,
  peaceAgreement: null,
  expenseType: null,
  budgetOrigin: null,
  registeredInSIIF: null,
  defineAdvancedSettings: false,
  questionnaire: [],
  lots: [],
  filesList: [
    { name: 'Analisis de sector EP' },
    { name: 'Estudio previo' },
    { name: 'Especificaciones tecnicas' },
    { name: 'Certificados disponibilidad presupuestal' },
    { name: 'Contexto y matriz de riesgo' },
    { name: 'Presupuesto lotes' },
    { name: 'Aviso convocatoria' },
    { name: 'Proyecto de pliego de condiciones' },
    { name: 'Anexo A - ciclos de menu' },
    { name: 'Anexo B - caracteristicas de alimentos' },
    { name: 'Anexo C - cobertura PAE x IE' },
    { name: 'Anexo D - marcas de productos' },
    { name: 'Anexo E - Guias de preparacion' },
    { name: 'Anexo F - Plan de alimentacion' },
    { name: 'Pliego de condiciones' },
    { name: 'Resolucion de apertura' },
    { name: 'Adenda 01' },
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
  TEXT: 'Texto',
  TEXT_AREA: 'Abierta',
  BOOLEAN: 'Cerrada',
  DROPDOWN: 'Lista',
  FILE: 'Archivo',
  TEXT_AND_DROPDOWN: 'Texto simple y lista',
  CHECKBOX: 'Opciones múltiples',
  LIST: 'Lista con búsqueda',
  NUMBER: 'Número',
  DATE: 'Fecha',
  DYNAMIC_FILE: 'Archivo dinamico',
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

