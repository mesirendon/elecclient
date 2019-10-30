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
  [constants.TENDER_SAVE_DRAFT]: (
    { commit, dispatch },
    tender = { ...constants.TENDER_BASE_TENDER },
  ) => {
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
      dispatch(constants.TENDER_LOAD_DRAFTS);
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
  [constants.TENDER_UPDATE_DRAFT]: ({ commit, dispatch }, { _id, ...tender }) => {
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
      dispatch(constants.TENDER_LOAD_DRAFTS);
    });
  },
  [constants.TENDER_DELETE_DRAFT]: ({ commit, dispatch }, _id) => {
    Vue.db.Tender.remove({ _id }, {}, (error) => {
      if (error) {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
        return;
      }
      dispatch(constants.TENDER_LOAD_DRAFTS);
    });
  },
  [constants.TENDER_ADD_SECTION_TO_QUESTIONNAIRE]: ({ commit }, section) => {
    commit(constants.TENDER_ADD_SECTION, section);
  },
  [constants.TENDER_DELETE_SECTION_FROM_QUESTIONNAIRE]: ({ commit }, sectionIdx) => {
    commit(constants.TENDER_DELETE_SECTION, sectionIdx);
  },
};

const mutations = {
  [constants.TENDER_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
  [constants.TENDER_ADD_SECTION]: (state, section) => {
    state.tender.questionnaire.push(section);
  },
  [constants.TENDER_DELETE_SECTION]: (state, sectionIdx) => {
    state.tender.questionnaire.splice(sectionIdx, 1);
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
