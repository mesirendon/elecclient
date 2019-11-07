<template>
  <div id="main">
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
          <h5 class="subtitle text-center">{{tender.schedule.duration}} {{tender.schedule.durationType}}</h5>
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
          <p>Toda la información subida a la plataforma es confidencial, solo la procuraduría general tendrá acceso a estos
            documentos . Posteriormente, estos documentos serán públicos para comentarios de ciudadanos y vendors una vez
            se realice la apertura de sobres oficial.</p>
        </div>
      </div>
      <div v-for="section in tender.questionnaire">
        <p class="font-weight-bold">{{section.name}}</p>
          <question v-for="question in section.questions" :text="question.text" :type="question.type"
                    :required="question.mandatory"/>
      </div>
    </div>
    <div class="row">
      <div class="col-2 offset-4">
        <button class="btn btn-primary">Guardar proceso</button>
      </div>
      <div class="col-2">
        <button class="btn btn-primary">Finalizar Oferta</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Question from '@/components/tender/form/Question';
import * as constants from '@/store/constants';

export default {
  name: 'BidForm',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
    };
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions({}),
  },
};
</script>
