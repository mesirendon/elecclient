<template>
  <div v-else class="container" id="main">
    <div class="descriptor">
      <h3 class="separated">Nombre del proceso de licitación: <span>({{address}})</span></h3>
      <div class="description separated">
        <div class="row">
          <div class="col">
            <h5 class="minor-separated"><strong>Descripción:</strong></h5>
            <p>{{description}}</p>
          </div>
          <div class="col">
            <h5 class="minor-separated"><strong>Términos de referencia:</strong></h5>
            <p>Los términos de referencia explican los resquisitos que se definen para este
              proyecto.
              Los oferentes deben seguir las lineas requeridas.</p>
            <button type="button" class="btn btn-secondary">Descargar TDR</button>
          </div>
        </div>
      </div>
      <div class="separated">
        <div class="separated">
          <h5><strong>Estado de la licitación:</strong></h5>
          <div v-if="client==='vendor'" class="row">
            <div v-if="biddingPeriodStatus" class="col">
              <router-link class="btn btn-secondary" :disabled="!biddingPeriodStatus"
                           :to="{name: 'newBid', params: {tenderAddress: address}}">
                Subir oferta
              </router-link>
            </div>
            <div v-if="bid" class="col">
              <router-link class="btn btn-secondary" :disabled="!biddingPeriodStatus"
                           :to="{name: 'bid', params: {tenderAddress: address, address: bid._id}}">
                Continuar oferta
              </router-link>
            </div>
          </div>
          <div v-if="client==='tenderer'" class="row">
            <div class="col">
              <h5 v-if="biddingPeriodStatus">Recepción de ofertas para licitación</h5>
              <h5 v-else>Presentación de TDR</h5>
            </div>
            <div class="col">
              <button @click="startAuction" :disabled="biddingPeriodStatus"
                      class="btn btn-secondary">
                Empezar recepción de ofertas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="separated">Ofertas actuales</h3>
      <div class="observation" v-for="(bid, idx) in bids" :key="idx">
        <router-link class="link" :to="{name: 'bid', params: {address: bid}}">
          Oferta: {{bid}}
        </router-link>
      </div>
    </div>
    <h3 v-if="client==='vendor'" class="separated">Tus comentarios:</h3>
    <div v-if="client==='tenderer'" class="descriptor">
      <p class="separated">
        Su participación como ciudadano es clave para observar posibles errores en el proceso de
        licitación y alertar a los responsables de las presuntas irregularidades que podrían
        llegar a ocurrir.
        Con este objetivo se ponen a su disposición los mensajes directos a la entidad licitante y
        el envío de observaciones en las diferentes fases del proyecto.
      </p>
      <div class="container" v-if="sentObservation">
        <h4 class="loading">Enviando transacción...</h4>
      </div>
      <div class="separated">
        <observation-form :type="observationFormTypes.OBSERVATION" @observation="sendObservation"
                          v-if="!sentObservation"/>
      </div>
    </div>
    <h3 class="separated">Observaciones</h3>
    <div class="separated" v-if="observations">
      <observation @response="respondObservation" v-for="(observation, idx) in observations"
                   :observation="observation"
                   :index="idx" :key="idx"/>
    </div>
    <h3 class="separated">Mensajes:</h3>
    <div>
      <div class="observation" v-for="(msg, idx) in messages" :index="idx" :key="idx">
        {{msg}}
      </div>
    </div>
    <h4 class="loading minor-separated" v-if="sentMessage"> Enviando transacción...</h4>
    <form class="separated" @submit.prevent="sendMessage(message)">
      <div class="form-group">
        <input type="message" class="form-control" id="message" placeholder="Escribe tu mensaje"
               v-model="message">
      </div>
      <button type="submit" class="btn btn-secondary">Enviar mensaje</button>
    </form>
    <div v-if="winner" class="separated">
      <h3>Oferente ganador <span>{{winner}}</span></h3>
      <div>
        <h3 class="separated">Observaciones sobre el ganador</h3>
        <div class="separated" v-if="winnerObservations">
          <observation @response="respondWinnerObservation"
                       v-for="(observation, idx) in winnerObservations" :observation="observation"
                       :index="idx" :key="idx"/>
        </div>
        <div class="container" v-if="sentWinnerObservation">
          <h4 class="loading">Enviando transacción...</h4>
        </div>
        <div class="separated">
          <observation-form :type="observationFormTypes.OBSERVATION"
                            @observation="sendWinnerObservation"
                            v-if="!sentWinnerObservation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Observation from '@/components/common/Observation';
