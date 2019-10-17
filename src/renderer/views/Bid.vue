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
      <div v-if="observations">
        <h4><strong>Observaciones:</strong></h4>
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
    <div v-if="scoreObservations">
      <h4><strong>Observaciones de la evaluación:</strong></h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="(obs, idx) in scoreObservations" :key="idx">
          <p>{{obs.plain}}</p>
          <p v-if="obs.hash !== ''">IPFS Hash: {{obs.hash}}</p>
          <p v-if="obs.resPlain">Respuesta: </p>
          <div class="card response" v-if="obs.resPlain">
            <p>{{obs.resPlain}}</p>
            <p>IPFS Hash: {{obs.resHash}}</p>
          </div>
        </li>
      </ul>
    </div>
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
  h3 span {
    font-size: 16px;
    color: darkgrey;
  }

  .link{
    color: darkgray;
  }
</style>
