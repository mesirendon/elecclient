<template>
  <div>
    <h1>Documentos</h1>
    <div class="descriptor">
      <question text="Analisis de sector EP" :type="dataTypes.FILE"/>
      <question text="Estudio previo" :type="dataTypes.FILE"/>
      <question text="Especificaciones tecnicas" :type="dataTypes.FILE"/>
      <question text="Certificados disponibilidad presupuestal" :type="dataTypes.FILE"/>
      <question text="Contexto y matriz de riesgo" :type="dataTypes.FILE"/>
      <question text="Presupuesto lotes" :type="dataTypes.FILE"/>
      <question text="Aviso convocatoria" :type="dataTypes.FILE"/>
      <question text="Proyecto de pliego de condiciones" :type="dataTypes.FILE"/>
      <question text="Anexo A - ciclos de menu" :type="dataTypes.FILE"/>
      <question text="Anexo B - caracteristicas de alimentos" :type="dataTypes.FILE"/>
      <question text="Anexo C - cobertura PAE x IE" :type="dataTypes.FILE"/>
      <question text="Anexo D - marcas de productos" :type="dataTypes.FILE"/>
      <question text="Anexo E - Guias de preparacion" :type="dataTypes.FILE"/>
      <question text="Anexo F - Plan de alimentacion" :type="dataTypes.FILE"/>
      <question text="Pliego de condiciones" :type="dataTypes.FILE"/>
      <question text="Resolucion de apertura" :type="dataTypes.FILE"/>
      <question text="Adenda 01" :type="dataTypes.FILE"/>
    </div>
  </div>
</template>

<script>
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
    };
  },
  components: {
    FileLoader,
    Question,
  },
  methods: {},
};
</script>

<style scoped>

</style>
