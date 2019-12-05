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
export const TENDER_ADD_LOT = 'TENDER_ADD_LOT';
export const TENDER_DELETE_LOT = 'TENDER_DELETE_LOT';
export const TENDER_ADD_PRICE_LIST_ITEM = 'TENDER_ADD_PRICE_LIST_ITEM';
export const TENDER_UPDATE_FILE = 'TENDER_UPDATE_FILE';
export const TENDER_SET_TENDER_PROPERTY = 'TENDER_SET_TENDER_PROPERTY';
export const TENDER_LINK_LOT = 'TENDER_LINK_LOT';
export const TENDER_UPDATE_EVIDENCE_FILE = 'TENDER_UPDATE_EVIDENCE_FILE';

export const BID_SET_PROPERTY = 'BID_SET_PROPERTY';
export const BID_SET_BID_ID = 'BID_SET_BID_ID';
export const BID_UPDATE_FILE = 'BID_UPDATE_FILE';
export const BID_SET_ANSWERED_LOT = 'BID_SET_ANSWERED_LOT';
export const BID_SET_ITEM = 'BID_SET_ITEM';

// Getters
export const SESSION_IS_LOGGED = 'SESSION_IS_LOGGED';

// Constants
export const MAIN_FOLDER = 'procurement';
export const DB_FOLDER = [MAIN_FOLDER, 'db'].join('/');
export const FILE_FOLDER = [MAIN_FOLDER, 'files'].join('/');

// Types
export const TENDER_FORM_TAGS = {
  GENERAL_INFO: 'GENERAL_INFO',
  SCHEDULE: 'SCHEDULE',
  QUESTIONNAIRE: 'QUESTIONNAIRE',
  LOT: 'LOT',
  DOCUMENTS: 'DOCUMENTS',
};

export const TENDER_BASE_TENDER = {
  tenderer: null,
  number: null,
  office: null,
  procedureTeam: null,
  unspsc: null,
  name: null,
  description: null,
  relatedToProcess: false,
  paa: false,
  duration: null,
  durationType: null,
  contractType: null,
  notifications: null,
  commercialAgreements: false,
  schedule: {
    rfpPublishingAnnouncementStudies: moment()
      .format('X'),
    rfpObservationDeadline: moment()
      .add(10, 'days')
      .format('X'),
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
    bidMaintenanceTerm: null,
    bidMaintenanceTermType: null,
  },
  definePaymentPlan: false,
  advancePayments: false,
  warranties: false,
  seriousness: false,
  seriousnessCheck: null,
  seriousnessPercentage: null,
  seriousnessMinWages: null,
  compliance: false,
  complianceInvestment: null,
  complianceInvestmentPercentage: null,
  complianceInvestmentStartDate: null,
  complianceInvestmentEndDate: null,
  complianceContract: null,
  complianceContractPercentage: null,
  complianceContractStartDate: null,
  complianceContractEndDate: null,
  complianceWages: null,
  complianceWagesPercentage: null,
  complianceWagesStartDate: null,
  complianceWagesEndDate: null,
  complianceGoodsQuality: null,
  complianceGoodsPercentage: null,
  complianceGoodsStartDate: null,
  complianceGoodsEndDate: null,
  civilLiability: false,
  civilLiabilityCheck: null,
  civilLiabilityMinWages: null,
  civilLiabilityPercentage: null,
  civilLiabilityValue: null,
  mipymes: false,
  allowVisitsToThePlaceOfWork: false,
  basePrice: null,
  peaceAgreement: false,
  expenseType: null,
  budgetOrigin: null,
  registeredInSIIF: false,
  defineAdvancedSettings: false,
  questionnaireHash: null,
  questionnaire: [],
  lotsHash: null,
  lots: [],
  filesList: [
    {
      name: 'Análisis de sector EP',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Estudio previo',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Especificaciones técnicas',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Certificados disponibilidad presupuestal',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Contexto y matriz de riesgo',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Presupuesto lotes',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Aviso convocatoria',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Proyecto de pliego de condiciones',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Anexo A - ciclos de menú',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Anexo B - características de alimentos',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Anexo C - cobertura PAE x IE',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Anexo D - marcas de productos',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Anexo E - Guías de preparacion',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Anexo F - Plan de alimentación',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Pliego de condiciones',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Resolución de apertura',
      ipfsHash: '',
      fileName: '',
    },
    {
      name: 'Adenda 01',
      ipfsHash: '',
      fileName: '',
    },
  ],
};

export const TENDER_BASE_SECTION = {
  name: null,
  lot: null,
  questions: [],
};

export const TENDER_BASE_LOT = {
  name: null,
  basePrice: null,
  priceList: [],
};

export const TENDER_BASE_QUESTION = {
  type: null,
  text: null,
  weight: null,
  mandatory: '',
};

export const TENDER_BASE_PRICE_LIST = {
  title: null,
  allItemsRequired: null,
  requireEvidence: null,
  evidenceFile: null,
  evidenceFileHash: null,
  defineUnspscCode: null,
};

export const TENDER_BASE_PRICE_LIST_ITEM = {
  unspscCode: null,
  description: null,
  quantity: 0,
  unit: null,
  estimatedUnitaryPrice: 0,
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

export const BID_BASE_BID = {
  bidHash: null,
};
