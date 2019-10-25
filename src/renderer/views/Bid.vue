<template>
  <div class="container">
    <div>
      <h3>Nombre de la oferta</h3>
      <h3><span>Dirección de la oferta: {{address}}</span></h3>
    </div>
    <div>
      <h3><strong>Evaluación: </strong></h3>
      <div>
        <p><strong>Criterios habilitantes: </strong>Pendiente</p>
        <p><strong>La calificación de esta oferta es: </strong>{{score}}</p>
      </div>
    </div>
    <div>
      <h3><strong>Comentarios:</strong></h3>
      <p>
        Su participación como ciudadano es clave para observar posibles errores en el proceso de
        licitación y alertar a los responsables de las presuntas irregularidades que podrían
        llegar a ocurrir.
        Con este objetivo se pone a su disposición el envío de observaciones relacionadas a esta
        oferta.
      </p>
      <h3 class="separated">Observaciones</h3>
      <div class="separated" v-if="observations">
        <observation @response="respondObservation" v-for="(observation, idx) in observations"
                     :observation="observation"
                     :index="idx" :key="idx"/>
      </div>
      <div class="container" v-if="sentObservation">
        <h4 class="loading">Enviando transacción...</h4>
      </div>
      <div class="separated">
        <observation-form :type="observationType" @observation="sendObservation"
                          v-if="!sentObservation"/>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Observation from '@/components/common/Observation';
import ObservationForm from '@/components/common/ObservationForm';
import Bid from '@/handlers/bid';

export default {
  name: 'Bid',
  data() {
    return {
      observationType: 'observación',
      bid: null,
      score: null,
      observations: [],
      sentObservation: false,
    };
  },
  components: {
    Observation,
    ObservationForm,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      account: state => state.Session.account,
      client: state => state.Session.client,
      privateKey: state => state.Session.privateKey,
    }),
  },
  watch: {
    observations() {
      this.sentObservation = false;
    },
  },
  methods: {
    sendObservation(observation) {
      this.sentObservation = true;
      this.bid.sendObservation(
        this.account,
        this.privateKey,
        observation,
      )
        .then(() => this.getObservations());
    },
    getObservations() {
      this.bid.observations.then((observations) => {
        this.observations = observations;
      });
    },
    respondObservation(response) {
      this.bid.respondObservation(
        this.account,
        this.privateKey,
        response,
      )
        .then(() => this.getObservations());
    },
  },
  created() {
    const bid = new Bid(this.address);
    bid.score.then((score) => {
      this.score = score;
    });
    this.bid = bid;
    this.getObservations();
  },
};
</script>

<style lang="scss" scoped>
  h3 span {
    font-size: 16px;
    color: darkgrey;
  }

  .link {
    color: darkgray;
  }
</style>
