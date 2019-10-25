<template>
    <div>
        <h3>Informacion general</h3>
      <div class="row">
        <div class="col-2">
          <h4>Tipo de proceso: </h4>
        </div>
        <div class="col">
          <p>Licitacion publica</p>
         </div>
      </div>
      <div class="row">
        <div class="col-2">
          <label for="tenderNumber">Número de proceso</label>
        </div>
        <div class="col">
          <input class="form-control" id="tenderNumber">
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <label for="tenderName">Nombre</label>
        </div>
        <div class="col">
          <input class="form-control" id="tenderName">
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <label for="tenderDesription">Descripcion</label>
        </div>
        <div class="col">
          <textarea class="form-control" id="tenderDesription"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <label for="related">Relacionar con otro proceso</label>
        </div>
        <div class="col">
          <textarea class="form-control" id="related"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
            <label>Unidad de contratacion</label>
        </div>
        <div class="col">
          <input class="form-control" v-model="thing" @clicked="fun" list="browsers" name="myBrowser">
          <datalist id="browsers">
            <option value="Chrome"></option>
            <option value="Firefox"></option>
            <option value="Internet Explorer"></option>
            <option value="Opera"></option>
            <option value="Safari"></option>
            <option value="Microsoft Edge"></option>
          </datalist>
        </div>
      </div>
        <h3>Clasificacion del bien o servicio</h3>

        <h3>Plan anual de adquisiciones</h3>
        <h3>Informacion del contrato</h3>
        <h3>Direccion de notificaciones</h3>
        <h3>Acuerdos comerciales</h3>
        <h3>Configuracion del equipo y del flujo de aprovacion</h3>
    </div>
</template>

<script>
  import { log } from 'electron-log';
  export default {
    name: 'TenderCreation',
    data() {
      return {
        thing: null,
      };
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      fun() {
        log(this.thing);
      },
    },
    created() {},
  };
</script>
