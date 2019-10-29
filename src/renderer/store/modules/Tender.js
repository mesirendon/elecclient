import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  tender: { ...constants.TENDER_BASE_TENDER },
  tenders: [],
  error: null,
};

const actions = {
  [constants.TENDER_SET_TENDER]: ({ commit }, tender = { ...constants.TENDER_BASE_TENDER }) => {
    commit(constants.TENDER_SET_PROPERTY, {
      property: 'tender',
      value: tender,
    });
  },
  [constants.TENDER_SAVE_DRAFT]: ({ commit }, tender = { ...constants.TENDER_BASE_TENDER }) => {
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
