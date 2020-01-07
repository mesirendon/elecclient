<template>
  <div>
    <div class="observation">
      <div class="row align-items-top">
        <div class="col-2 tender-name">
          <i class="far fa-user user-icon"></i>  Usuario
        </div>
        <div class="col-7">
          <p class="tender-name">Licitación {{tender.number}}: {{tender.name}}</p>
          <p class="description">{{observation.plain}}</p>
        </div>
        <div class="col-3 text-right">
          <button v-if="observation.hash" type="button" class="btn btn-default minor-separated">
            Descargar <i class="fas fa-arrow-down"></i>
          </button>
          <button v-if="showResponseButton" type="button" class="btn btn-primary" @click="showForm = true">
            Responder
          </button>
        </div>
      </div>
    </div>
    <div v-if="observation.resPlain" class="response-form">
      <div class="row align-items-top">
        <div class="col-2 tender-name">
          <i class="far fa-user user-icon"></i>  Alcaldía de Medellín
        </div>
        <div class="col-7">
          <p class="tender-name">Licitación {{tender.number}}: {{tender.name}}</p>
          <p class="description">{{observation.resPlain}}</p>
        </div>
        <div class="col-3 text-right">
          <button v-if="observation.resHash" type="button" class="btn btn-default minor-separated">
            Descargar <i class="fas fa-arrow-down"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="response-form" v-if="showResponseForm">
      <h4 class="loading" v-if="observationSent">Enviando transacción...</h4>
      <observation-form :type="observationFormTypes.RESPONSE" @observation="sendResponse" v-else/>
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
      observationSent: false,
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
      tender: state => state.Tender.tender,
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
      this.observationSent = true;
      this.$emit('response', { plain, hash, key: this.index });
    },
  },
};
</script>
