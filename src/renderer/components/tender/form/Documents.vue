<template>
  <div>
    <h1>Documentos</h1>
    <div class="descriptor">
      <div v-if="showForm" >
        <form @submit.prevent>
          <div class="form-group row">
            <label class="col-form-label col-3" for="newFile">Nombre del archivo</label>
            <div class="col-7">
              <input type="text" id="newFile" class="form-control" v-model="newFileName">
            </div>
            <div class="col-2">
              <button class="btn btn-secondary" @click="addFile">Agregar</button>
            </div>
          </div>
        </form>
      </div>
      <div class="row" v-else>
        <div class="col-2 offset-10">
          <button class="btn btn-secondary" @click="showForm = true">
            <i class="fas fa-plus"></i> Agregar archivo
          </button>
        </div>
      </div>
      <question text="Analisis de sector EP" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Estudio previo" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Especificaciones tecnicas" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Certificados disponibilidad presupuestal" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Contexto y matriz de riesgo" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Presupuesto lotes" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Aviso convocatoria" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Proyecto de pliego de condiciones" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Anexo A - ciclos de menu" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Anexo B - caracteristicas de alimentos" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Anexo C - cobertura PAE x IE" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Anexo D - marcas de productos" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Anexo E - Guias de preparacion" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Anexo F - Plan de alimentacion" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Pliego de condiciones" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Resolucion de apertura" :type="dataTypes.DYNAMIC_FILE"/>
      <question text="Adenda 01" :type="dataTypes.DYNAMIC_FILE"/>
      <question v-for="(field, idx) in filesList" :text="field.name" :type="dataTypes.DYNAMIC_FILE" :idx="idx"
                @delete="deleteFile"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import FileLoader from '@/components/common/FileLoader';
import * as constants from '@/store/constants';
// import { log } from 'electron-log';
import Question from '@/components/tender/form/Question';

// const { remote } = window.require('electron');
// const fs = remote.require('fs');

export default {
  name: 'Documents',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      fileLoaderTypes: constants.FILE_LOADER_TYPES,
      load: false,
      showForm: false,
      newFileName: null,
    };
  },
  components: {
    FileLoader,
    Question,
  },
  computed: {
    ...mapState({
      filesList: state => state.Tender.tender.filesList,
    }),
    baseFile() { return constants.TENDER_BASE_FILE; },
  },
  methods: {
    ...mapMutations({
      addFileToList: constants.TENDER_ADD_FILE,
      deleteFileFromList: constants.TENDER_DELETE_FILE,
    }),
    addFile() {
      const file = { ...this.baseFile };
      file.name = this.newFileName;
      this.addFileToList(file);
      this.newFileName = null;
    },
    deleteFile(idx) {
      this.deleteFileFromList(idx);
    },
  },
};
</script>

<style scoped>

</style>
