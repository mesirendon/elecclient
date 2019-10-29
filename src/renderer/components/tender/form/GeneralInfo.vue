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
      <question text="Nombre de proceso" :type="dataTypes.TEXT"/>
      <question text="Descripcion" :type="dataTypes.TEXT_AREA" :answer="tender.description"
                @change="saveDescription"/>
      <question text="Relacionar con otro proceso" :type="dataTypes.BOOLEAN"/>
      <question text="Unidad de contratacion" :answer="tender.office" :type="dataTypes.DROPDOWN"
                :list="contractUnitList" @change="saveOffice"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <question class="descriptor" :answer="tender.unspsc" text="Codigo UNSPSC" :type="dataTypes.LIST"
              :list="unspsc" @change="saveUnspsc"/>
    <h3>Plan anual de adquisiciones</h3>
    <question class="descriptor" text="Es una adquisicion del PAA?" :type="dataTypes.BOOLEAN"/>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" :type="dataTypes.DROPDOWN"/>
      <question text="Duracion del contrato" :type="dataTypes.TEXT"/>
    </div>
    <h3>Acuerdos comerciales</h3>
    <question class="descriptor" text="Acuerdos comerciales" :type="dataTypes.BOOLEAN"/>
    <h3>Documentos internos</h3>
    <question class="descriptor" text="Documentos internos" :type="dataTypes.FILE"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import contractUnitList from '@/helpers/contractUnit';
import unspsc from '@/helpers/unspsc';
import * as constants from '@/store/constants';

import Question from '@/components/tender/form/Question';

export default {
  name: 'GeneralInfo',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      contractUnitList,
      unspsc,
      thing: null,
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
    saveDescription(descriptionProcess) {
      const { description, ...rest } = this.tender;
      this.setTender({ description: descriptionProcess, ...rest });
    },
    saveOffice(officeSelection) {
      const { office, ...rest } = this.tender;
      this.setTender({ office: officeSelection, ...rest });
    },
    saveUnspsc(unspscCode) {
      const { unspsc, ...rest } = this.tender;
      this.setTender({ unspsc: unspscCode, ...rest });
    },
  },
};
</script>
