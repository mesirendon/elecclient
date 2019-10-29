<template>
  <div>
    <h3>Informacion general</h3>
    <div class="descriptor">
      <div class="row">
        <div class="col-2">
          <h4>Tipo de proceso: </h4>
        </div>
        <div class="col">
          <p>Licitacion publica</p>
        </div>
      </div>
      <question text="Número de proceso" :type="dataTypes.TEXT" :answer="tender.number"
                @change="saveNumber"/>
      <question text="Nombre de proceso" :type="dataTypes.TEXT" :answer="tender.name"
                @change="saveName"/>
      <question text="Descripcion" :type="dataTypes.TEXT_AREA" :answer="tender.description"
                @change="saveDescription"/>
      <question text="Relacionar con otro proceso" :type="dataTypes.BOOLEAN" :answer="tender.relatedToProcess"
                @change="saveRelated"/>
      <question text="Unidad de contratacion" :answer="tender.office" :type="dataTypes.DROPDOWN"
                :list="contractUnitList" @change="saveOffice"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <question class="descriptor" :answer="tender.unspsc" text="Codigo UNSPSC" :type="dataTypes.LIST"
              :list="unspsc" @change="saveUnspsc"/>
    <h3>Plan anual de adquisiciones</h3>
    <question class="descriptor" text="Es una adquisicion del PAA?" :type="dataTypes.BOOLEAN"
              :answer="tender.paa" @change="savePaa"/>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" :type="dataTypes.DROPDOWN" :list="contractType" :answer="tender.contractType"
                @change="saveType"/>
      <question text="Duracion del contrato" :type="dataTypes.TEXT_AND_DROPDOWN" :list="duration"
                :answer="tender.bidValidTerm" :secondAnswer="tender.bidValidTermUnit" @change="saveTerm"
                @secondChange="saveTermUnit"/>
    </div>
    <h3>Direccion de notificaciones</h3>
    <question class="descriptor" text="Utilizar la misma direccion de la unidad de contratacion" :type="dataTypes.CHECKBOX" :answer="tender.notifications"
              @change="saveNotifications"/>
    <h3>Acuerdos comerciales</h3>
    <question class="descriptor" text="Acuerdos comerciales" :type="dataTypes.BOOLEAN" :answer="tender.comercialAgreements"
              @change="saveAgreements"/>
    <h3>Documentos internos</h3>
    <question class="descriptor" text="Documentos internos" :type="dataTypes.FILE" :answer="tender.insideDocuments"
              @change="saveDocuments"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import contractUnitList from '@/helpers/contractUnit';
import unspsc from '@/helpers/unspsc';
import duration from '@/helpers/duration';
import contractType from '@/helpers/contractType';
import * as constants from '@/store/constants';
import Question from '@/components/tender/form/Question';

export default {
  name: 'GeneralInfo',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      contractUnitList,
      unspsc,
      duration,
      contractType,
    };
  },
  components: {
    Question,
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
  },
  methods: {
    ...mapActions({
      setTender: constants.TENDER_SET_TENDER,
    }),
    saveNumber(numberProcess) {
      const { number, ...rest } = this.tender;
      this.setTender({ number: numberProcess, ...rest });
    },
    saveName(nameProcess) {
      const { name, ...rest } = this.tender;
      this.setTender({ name: nameProcess, ...rest });
    },
    saveDescription(descriptionProcess) {
      const { description, ...rest } = this.tender;
      this.setTender({ description: descriptionProcess, ...rest });
    },
    saveRelated(related) {
      const { relatedToProcess, ...rest } = this.tender;
      this.setTender({ relatedToProcess: related, ...rest });
    },
    saveOffice(officeSelection) {
      const { office, ...rest } = this.tender;
      this.setTender({ office: officeSelection, ...rest });
    },
    saveUnspsc(unspscCode) {
      const { unspsc, ...rest } = this.tender;
      this.setTender({ unspsc: unspscCode, ...rest });
    },
    savePaa(belongsToPaa) {
      const { paa, ...rest } = this.tender;
      this.setTender({ paa: belongsToPaa, ...rest });
    },
    saveTerm(term) {
      const { bidValidTerm, ...rest } = this.tender;
      this.setTender({ bidValidTerm: term, ...rest });
    },
    saveTermUnit(termUnit) {
      const { bidValidTermUnit, ...rest } = this.tender;
      this.setTender({ bidValidTermUnit: termUnit, ...rest });
    },
    saveType(type) {
      const { contractType, ...rest } = this.tender;
      this.setTender({ contractType: type, ...rest });
    },
    saveNotifications(notif) {
      const { notifications, ...rest } = this.tender;
      this.setTender({ notifications: notif, ...rest });
    },
    saveAgreements(agreements) {
      const { comercialAgreements, ...rest } = this.tender;
      this.setTender({ comercialAgreements: agreements, ...rest });
    },
    saveDocuments(docs) {
      const { insideDocuments, ...rest } = this.tender;
      this.setTender({ insideDocuments: docs, ...rest });
    },
  },
};
</script>
