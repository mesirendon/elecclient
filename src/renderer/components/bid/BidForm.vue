<template>
  <div id="main">
    {{bid}}
    <p class="font-weight-bold">TENDER {{tender.number}}: {{tender.name}}</p>
    <div class="descriptor">
      <div class="row">
        <div class="col">
          <h5 class="title text-center">Contratante</h5>
        </div>
        <div class="col">
          <h5 class="title text-center">Precio del contrato</h5>
        </div>
        <div class="col">
          <h5 class="title text-center">Duracion del contrato</h5>
        </div>
        <div class="col">
          <h5 class="title text-center">Tipo del proceso</h5>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5 class="subtitle text-center">Alcaldia de Medallo</h5>
        </div>
        <div class="col">
          <h5 class="subtitle text-center">$9.99</h5>
        </div>
        <div class="col">
          <h5 class="subtitle text-center">{{tender.schedule.duration}}
            {{tender.schedule.durationType}}</h5>
        </div>
        <div class="col">
          <h5 class="subtitle text-center">Licitación Pública</h5>
        </div>
      </div>
    </div>
    <p class="font-weight-bold">Lista de criterios requeridos</p>
    <div class="descriptor">
      <div class="row">
        <div class="col-6">
          <p>Toda la información subida a la plataforma es confidencial, solo la procuraduría
            general tendrá acceso a estos
            documentos . Posteriormente, estos documentos serán públicos para comentarios de
            ciudadanos y vendors una vez
            se realice la apertura de sobres oficial.</p>
        </div>
      </div>
      <div v-for="(section, sidx) in tender.questionnaire">
        <p class="font-weight-bold">{{section.name}}</p>
        <question v-for="(question, qidx) in section.questions" :key="`s${sidx}-q${qidx}`"
                  :text="question.text" :type="question.type"
                  :required="question.mandatory" @change="saveData" :answer="tender[question.text]"/>
      </div>
    </div>
    <div class="row">
      <div class="col-2 offset-4">
        <button class="btn btn-primary" @click="saveBidDraft">Guardar proceso</button>
      </div>
      <div class="col-2">
        <button class="btn btn-primary">Finalizar Oferta</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Question from '@/components/common/form/Question';
import * as constants from '@/store/constants';
import { log } from 'electron-log';

export default {
  name: 'BidForm',
  props: {
    id: {
      type: String,
      required: false,
    },
    tenderAddress: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
    };
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      bid: state => state.Bid.bid,
    }),
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions({
      createBid: constants.BID_SAVE_DRAFT,
      saveBid: constants.BID_UPDATE_DRAFT,
      setBid: constants.BID_SET_BID,
    }),
    saveBidDraft() {
      this.saveBid(this.bid);
    },
    saveData({ data, param }) {
      log(`data: ${data}, param: ${param}`);
      const { ...rest } = this.bid;
      this.setBid({
        ...rest,
        [param]: data,
      });
    },
  },
  created() {
    if (!this.id) {
      this.createBid(this.tenderAddress);
    }
  },
};
</script>
