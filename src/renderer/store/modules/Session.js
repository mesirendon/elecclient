import Vue from 'vue';
import * as constants from '@/store/constants';
import * as Bip39 from 'bip39';
import * as Bip32 from 'bip32';
import _ from 'lodash';

Bip39.setDefaultWordlist('spanish');

const state = {
  client: null,
  account: null,
  publicKey: null,
  privateKey: null,
  mnemonic: Bip39.generateMnemonic()
    .split(' '),
};

const actions = {
  [constants.SESSION_LOAD_DB]: ({ commit }) => {
    Vue.db.find({ name: 'client' }, (error, docs) => {
      if (error) return;
      if (_.isEmpty(docs)) return;
      const [client] = docs;
      commit(constants.SESSION_SET_PROPERTY, {
        property: 'client',
        value: client.client,
      });
    });
    Vue.db.find({ name: 'defaultAccount' }, (error, docs) => {
      if (error) return;
      if (_.isEmpty(docs)) return;
      const [account] = docs;
      commit(constants.SESSION_SET_PROPERTY, {
        property: 'account',
        value: account.address,
      });
      commit(constants.SESSION_SET_PROPERTY, {
        property: 'publicKey',
        value: account.publicKey,
      });
      commit(constants.SESSION_SET_PROPERTY, {
        property: 'privateKey',
        value: account.privateKey,
      });
    });
  },
  [constants.SESSION_SET_CLIENT]: ({ commit }, client) => {
    Vue.db.insert({
      name: 'client',
      client,
    });
    commit(constants.SESSION_SET_PROPERTY, {
      property: 'client',
      value: client,
    });
  },
  [constants.SESSION_GENERATE_ACCOUNT]: ({ commit, state }) => {
    const seed = Bip39.mnemonicToSeedSync(state.mnemonic.join(' '));
    const root = Bip32.fromSeed(seed);
    const path = 'm/44\'/60\'/0\'/0/0';
    const child = root.derivePath(path);
    const privateKey = `0x${child.privateKey.toString('hex')}`;
    const publicKey = `0x${child.publicKey.toString('hex')}`;
    const address = Vue.web3.eth.accounts.privateKeyToAccount(privateKey);
    const account = {
      name: 'defaultAccount',
      address: address.address,
      publicKey,
      privateKey,
    };
    Vue.db.insert(account);
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
  [constants.SESSION_RECOVER_ACCOUNT]: ({ commit, dispatch }, mnemonic) => {
    commit(constants.SESSION_SET_PROPERTY, {
      property: 'mnemonic',
      value: mnemonic,
    });
    dispatch(constants.SESSION_GENERATE_ACCOUNT);
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
