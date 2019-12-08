<template>
  <div v-else class="container" id="main">
    <h1>{{tenderState.name}}:</h1>
    <h2><a class="active" :href="`https://ropsten.etherscan.io/address/${address}`" target="_blank">{{address}}</a>
    </h2>
    <div class="descriptor">
      <div class="description separated">
        <div class="row">
          <div class="col">
            <h5 class="minor-separated"><strong>Descripción:</strong></h5>
            <p>{{description}}</p>
          </div>
        </div>
      </div>
      <div class="separated">
        <div class="separated">
          <div class="row">
            <div class="col">
              <h5><strong>Estado de la licitación:</strong></h5>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <ul>
                <li class="inactive" :class="{active: active(date)}"
                    v-for="(date, dateIdx) in tenderState.schedule" :key="`dateIdx-${dateIdx}`"
                    v-if="(dateIdx !== 'bidMaintenanceTerm') && (dateIdx !== 'bidMaintenanceTermType')">
                  {{date | date}} - {{dateIdx | scheduleNames}}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="client==='vendor'" class="row">
            <div v-if="!bid && submittable" class="col">
              <router-link class="btn btn-secondary"
                           :to="{name: 'newBid', params: {tenderAddress: address}}">
                Subir oferta
              </router-link>
            </div>
            <div v-if="bid && submittable" class="col">
              <router-link class="btn btn-secondary" :disabled="!biddingPeriodStatus"
                           :to="{name: 'bid', params: {tenderAddress: address, address: bid._id}}">
                Continuar oferta
              </router-link>
            </div>
          </div>
          <div v-if="client==='tenderer'">
            <button class="btn btn-secondary" @click="getBids">Apertura de ofertas</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Ofertas actuales</h2>
    <div class="observation" v-for="(bid, bidIdx) in tenderState.bids" :key="`bidIdx-${bidIdx}`">
      <button class="btn btn-link" type="button" @click="loadBid(bidIdx)">
        Oferta: {{bid.address}}
      </button>
    </div>
    <h3 v-if="client==='vendor'" class="separated">Tus comentarios:</h3>
    <div v-if="client==='vendor'" class="descriptor">
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
import { mapActions, mapMutations, mapState } from 'vuex';
import moment from 'moment';
import * as constants from '@/store/constants';
import Tender from '@/handlers/tender';
import Bid from '@/handlers/bid';
import ipfs from '@/handlers/ipfs';
import Observation from '@/components/common/Observation';
import ObservationForm from '@/components/common/ObservationForm';
import BidForm from '@/components/bid/BidForm';
import cipher from '@/helpers/cipher';

export default {
  name: 'Detail',
  data() {
    return {
      observationFormTypes: constants.OBSERVATION_FORM_TYPES,
      tender: null,
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
      bid: state => state.Bid.bid,
      tenderState: state => state.Tender.tender,
    }),
    submittable() {
      return parseInt(moment()
        .format('X'), 10) >= this.tenderState.schedule.bidsOpening;
    },
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
      setTender: constants.TENDER_SET_TENDER,
      setBid: constants.BID_SET_BID,
    }),
    ...mapMutations({
      setScheduleDate: constants.TENDER_SET_SCHEDULE_DATE,
      setTenderProperty: constants.TENDER_SET_TENDER_PROPERTY,
      setBidsProperty: constants.TENDER_SET_BIDS_PROPERTY,
      addBid: constants.TENDER_ADD_BID,
    }),
    active(val) {
      return val >= parseInt(moment()
        .format('X'), 10);
    },
    loadBid(bidIdx) {
      this.setBid(this.tenderState.bids[bidIdx]);
      this.$router.push({
        name: 'bid',
        params: { address: this.tenderState.bids[bidIdx].address },
      });
    },
    async getBids() {
      await this.tender.bids.then((bidsAddresses) => {
        bidsAddresses.forEach(bidAddress => this.addBid({
          address: bidAddress,
          data: null,
        }));
        this.tenderState.bids.forEach((bidObject, idx) => {
          const bid = new Bid(bidObject.address);
          bid.getCipherBid()
            .then(bidHash => ipfs.get(bidHash))
            .then(encriptedBid => cipher.decrypt(this.privateKey, encriptedBid))
            .then((strBid) => {
              const bid = JSON.parse(strBid);
              this.setBidsProperty({
                idx,
                property: 'data',
                data: bid,
              });
            });
        });
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
    const tender = new Tender(this.address, JSON.stringify(this.account)
      .replace('"', '')
      .replace('"', ''));
    tender.schedule.then((data) => {
      const { schedule, ...rest } = this.tenderState;
      this.setTender({ schedule: data, ...rest });
    });
    tender.description.then((description) => {
      this.description = description;
    });
    tender.biddingPeriodStatus.then((state) => {
      this.biddingPeriodStatus = state;
    });
    tender.winner.then((winner) => {
      this.winner = winner;
    });
    tender.tenderer.then((data) => {
      const { tenderer, ...rest } = this.tenderState;
      this.setTender({ tenderer: data, ...rest });
    });
    tender.name.then((data) => {
      const { name, ...rest } = this.tenderState;
      this.setTender({ name: data, ...rest });
    });
    tender.number.then((data) => {
      const { number, ...rest } = this.tenderState;
      this.setTender({ number: data, ...rest });
    });
    tender.basePrice.then((data) => {
      const { basePrice, ...rest } = this.tenderState;
      this.setTender({ basePrice: data, ...rest });
    });
    tender.bidMaintenanceTerm.then((data) => {
      this.setScheduleDate({
        property: 'bidMaintenanceTerm',
        value: data,
      });
    });
    tender.bidMaintenanceTermType.then((data) => {
      this.setScheduleDate({
        property: 'bidMaintenanceTermType',
        value: data,
      });
    });
    tender.questionnaire.then((questionnaireHash) => {
      ipfs.get(questionnaireHash)
        .then((questionnaireObject) => {
          const { questionnaire, ...rest } = this.tenderState;
          this.setTender({ questionnaire: questionnaireObject, ...rest });
        });
    });
    tender.lots.then((lotsHash) => {
      ipfs.get(lotsHash)
        .then((lotsObject) => {
          const { lots, ...rest } = this.tenderState;
          this.setTender({ lots: lotsObject, ...rest });
        });
    });
    tender.publicKey.then((data) => {
      const { publicKey, ...rest } = this.tenderState;
      this.setTender({ publicKey: data, ...rest });
    });
    this.tender = tender;
    this.getObservations();
    this.getWinnerObservations();
    this.getMessages();
    this.loadDraftBids(this.address);
  },
};
</script>
