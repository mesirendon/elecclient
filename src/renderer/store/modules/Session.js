import Vue from 'vue';
import * as constants from '@/store/constants';
import * as Bip39 from 'bip39';
import * as Bip32 from 'bip32';

Bip39.setDefaultWordlist('spanish');

const state = {
  account: null,
  publicKey: null,
  privateKey: null,
  mnemonic: Bip39.generateMnemonic()
    .split(' '),
};

const actions = {
  [constants.SESSION_GENERATE_ACCOUNT]: ({ commit, state }) => {
    const seed = Bip39.mnemonicToSeedSync(state.mnemonic.join(' '));
    const root = Bip32.fromSeed(seed);
    const path = "m/44'/60'/0'/0/0";
    const child = root.derivePath(path);
    const privateKey = `0x${child.privateKey.toString('hex')}`;
    const publicKey = `0x${child.publicKey.toString('hex')}`;
    const address = Vue.web3.eth.accounts.privateKeyToAccount(privateKey);
    commit(constants.SESSION_SET_PROPERTY, {
      property: 'account',
      value: address.address,
    });
    commit(constants.SESSION_SET_PROPERTY, {
      property: 'publicKey',
      value: publicKey,
    });
    commit(constants.SESSION_SET_PROPERTY, {
      property: 'privateKey',
      value: privateKey,
    });
  },
};

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
