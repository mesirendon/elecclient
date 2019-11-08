import * as constants from '@/store/constants';
import Vue from 'vue';


const state = {
  bid: { ...constants.BID_BASE_BID },
  bids: [],
  error: null,
};

const actions = {
  [constants.BID_SET_BID]: ({ commit }, bid = { ...constants.BID_BASE_BID }) => {
    commit(constants.BID_SET_PROPERTY, {
      property: 'bid',
      value: bid,
    });
  },
  [constants.BID_SAVE_DRAFT]: (
    { commit, dispatch },
    bid = { ...constants.BID_BASE_BID },
  ) => {
    Vue.db.Bid.insert(bid, (error, newBid) => {
      if (error) {
        commit(constants.BID_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
      }
      commit(constants.BID_SET_PROPERTY, {
        property: 'bid',
        value: newBid,
      });
      dispatch(constants.BID_LOAD_DRAFTS);
    });
  },
  [constants.BID_LOAD_DRAFTS]: ({ commit }) => {
    Vue.db.Bid.find({}, (error, bids) => {
      if (error) {
        commit(constants.BID_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
      }
      commit(constants.BID_SET_PROPERTY, {
        property: 'bids',
        value: bids,
      });
    });
  },
  [constants.BID_UPDATE_DRAFT]: ({ commit, dispatch }, { _id, ...bid }) => {
    Vue.db.Bid.update({ _id }, bid, {}, (error) => {
      if (error) {
        commit(constants.BID_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
      }
      commit(constants.BID_SET_PROPERTY, {
        property: 'bid',
        value: bid,
      });
      commit(constants.BID_SET_BID_ID, _id);
      dispatch(constants.BID_LOAD_DRAFTS);
    });
  },
  [constants.BID_DELETE_DRAFT]: ({ commit, dispatch }, _id) => {
    Vue.db.Bid.remove({ _id }, {}, (error) => {
      if (error) {
        commit(constants.BID_SET_PROPERTY, {
          property: 'error',
          value: error,
        });
        return;
      }
      dispatch(constants.BID_LOAD_DRAFTS);
    });
  },
};

const mutations = {
  [constants.BID_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
  [constants.BID_SET_BID_ID]: (state, _id) => {
    // eslint-disable-next-line no-underscore-dangle
    state.bid._id = _id;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
