import Bid from '@/handlers/bid';
import * as constants from '@/store/constants';


const state = {
  instance: null,
  observations: [],
  scoreObservations: [],
  score: null,
  observationsLoading: false,
  scoreObservationsLoading: false,
};

const actions = {
  [constants.BID_INIT]: ({ commit, dispatch }, address) => {
    Bid.init(address);
    Bid.getScore()
      .then((score) => {
        commit(constants.BID_SET_PROPERTY, {
          property: 'score',
          value: score,
        });
      });
    dispatch(constants.BID_GET_OBSERVATIONS);
    dispatch(constants.BID_GET_SCORE_OBSERVATIONS);
  },
  [constants.BID_GET_OBSERVATIONS]: ({ commit }) => {
    Bid.getObservations()
      .then((observations) => {
        commit(constants.BID_SET_PROPERTY, {
          property: 'observations',
          value: observations,
        });
      });
  },
  [constants.BID_GET_SCORE_OBSERVATIONS]: ({ commit }) => {
    Bid.getScoreObservations()
      .then((scoreObservations) => {
        commit(constants.BID_SET_PROPERTY, {
          property: 'scoreObservations',
          value: scoreObservations,
        });
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
