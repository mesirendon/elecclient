import Tender from '@/handlers/tender';
import * as constants from '@/store/constants';
import { log } from 'electron-log';

const state = {
  biddingFlag: null,
  description: null,
  bids: [],
  messages: [],
  observations: [],
  winnerObservations: [],
  winner: null,
  ipfsHash: null,
};

const actions = {
  [constants.TENDER_INIT]: ({ dispatch }, address) => {
    Tender.init(address);
    dispatch(constants.TENDER_GET_BIDDING_PERIOD);
    dispatch(constants.TENDER_GET_TENDER_DESCRIPTION);
    dispatch(constants.TENDER_GET_BIDS);
    dispatch(constants.TENDER_GET_MESSAGES);
    dispatch(constants.TENDER_GET_OBSERVATIONS);
    dispatch(constants.TENDER_GET_WINNER_OBSERVATIONS);
    dispatch(constants.TENDER_GET_WINNER);
  },
  [constants.TENDER_GET_BIDDING_PERIOD]: ({ commit }) => {
    Tender.getBiddingPeriod()
      .then((flag) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'biddingFlag',
          value: flag,
        });
      });
  },
  [constants.TENDER_GET_TENDER_DESCRIPTION]: ({ commit }) => {
    Tender.getDescription()
      .then((description) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'description',
          value: description,
        });
      });
  },
  [constants.TENDER_GET_BIDS]: ({ commit }) => {
    Tender.getBids()
      .then((bids) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'bids',
          value: bids,
        });
      });
  },
  [constants.TENDER_CREATE_BID]: ({ rootState, dispatch }) => {
    Tender.createBid(rootState.Session.account)
      .then(() => dispatch(constants.TENDER_GET_BIDS));
  },
  [constants.TENDER_SEND_MESSAGE]: ({ rootState, dispatch }, message) => {
    Tender.sendMessage(message, rootState.Session.account)
      .then(() => dispatch(constants.TENDER_GET_MESSAGES));
  },
  [constants.TENDER_GET_MESSAGES]: ({ commit }) => {
    Tender.getMessages()
      .then((messages) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'messages',
          value: messages,
        });
      });
  },
  [constants.TENDER_GET_OBSERVATIONS]: ({ commit }) => {
    Tender.getObservations()
      .then((observations) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'observations',
          value: observations,
        });
      });
  },
  [constants.TENDER_GET_WINNER_OBSERVATIONS]: ({ commit }) => {
    Tender.getWinnerObservations()
      .then((winnerObservations) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'winnerObservations',
          value: winnerObservations,
        });
      });
  },
  [constants.TENDER_GET_WINNER]: ({ commit }) => {
    Tender.getWinner()
      .then((winner) => {
        commit(constants.TENDER_SET_PROPERTY, {
          property: 'winner',
          value: winner,
        });
      });
  },
  [constants.TENDER_SUBMIT_OBSERVATION]: (
    { dispatch, rootState },
    { plain, hash },
  ) => {
    Tender.sendObservation(
      rootState.Session.account,
      rootState.route.params.address,
      rootState.Session.privateKey,
      {
        plain,
        hash,
      },
    )
      .then(() => dispatch(constants.TENDER_GET_OBSERVATIONS));
  },
  [constants.TENDER_START_AUCTION]: ({ rootState }) => {
    Tender.startAuction(rootState.Session.account)
      .then(log);
  },
};

const mutations = {
  [constants.TENDER_SET_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
};

const getters = {
  [constants.TENDER_GET_IS_EMPTY_BIDS]: state => state.bids.length === 0,
  [constants.TENDER_GET_IS_WINNER_SET]: state => state.winner !== '0x0000000000000000000000000000000000000000',
};

export default {
  state,
  actions,
  mutations,
  getters,
};
