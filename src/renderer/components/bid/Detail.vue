<template>
  <div>
    <h1>
      <a :href="`https://ropsten.etherscan.io/address/${address}`" target="_blank" class="active">
        {{address}}
      </a>
    </h1>
    <h2>Respuestas a cuestionario</h2>
    <div class="descriptor" v-for="(section, sectionIdx) in bid.data.sections"
         :key="`sectionIdx-${sectionIdx}`">
      <h2>{{section.name}}</h2>
      <h3 v-if="section.lot !== null">Sección asociada al lote {{section.lot | idx}}</h3>
      <div class="row" v-for="(question, questionIdx) in section.questions"
           :key="`questionIdx-${questionIdx}`">
        <div class="col">{{question.name}}</div>
        <div class="col">{{question.answer}}</div>
      </div>
    </div>
    <h2>Lotes</h2>
    <div class="descriptor" v-for="(lot, lotIdx) in bid.data.lots" :key="`lotIdx-${lotIdx}`">
      <h3>{{lot.name}}</h3>
      <div class="row">
        <div class="col">
          Precio base: ${{lot.basePrice | price}}
        </div>
        <div class="col">
          Lista de precios: {{lot.priceList.title}}
        </div>
      </div>
      <h4>Items</h4>
      <div class="row descriptor" v-for="(item, itemIdx) in lot.priceList.items"
           :key="`itemIdx-${lotIdx}-${itemIdx}`">
        <div class="col">
          Descripción: {{item.itemDescription}}
        </div>
        <div class="col">
          Cantidad: {{item.itemAmount}}
        </div>
        <div class="col">
          Unidad: {{item.itemUnit}}
        </div>
        <div class="col">
          Precio estimado: {{item.itemEstimatedUnitPrice}}
        </div>
        <div class="col">
          Respuesta: {{item.answer}}
        </div>
      </div>
    </div>
    <div class="descriptor">
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
                     :observation="observation" :index="idx" :key="idx"/>
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
import { log } from 'electron-log';

export default {
  name: 'Detail',
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      observationType: 'observación',
      observations: [],
      sentObservation: false,
      enabled: true,
    };
  },
  computed: {
    ...mapState({
      bid: state => state.Bid.bid,
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
    evaluateEnablingCriteria() {
      this.bid.data.sections.forEach((section) => {
        if (section.lot === null) {
          section.questions.forEach((question) => {
            if (question.mandatory && question.answer === '') {
              this.enabled = false;
            }
          });
        }
      });
      this.bid.data.lots.forEach((lot, lIdx) => {
        if (lot.answered) {
          this.bid.data.sections.forEach((section) => {
            if (section.lot === lIdx) {
              section.questions.forEach((question) => {
                log(question.answer);
                if (question.mandatory && question.answer === '') {
                  this.enabled = false;
                }
              });
            }
          });
        }
      });
    },
  },
  components: {
    Observation,
    ObservationForm,
  },
  created() {
    this.evaluateEnablingCriteria();
  },
};
</script>
