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
      commit(constants.TENDER_SET_TENDER_ID, _id);
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
};

const mutations = {
  [constants.TENDER_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
  [constants.TENDER_SET_TENDER_PROPERTY]: (state, { property, data }) => {
    state.tender[property] = data;
  },
  [constants.TENDER_SET_SCHEDULE_DATE]: (state, { property, value }) => {
    state.tender.schedule[property] = value;
  },
  [constants.TENDER_ADD_SECTION]: (state, section) => {
    state.tender.questionnaire.push(section);
  },
  [constants.TENDER_DELETE_SECTION]: (state, sectionIdx) => {
    state.tender.questionnaire.splice(sectionIdx, 1);
  },
  [constants.TENDER_ADD_QUESTION_TO_SECTION]: (state, { idx, question }) => {
    state.tender.questionnaire[idx].questions.push(question);
  },
  [constants.TENDER_DELETE_QUESTION_FROM_SECTION]: (state, { idx, questionIdx }) => {
    state.tender.questionnaire[idx].questions.splice(questionIdx, 1);
  },
  [constants.TENDER_SET_TENDER_ID]: (state, _id) => {
    // eslint-disable-next-line no-underscore-dangle
    state.tender._id = _id;
  },
  [constants.TENDER_ADD_FILE]: (state, file) => {
    state.tender.filesList.push(file);
  },
  [constants.TENDER_DELETE_FILE]: (state, fileIdx) => {
    state.tender.filesList.splice(fileIdx, 1);
  },
  [constants.TENDER_ADD_LOT]: (state, lot) => {
    state.tender.lots.push(lot);
  },
  [constants.TENDER_LINK_LOT]: (state, { sectionIdx, lotIdx }) => {
    state.tender.questionnaire[sectionIdx].lot = lotIdx;
  },
  [constants.TENDER_DELETE_LOT]: (state, lotIdx) => {
    state.tender.lots.splice(lotIdx, 1);
  },
  [constants.TENDER_UPDATE_FILE]: (state, { fileIdx, Hash }) => {
    state.tender.filesList[fileIdx].ipfsHash = Hash;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
