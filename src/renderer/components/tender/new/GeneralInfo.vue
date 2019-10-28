<template>
  <div>
    <h3>Informacion general</h3>
    {{tender}}
    <div class="descriptor">
      <div class="row">
        <div class="col-2">
          <h4>Tipo de proceso: </h4>
        </div>
        <div class="col">
          <p>Licitacion publica</p>
        </div>
      </div>
      <question text="Número de proceso" type="text" :answer="tender.number" @change="saveNumberProcess"/>
      <question text="Nombre de proceso" type="text"/>
      <question text="Descripcion" type="area"/>
      <question text="Relacionar con otro proceso" type="logical"/>
      <question text="Unidad de contratacion" type="dropdown"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <question class="descriptor" text="Codigo UNSPSC" type="text"/>
    <h3>Plan anual de adquisiciones</h3>
    <question class="descriptor" text="Es una adquisicion del PAA?" type="logical"/>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" type="dropdown"/>
      <question text="Duracion del contrato" type="text"/>
    </div>
    <h3>Acuerdos comerciales</h3>
    <question class="descriptor" text="Acuerdos comerciales" type="logical"/>
    <h3>Documentos internos</h3>
    <question class="descriptor" text="Documentos internos" type="file"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

import Question from '@/components/tender/new/Question';

export default {
  name: 'GeneralInfo',
  data() {
    return {
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
    saveNumberProcess(numberProcess) {
      const { number, ...rest } = this.tender;
      this.setTender({ number: numberProcess, ...rest });
    },
  },
};
</script>
