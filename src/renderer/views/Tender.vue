<template>
  <div class="container" id="main">
    <h3 class="separated">Nombre del proceso de licitación: <span >({{address}})</span></h3>
    <div class="description separated border-bottom">
      <div class="row">
        <div class="col">
          <h5 class="minor-separated"><strong>Descripción:</strong></h5>
          <p>{{description}}</p>
        </div>
        <div class="col">
          <h5 class="minor-separated"><strong>Términos de referencia:</strong></h5>
          <p>Los términos de referencia explican los resquisitos que se definen para este proyecto.
            Los oferentes deben seguir las lineas requeridas.</p>
          <button type="button" class="btn btn-secondary">Descargar TDR</button>
        </div>
      </div>
    </div>
    <div class="separated border-bottom">
      <div class="separated border-bottom">
        <h5><strong>Estado de la licitación:</strong></h5>
        <div v-if="client==='vendor'" class="row">
          <div v-if="biddingPeriodStatus" class="col">
            <button :disabled="!biddingPeriodStatus" @click="createBid" class="btn btn-secondary"
                    type="submit">
              Subir oferta
            </button>
          </div>
        </div>
        <div v-if="client==='tenderer'" class="row">
          <div class="col">
            <h5 v-if="biddingPeriodStatus">Recepción de ofertas para licitación</h5>
            <h5 v-else>Presentación de TDR</h5>
          </div>
          <div class="col">
            <button @click="startAuction" :disabled="biddingPeriodStatus" class="btn btn-secondary">
              Empezar recepción de ofertas
            </button>
          </div>
        </div>
      </div>
      <div>
      <h3 class="separated">Ofertas actuales</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="(bid, idx) in bids" :key="idx">
          <router-link class="link" :to="{name: 'bid', params: {address: bid}}">
            Oferta: {{bid}}
          </router-link>
        </li>
      </ul>
      </div>
    </div>
    <h3 class="separated">Tus comentarios:</h3>
    <p class="separated">
      Su participación como ciudadano es clave para observar posibles errores en el proceso de
      licitación y alertar a los responsables de las presuntas irregularidades que podrían
      llegar a ocurrir.
      Con este objetivo se ponen a su disposición los mensajes directos a la entidad licitante y
      el envío de observaciones en las diferentes fases del proyecto.
    </p>
    <h3 class="separated">Observaciones</h3>
    <div class="separated" v-if="observations">
      <observation v-for="(observation, idx) in observations" :observation="observation"
                   :key="idx"/>
    </div>
    <div class="separated">
      <observation-form @observation="sendObservation" v-if="!sentObservation"/>
    </div>
    <h3 class="separated">Mensajes:</h3>
    <div>
      <ul class="list-group vertical-space">
        <li class="list-group-item" v-for="(msg, idx) in messages" :key="idx">
          {{msg}}
        </li>
      </ul>
    </div>
    <form @submit.prevent="sendMessage(message)">
      <div class="form-group">
        <input type="message" class="form-control" id="message" placeholder="Escribe tu mensaje"
               v-model="message">
      </div>
      <button type="submit" class="btn btn-secondary">Enviar mensaje</button>
    </form>
    <div v-if="!bids.length" class="container">
      <div class="col">
        <h3 v-if="winner">Ganador <span>{{winner}}</span></h3>
      </div>
      <div v-if="winner">
        <h3>Observaciones sobre el ganador</h3>
        <div v-if="winnerObservations">
          <ul class="list-group">
            <li class="list-group-item" v-for="(obs, idx) in winnerObservations" :key="idx">
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
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Observation from '@/components/common/Observation';
  import ObservationForm from '@/components/common/ObservationForm';
  import Tender from '@/handlers/tender';

  export default {
    name: 'Tender',
    data() {
      return {
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
        sentMessage: false,
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
      messages() {
        this.sentMessage = false;
        this.message = null;
      },
    },
    methods: {
      createBid() {
        this.tender.createBid();
      },
      startAuction() {
        this.tender.startAuction(
          this.account,
          this.privateKey,
        );
        this.biddingPeriodStatus = this.tender.biddingPeriodStatus;
      },
      sendObservation(observation) {
        this.tender.sendObservation(
          this.account,
          this.privateKey,
          observation,
        )
          .then(() => this.getObservations());
      },
      getObservations() {
        this.sentObservation = true;
        this.tender.observations.then((observations) => {
          this.observations = observations;
        });
      },
      sendMessage(message) {
        this.tender.sendMessage(
          this.account,
          this.privateKey,
          message,
        )
          .then(() => this.getMessages());
      },
      getMessages() {
        this.sentMessage = true;
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
      tender.bids.then((bids) => {
        this.bids = bids;
      });
      tender.winner.then((winner) => {
        this.winner = winner;
      });
      tender.messages.then((messages) => {
        this.messages = messages;
      });
      tender.winnerObservations.then((winnerObservations) => {
        this.winnerObservations = winnerObservations;
      });
      this.tender = tender;
      this.getObservations();
    },
  };
</script>
