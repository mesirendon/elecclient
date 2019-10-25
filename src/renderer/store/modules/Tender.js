import Vue from 'vue';
import * as constants from '@/store/constants';

const baseTender = {
  number: null,
  office: null,
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
};

const state = {
  tender: { ...baseTender },
  tenders: [],
  error: null,
};

const actions = {
  [constants.TENDER_SET_TENDER]: ({ commit }, tender = { ...baseTender }) => {
    commit(constants.TENDER_SET_PROPERTY, {
      property: 'tender',
      value: tender,
    });
  },
  [constants.TENDER_SAVE_DRAFT]: ({ commit }, tender = { ...baseTender }) => {
    Vue.db.Tender.insert(tender, (error, newTender) => {
      if (error) {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
      }
      commit(constants.TENDER_SET_PROPERTY, {
        property: 'tender',
        value: newTender,
      });
    });
  },
  [constants.TENDER_LOAD_DRAFTS]: ({ commit }) => {
    Vue.db.Tender.find({}, (error, tenders) => {
      if (error) {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
      }
      commit(constants.TENDER_SET_PROPERTY, {
        property: 'tenders',
        value: tenders,
      });
    });
  },
  [constants.TENDER_UPDATE_DRAFT]: ({ commit }, { _id, ...tender }) => {
    Vue.db.Tender.update({ _id }, tender, {}, (error) => {
      if (error) {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
      }
      commit(constants.TENDER_SET_PROPERTY, {
        property: 'tender',
        value: tender,
      });
    });
  },
};

const mutations = {
  [constants.TENDER_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
