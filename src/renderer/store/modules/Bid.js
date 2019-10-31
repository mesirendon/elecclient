import * as constants from '@/store/constants';


const state = {
  bid: null,
};

const actions = {
  [constants.BID_INIT]: ({ commit }, address) => {
    commit(constants.BID_SET_PROPERTY, {
      property: 'bid',
      value: address,
    });
  },
};

const mutations = {
  [constants.BID_SET_PROPERTY]: (state, { property, value }) => {
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
