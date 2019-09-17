import * as constants from '@/store/constants';
import * as Bip39 from 'bip39';

Bip39.setDefaultWordlist('spanish');

const state = {
  account: null,
  privateKey: null,
  mnemonic: Bip39.generateMnemonic()
    .split(' '),
};

const actions = {};

const mutations = {
  [constants.SESSION_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
};

const getters = {
  [constants.SESSION_IS_LOGGED]: state => state.account !== null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
