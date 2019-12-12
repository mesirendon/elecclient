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
    <h3>Mis ofertas</h3>
    <div class="row">
      <div class="col text-center minor-separated">
        <button class="btn btn-secondary margin-sides">Borradores</button>
        <button class="btn btn-secondary margin-sides">Publicadas</button>
        <button class="btn btn-secondary margin-sides">Evaluación</button>
        <button class="btn btn-secondary margin-sides">Asignadas</button>
      </div>
    </div>
    <descriptor v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
    <h3 class="minor-separated">Mis licitaciones favoritas</h3>
    <div class="row text-center">
      <div class="col">
        <h5>Últimas licitaciones visitadas</h5>
        <div class="tenders-box">
          <basic v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
        </div>
      </div>
      <div class="col">
        <h5>Licitaciones comentadas</h5>
        <div class="tenders-box">
          <basic v-for="(tender, idx) in tenders" :key="idx" :address="tender"/>
        </div>
      </div>
      <div class="col">
        <h5>Licitaciones cerca a cerrar</h5>
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
      bids: state => state.Bid.bids,
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
