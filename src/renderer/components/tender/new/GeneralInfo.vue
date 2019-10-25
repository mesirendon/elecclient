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
      <Question text="Numero de proceso" type="text"></Question>
      <Question text="Nombre de proceso" type="text"></Question>
      <Question text="Descripcion" type="area"></Question>
      <Question text="Relacionar con otro proceso" type="logical"></Question>
      <Question text="Unidad de contratacion" type="dropdown"></Question>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <Question class="descriptor" text="Codigo UNSPSC" type="text"></Question>
    <h3>Plan anual de adquisiciones</h3>
    <Question class="descriptor" text="Es una adquisicion del PAA?" type="logical"></Question>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <Question text="Tipo" type="dropdown"></Question>
      <Question text="Duracion del contrato" type="text"></Question>
    </div>
    <h3>Acuerdos comerciales</h3>
    <Question class="descriptor" text="Acuerdos comerciales" type="logical"></Question>
    <h3>Documentos internos</h3>
    <Question class="descriptor" text="Documentos internos" type="file"></Question>
  </div>
</template>

<script>
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
    computed: {},
    watch: {},
    methods: {},
    created() {},
  };
</script>

<style scoped>

</style>
