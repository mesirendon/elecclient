<template>
  <div class="container" id="main">
    <nav class="navbar navbar-dark bg-dark">
      <router-link class="link" :to="{name: 'home'}">Home</router-link>
    </nav>
    <h3>Nombre del proceso de licitación <span >({{address}})</span></h3>
    <br>
    <div class="container-fluid" id="description">
      <div class="row">
        <div class="col">
          <h5><strong>Descripción: </strong></h5>
          <br>
          <p>{{description}}</p>
        </div>
        <div class="col">
          <h5><strong>Términos de referencia:</strong></h5>
          <br>
          <p>Los términos de referencia explican los resquisitos que se definen para este proyecto.
            Los oferentes deben seguir las lineas requeridas.</p>
          <button type="button" class="btn btn-secondary">Descargar TDR</button>
        </div>
      </div>
    </div>
    <hr>
    <div v-if="biddingFlag">
      <h2>Se están recibiendo ofertas</h2>
    </div>
    <div v-else>
      <h2><b>NO</b> se están recibiendo ofertas</h2>
    </div>
    <button :disabled="!biddingFlag" @click="createBid" class="btn btn-secondary" type="submit">Subir oferta</button>
    <br><br>
    <div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(bid, idx) in bids" :key="idx">
          <router-link class="link" :to="{name: 'bid', params: {address: bid}}">
            Oferta: {{bid}}
          </router-link>
        </li>
      </ul>
    </div>
    <br>
    <div>
      <h3>Tus comentarios</h3>
      <br>
      <p>
        Su participación como ciudadano es clave para observar posibles errores en el proceso de
        licitación y alertar a los responsables de las presuntas irregularidades que podrían
        llegar a ocurrir.
        Con este objetivo se ponen a su disposición los mensajes directos a la entidad licitante y
        el envío de observaciones en las diferentes fases del proyecto.
      </p>
      <br>
      <div v-if="observations">
        <h3>Observaciones</h3>
        <br>
        <ul class="list-group">
          <li class="list-group-item" v-for="(obs, idx) in observations" :key="idx">
            <p>{{obs.plain}}</p>
            <p v-if="obs.hash !== ''">IPFS Hash: {{obs.hash}}</p>
            <p v-if="obs.resPlain">Respuesta: </p>
            <div class="card response" v-if="obs.resPlain">
              <p>{{obs.resPlain}}</p>
              <p>IPFS Hash: {{obs.resHash}}</p>
            </div>
          </li>
        </ul>
        <div>
          <observations :case="observation" @sent="sent = true" v-if="!sent"></observations>
        </div>
      </div>
      <br>
      <button class="btn btn-primary" @click="startAuction">Start Auction</button>
      <h3>Mensajes</h3>
      <br>
      <ul class="list-group">
        <li class="list-group-item" v-for="(msg, idx) in messages" :key="idx">
          {{msg}}
        </li>
      </ul>
      <br>
      <form @submit.prevent="sendMessage(message)">
        <div class="form-group">
          <input type="message" class="form-control" id="message" placeholder="Write your message"
                 v-model="message">
        </div>
        <button type="submit" class="btn btn-secondary">Enviar mensaje</button>
      </form>
      <br>
      <div v-if="!isBidsEmpty()" class="container">
        <div class="col">
          <h3 v-if="isWinnerSet()">Ganador <span>{{winner}}</span></h3>
        </div>
        <br><br>
        <div  v-if="isWinnerSet()">
          <h3>Observaciones sobre el ganador</h3>
          <div v-if="winnerObservations">
            <br>
            <ul class="list-group">
              <li class="list-group-item" v-for="(obs, idx) in winnerObservations" :key="idx">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import * as constants from '@/store/constants';
  import Observations from '@/components/common/Observations';

  export default {
    name: 'Tender',
    data() {
      return {
        observation: constants.TENDER_SUBMIT_OBSERVATION,
        winnerObservation: constants.TENDER_SUBMIT_WINNER_OBSERVATION,
        message: null,
        sent: false,
      };
    },
    components: {
      Observations,
    },
    props: {
      address: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState({
        description: state => state.Tender.description,
        biddingFlag: state => state.Tender.biddingFlag,
        bids: state => state.Tender.bids,
        messages: state => state.Tender.messages,
        observations: state => state.Tender.observations,
        winnerObservations: state => state.Tender.winnerObservations,
        winner: state => state.Tender.winner,
      }),
    },
    watch: {
      observations() {
        this.sent = false;
      },
    },
    methods: {
      ...mapActions({
        init: constants.TENDER_INIT,
        getDescription: constants.TENDER_GET_TENDER_DESCRIPTION,
        getBids: constants.TENDER_GET_BIDS,
        createBid: constants.TENDER_CREATE_BID,
        sendMessage: constants.TENDER_SEND_MESSAGE,
        getMessages: constants.TENDER_GET_MESSAGES,
        getObservations: constants.TENDER_GET_OBSERVATIONS,
        getWinnerObservations: constants.TENDER_GET_WINNER_OBSERVATIONS,
        getWinner: constants.TENDER_GET_WINNER,
        startAuction: constants.TENDER_START_AUCTION,
      }),
      ...mapGetters({
        isBidsEmpty: constants.TENDER_GET_IS_EMPTY_BIDS,
        isWinnerSet: constants.TENDER_GET_IS_WINNER_SET,
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
  #main {
    margin-top: 50px;
    margin-bottom: 200px;
  }
  h3 span {
    font-size:16px;
    color: darkgrey;
  }
  .loading {
    color: darkgrey;
  }
  .response {
    padding: 10px;
  }

</style>
