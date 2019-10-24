<template>
  <div>
    <div class="observation">
      <div class="row align-items-center">
        <div class="col description">
          <p>{{observation.plain}}</p>
        </div>
        <div class="col-2">
          <button v-if="observation.hash !== ''" type="button" class="btn btn-secondary minor-separated">
            Descargar
          </button>
          <button v-if="(client === 'tenderer') && (!showForm) && (!observation.resPlain)" type="button" class="btn btn-primary" @click="showResponseForm">
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
          <button v-if="observation.resHash !== ''" type="button" class="btn btn-secondary minor-separated">
            Descargar
          </button>
        </div>
      </div>
    </div>
    <div class="response-form" v-if="(showForm) && (!sentResponse) && (!observation.resPlain)">
      <observation-form :type="responseType" @observation="sendResponse"></observation-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ObservationForm from '@/components/common/ObservationForm';

export default {
  name: 'Observation',
  data() {
    return {
      responseType: 'respuesta',
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
  },
  methods: {
    sendResponse({ plain, hash }) {
      this.$emit('response', { plain, hash, key: this.index });
    },
    showResponseForm() {
      this.showForm = true;
    },
  },
};
</script>
