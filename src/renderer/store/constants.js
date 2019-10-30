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

export const BID_SET_PROPERTY = 'BID_SET_PROPERTY';

// Getters
export const SESSION_IS_LOGGED = 'SESSION_IS_LOGGED';

// Types
export const TENDER_BASE_TENDER = {
  number: null,
  office: null,
  unspsc: null,
  name: null,
  description: null,
  priceBenchmarkDocs: [],
  schedule: {
    rfpPublishing: null,
    publicProcurementRfpPublishing: null,
    studiesPublishing: null,
    rfpObservationDeadline: null,
    mipymesProcurementLimitationInterestManifestationDeadline: null,
    definitiveRfpTermsPublishing: null,
    selectionProcessOpeningAdministrativeActPublishingAndRelease: null,
    riskAssignationHearing: null,
    rfpObservationsResponseDeadline: null,
    addendumIssuingDeadline: null,
    bidOfferings: null,
    bidsOpening: null,
    bidOfferingReport: null,
    bidOfferingReportPublishing: null,
    observationsOnEvaluationOrVerificationReport: null,
    adjudicationHearing: null,
    emptyDeclarationOrAdjudicationAdministrativeActPublishing: null,
    contractSign: null,
    bidValidTerm: null,
    bidValidTermUnit: null,
  },
  questionnaire: [],
};

export const TENDER_BASE_SECTION = {
  questions: [],
};

export const TENDER_BASE_QUESTION = {
  type: null,
  text: null,
  answer: null,
  list: [],
};

export const TENDER_BASE_LIST_OPTION = {
  code: null,
  text: null,
};

export const TENDER_STATE = {
  DRAFT: 'DRAFT',
  DEPLOYED: 'DEPLOYED',
};

export const TENDER_BASE_DATA_TYPES = {
  TEXT: 'TEXT',
  TEXT_AREA: 'TEXT_AREA',
  BOOLEAN: 'BOOLEAN',
  DROPDOWN: 'LIST',
  FILE: 'FILE',
  TEXT_AND_DROPDOWN: 'TEXT_AND_DROPDOWN',
  CHECKBOX: 'CHECKBOX',
  LIST: 'LIST',
};