import ObservationForm from '@/components/common/ObservationForm';
import Tender from '@/handlers/tender';
import * as constants from '@/store/constants';
import BidForm from '@/components/bid/BidForm';

export default {
  name: 'Detail',
  data() {
    return {
      observationFormTypes: constants.OBSERVATION_FORM_TYPES,
      tender: null,
      bids: [],
      observations: [],
      messages: [],
      winnerObservations: [],
      winner: null,
      description: null,
      biddingPeriodStatus: false,
      observation: 'null',
      message: null,
      sentObservation: false,
      sentWinnerObservation: false,
      sentMessage: false,
    };
  },
  components: {
    Observation,
    ObservationForm,
    BidForm,
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
      draftBids: state => state.Bid.bids,
      bid: state => state.Bid.bid,
    }),
  },
  watch: {
    observations() {
      this.sentObservation = false;
    },
    winnerObservations() {
      this.sentWinnerObservation = false;
    },
    messages() {
      this.sentMessage = false;
      this.message = null;
    },
  },
  methods: {
    ...mapActions({
      loadDraftBids: constants.BID_LOAD_DRAFTS,
      setBid: constants.BID_SET_BID,
    }),
    getBids() {
      this.tender.bids.then((bids) => {
        this.bids = bids;
      });
    },
    startAuction() {
      this.tender.startAuction(
        this.account,
        this.privateKey,
      );
      this.biddingPeriodStatus = this.tender.biddingPeriodStatus;
    },
    sendObservation(observation) {
      this.sentObservation = true;
      this.tender.sendObservation(
        this.account,
        this.privateKey,
        observation,
      )
        .then(() => this.getObservations());
    },
    getObservations() {
      this.tender.observations.then((observations) => {
        this.observations = observations;
      });
    },
    respondObservation(response) {
      this.tender.respondObservation(
        this.account,
        this.privateKey,
        response,
      )
        .then(() => this.getObservations());
    },
    sendWinnerObservation(observation) {
      this.sentWinnerObservation = true;
      this.tender.sendWinnerObservation(
        this.account,
        this.privateKey,
        observation,
      )
        .then(() => this.getWinnerObservations());
    },
    getWinnerObservations() {
      this.tender.winnerObservations.then((winnerObservations) => {
        this.winnerObservations = winnerObservations;
      });
    },
    respondWinnerObservation(response) {
      this.tender.respondWinnerObservation(
        this.account,
        this.privateKey,
        response,
      )
        .then(() => this.getWinnerObservations());
    },
    sendMessage(message) {
      this.sentMessage = true;
      this.tender.sendMessage(
        this.account,
        this.privateKey,
        message,
      )
        .then(() => this.getMessages());
    },
    getMessages() {
      this.tender.messages.then((messages) => {
        this.messages = messages;
      });
    },
  },
  created() {
    const tender = new Tender(this.address);
    tender.description.then((description) => {
      this.description = description;
    });
    tender.biddingPeriodStatus.then((state) => {
      this.biddingPeriodStatus = state;
    });
    tender.winner.then((winner) => {
      this.winner = winner;
    });
    this.tender = tender;
    this.getObservations();
    this.getWinnerObservations();
    this.getMessages();
    this.getBids();
    this.loadDraftBids(this.address);
  },
};
</script>
