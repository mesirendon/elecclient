<template>
  <div>
    <form @submit.prevent>
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" :placeholder="placeholder">
        </div>
        <div class="col-2 text-center">
          <button class="btn btn-secondary">
            Buscar
          </button>
        </div>
      </div>
    </form>
    <h1>Mis ofertas</h1>
    <div class="row">
      <div class="col text-center">
        <button class="btn btn-secondary">Borradores</button>
        <button class="btn btn-secondary">Publicadas</button>
        <button class="btn btn-secondary">Evaluación 1</button>
        <button class="btn btn-secondary">Evaluación 2</button>
        <button class="btn btn-secondary">Asignadas</button>
      </div>
    </div>
    <descriptor v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
    <h1>Mis licitaciones favoritas</h1>
    <div class="row text-center">
      <div class="col">
        <h2>Últimas licitaciones visitadas</h2>
        <div class="tenders-box">
          <basic v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
        </div>
      </div>
      <div class="col">
        <h2>Licitaciones comentadas</h2>
        <div class="tenders-box">
          <basic v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
        </div>
      </div>
      <div class="col">
        <h2>Licitaciones cerca a cerrar</h2>
        <div class="tenders-box">
          <basic v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';
import Descriptor from '@/components/tender/Descriptor';
import Basic from '@/components/tender/Basic';

export default {
  name: 'Vendor',
  data() {
    return {
      placeholder: '\uf002 Buscar una licitación por palabras clave',
    };
  },
  computed: {
    ...mapState({
      tenders: state => state.Procurement.tenders,
    }),
  },
  methods: {
    ...mapActions({
      getTenders: constants.PROCUREMENT_GET_TENDERS,
      createTender: constants.PROCUREMENT_CREATE_TENDER,
    }),
  },
  components: {
    Descriptor,
    Basic,
  },
  created() {
    this.getTenders();
  },
};
</script>
