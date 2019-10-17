<template>
  <div class="container">
    <h3>Nombre del proceso de licitación <span >({{address}})</span></h3>
    <br>
    <div class="description">
      <div class="row">
        <div class="col">
          <h2><strong>Descripción:</strong></h2>
          <p>{{description}}</p>
        </div>
        <div class="col">
          <h2><strong>Términos de referencia:</strong></h2>
          <p>Los términos de referencia explican los resquisitos que se definen para este proyecto.
            Los oferentes deben seguir las lineas requeridas.</p>
          <button type="button" class="btn btn-secondary">Descargar TDR</button>
        </div>
      </div>
    </div>
    <div v-if="client==='vendor'">
      <div v-if="biddingPeriodStatus">
        <button :disabled="!biddingPeriodStatus" @click="createBid" class="btn btn-secondary"
                type="submit">
          Subir oferta
        </button>
      </div>
    </div>
    <h5><strong>Estado de la licitación:</strong></h5>
    <div v-if="client==='tenderer'">
      <div class="container-fluid">
        <div class="row">
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
    </div>
    <div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(bid, idx) in bids" :key="idx">
          <router-link class="link" :to="{name: 'bid', params: {address: bid}}">
            Oferta: {{bid}}
          </router-link>
        </li>
      </ul>
    </div>
    <div>
      <h2>Comentarios</h2>
      <p>
        Su participación como ciudadano es clave para observar posibles errores en el proceso de
        licitación y alertar a los responsables de las presuntas irregularidades que podrían
        llegar a ocurrir.
        Con este objetivo se ponen a su disposición los mensajes directos a la entidad licitante y
        el envío de observaciones en las diferentes fases del proyecto.
      </p>
      <div v-if="observations">
        <observation v-for="(observation, idx) in observations" :observation="observation"
                     :key="idx"/>
      </div>
      <div>
        <observation-form @observation="sendObservation" v-if="!sent"/>
      </div>
      <h2>Mensajes</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="(msg, idx) in messages" :key="idx">
          {{msg}}
        </li>
      </ul>
      <form @submit.prevent="sendMessage(message)">
        <div class="form-group">
          <input type="message" class="form-control" id="message" placeholder="Write your message"
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
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import * as constants from '@/store/constants';
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
        sent: false,
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
        this.sent = false;
      },
    },
    methods: {
      ...mapActions({
        init: constants.TENDER_INIT,
      }),
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
        this.sent = true;
        this.tender.observations.then((observations) => {
          this.observations = observations;
        });
      },
    },
    created() {
      this.init(this.address);
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

<style lang="scss" scoped>
  .link {
    color: darkgray;
  }

  #main {
    margin-top: 50px;
    margin-bottom: 200px;
  }

  h3 span {
    font-size: 16px;
    color: darkgrey;
  }

  .loading {
    color: darkgrey;
  }

  .response {
    padding: 10px;
  }

</style>
