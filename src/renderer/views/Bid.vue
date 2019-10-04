<template>
  <div class="container" id="main">
    <nav class="navbar navbar-dark bg-dark">
      <router-link class="nav-item link" :to="{name: 'home'}">Home</router-link>
    </nav>
    <h3>Nombre del oferente</h3>
    <h3><span>Dirección de la oferta: {{address}}</span></h3>
    <br>
    <hr>
    <br>
    <h4>La calificación de esta oferta es: {{score}}</h4>
    <br>
    <div>
      <h3>Tus comentarios</h3>
      <br>
      <p>
        Su participación como ciudadano es clave para observar posibles errores en el proceso de
        licitación y alertar a los responsables de las presuntas irregularidades que podrían
        llegar a ocurrir.
        Con este objetivo se pone a su disposición el envío de observaciones relacionadas a esta
        oferta.
      </p>
      <br>
      <div v-if="observations">
        <h3>Observaciones</h3>
        <br>
        <ul class="list-group">
          <li class="list-group-item" v-for="(obs, idx) in observations" :key="idx">
            <p>{{obs.plain}}</p>
            <br>
            <p v-if="obs.hash !== ''">IPFS Hash: {{obs.hash}}</p>
            <p v-if="obs.resPlain">Respuesta: </p>
            <div class="card response" v-if="obs.resPlain">
              <p>{{obs.resPlain}}</p>
              <p>IPFS Hash: {{obs.resHash}}</p>
            </div>
          </li>
        </ul>
      </div>
      <br>
    </div>
    <br>
    <div v-if="scoreObservations">
      <h3>Observaciones de la evaluación</h3>
      <br>
      <ul class="list-group">
        <li class="list-group-item" v-for="(obs, idx) in scoreObservations" :key="idx">
          <p>{{obs.plain}}</p>
          <br>
          <p v-if="obs.hash !== ''">IPFS Hash: {{obs.hash}}</p>
          <p v-if="obs.resPlain">Respuesta: </p>
          <div class="card response" v-if="obs.resPlain">
            <p>{{obs.resPlain}}</p>
            <p>IPFS Hash: {{obs.resHash}}</p>
          </div>
        </li>
      </ul>
    </div>
    <br>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Bid',
  data() {
    return {
      observationsLength: null,
      scoreObservationsLength: null,
    };
  },
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      observations: state => state.Bid.observations,
      scoreObservations: state => state.Bid.scoreObservations,
      score: state => state.Bid.score,
    }),
  },
  methods: {
    ...mapActions({
      init: constants.BID_INIT,
      getObservations: constants.BID_GET_OBSERVATIONS,
      getScoreObservations: constants.BID_GET_SCORE_OBSERVATIONS,
    }),
  },
  created() {
    this.init(this.address);
  },
};
</script>

<style lang="scss" scoped>
  .link{
    color: darkgray;
  }
</style>
