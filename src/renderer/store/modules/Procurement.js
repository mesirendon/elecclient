import Procurement from '@/handlers/procurement';
import * as constants from '@/store/constants';

Procurement.init();

const state = {
  tenders: null,
};

const actions = {
  [constants.PROCUREMENT_GET_TENDERS]: ({ commit }) => {
    Procurement.getTenders()
      .then((tenders) => {
        commit(constants.PROCUREMENT_SET_PROPERTY, {
          property: 'tenders',
          value: tenders,
        });
      });
  },
};

const mutations = {
  [constants.PROCUREMENT_SET_PROPERTY]: (state, { property, value }) => {
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
