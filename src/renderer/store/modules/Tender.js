import * as constants from '@/store/constants';

const state = {
  tender: null,
};

const actions = {
  [constants.TENDER_INIT]: ({ commit }, address) => {
    commit(constants.TENDER_SET_PROPERTY, {
      property: 'tender',
      value: address,
    });
  },
};

const mutations = {
  [constants.TENDER_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
};

const getters = {
};

export default {
  state,
  actions,
  mutations,
  getters,
};
