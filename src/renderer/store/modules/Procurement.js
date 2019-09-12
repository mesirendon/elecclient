// eslint-disable-next-line no-unused-vars
import * as constants from '@/store/constants';
const state = {
  tenders: null,
};

const actions = {
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
