<template>
  <div>
    <div class="observation">
      <div class="row align-items-center">
        <div class="col description">
          <p>{{observation.plain}}</p>
        </div>
        <div class="col-2">
          <button v-if="observation.hash" type="button" class="btn btn-secondary minor-separated">
            Descargar
          </button>
          <button v-if="showResponseButton" type="button" class="btn btn-primary" @click="showForm = true">
            Responder
          </button>
        </div>
      </div>
    </div>
    <div v-if="observation.resPlain" class="response-form">
      <div class="row align-items-center">
        <div class="col description">
          <p>{{observation.resPlain}}</p>
        </div>
        <div class="col-2">
          <button v-if="observation.resHash" type="button" class="btn btn-secondary minor-separated">
            Descargar
          </button>
        </div>
      </div>
    </div>
    <div class="response-form" v-if="showResponseForm">
      <observation-form :type="observationFormTypes.RESPONSE" @observation="sendResponse"></observation-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ObservationForm from '@/components/common/ObservationForm';
import * as constants from '@/store/constants';

export default {
  name: 'Observation',
  data() {
    return {
      observationFormTypes: constants.OBSERVATION_FORM_TYPES,
      sentResponse: false,
      showForm: false,
    };
  },
  components: {
    ObservationForm,
  },
  props: {
    observation: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      client: state => state.Session.client,
    }),
    showResponseButton() {
      return (this.client === 'tenderer') && !(this.showForm || this.observation.resPlain);
    },
    showResponseForm() {
      return this.showForm && !(this.sentResponse || this.observation.resPlain);
    },
  },
  methods: {
    sendResponse({ plain, hash }) {
      this.$emit('response', { plain, hash, key: this.index });
    },
  },
};
</script>
