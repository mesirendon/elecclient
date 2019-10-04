<template>
  <div>
    <br>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Observación</span>
            </div>
            <textarea v-model="observation.plain" class="form-control" aria-label="Observación">
            </textarea>
          </div>
        </div>
        <div class="col">
          <p v-if="observation.hash">{{observation.hash}}</p>
          <file-loader @loaded="setObservationFile" v-else></file-loader>
        </div>
        <p v-if="ipfsHash">Hash del archivo{{ipfsHash}}</p>
      </div>
    </div>
    <br>
    <div>
      <button class="btn btn-secondary" @click="uploadObservation">Enviar observación</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';
import FileLoader from '@/components/common/FileLoader';

export default {
  name: 'Observations',
  data() {
    return {
      observation: {
        plain: null,
        hash: null,
      },
    };
  },
  components: {
    FileLoader,
  },
  props: {
    case: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      ipfsHash: state => state.Tender.ipfsHash,
    }),
  },
  methods: {
    ...mapActions({
      tenderSubmitObservation: constants.TENDER_SUBMIT_OBSERVATION,
      tenderSubmitWinnerObservation: constants.TENDER_SUBMIT_WINNER_OBSERVATION,
      bidSubmitObservation: constants.BID_SUBMIT_OBSERVATION,
      bidSubmitScoreObservation: constants.BID_SUBMIT_SCORE_OBSERVATION,
    }),
    uploadObservation() {
      switch (this.case) {
        case constants.TENDER_SUBMIT_OBSERVATION:
          this.tenderSubmitObservation(this.observation);
          break;
        case constants.TENDER_SUBMIT_WINNER_OBSERVATION:
          this.tenderSubmitWinnerObservation(this.observation);
          break;
        case constants.BID_SUBMIT_OBSERVATION:
          this.bidSubmitObservation(this.observation);
          break;
        case constants.BID_SUBMIT_SCORE_OBSERVATION:
          this.bidSubmitScoreObservation(this.observation);
          break;
        default:
          break;
      }
      this.$emit('sent');
    },
    setObservationFile(ipfsHash) {
      this.observation.hash = ipfsHash;
    },
  },
};
</script>

<style scoped>

</style>
