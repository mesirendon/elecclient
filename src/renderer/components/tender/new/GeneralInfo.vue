<template>
  <div>
    <h3>Informacion general</h3>
    {{tender}}
    <div class="descriptor">
      <div class="form-group row">
        <label class="col-form-label col-2" for="textInput">Tipo de proceso</label>
        <div class="col-10">
          <input type="text" id="textInput" class="form-control" value="Licitacion publica" readonly>
        </div>
      </div>
      <question text="Número de proceso" type="text" :answer="tender.number" @change="saveNumberProcess"/>
      <question text="Nombre de proceso" type="text" :answer="tender.name" @change="saveNameProcess"/>
      <question text="Descripcion" type="area" :answer="tender.description" @change="saveDescriptionProcess"/>
      <question text="Relacionar con otro proceso" type="logical"/>
      <question text="Unidad de contratacion" type="text" :answer="tender.office" @change="saveOfficeProcess"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <question class="descriptor" text="Codigo UNSPSC" type="text"/>
    <h3>Plan anual de adquisiciones</h3>
    <question class="descriptor" text="Es una adquisicion del PAA?" type="logical"/>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" type="dropdown"/>
      <question text="Duracion del contrato" type="textDropdown"/>
    </div>
    <h3>Direccion de notificaciones</h3>
    <question class="descriptor" text="Utilizar la misma direccion de la unidad de contratacion" type="checkbox"/>
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
    saveDescriptionProcess(descriptionProcess) {
      const { description, ...rest } = this.tender;
      this.setTender({ description: descriptionProcess, ...rest });
    },
    saveNameProcess(nameProcess) {
      const { name, ...rest } = this.tender;
      this.setTender({ name: nameProcess, ...rest });
    },
    saveOfficeProcess(officeProcess) {
      const { office, ...rest } = this.tender;
      this.setTender({ office: officeProcess, ...rest });
    },
  },
};
</script>
