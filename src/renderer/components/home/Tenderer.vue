<template>
  <div>
    <h3 class="minor-separated separated-top">Mis licitaciones</h3>
    <div class="row">
      <div class="col text-center">
        <button class="btn btn-secondary">Borradores</button>
        <button class="btn btn-secondary">Publicadas</button>
        <button class="btn btn-secondary">Evaluación 1</button>
        <button class="btn btn-secondary">Evaluación 2</button>
        <button class="btn btn-secondary">Asignadas</button>
      </div>
    </div>
    <descriptor v-for="(tender, idx) in tenders" :key="`${idx}Tender`" :address="tender"/>
    <descriptor v-for="(tender, idx) in draftTenders" :key="idx" :address="tender._id">{{tender}}</descriptor>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';
import Descriptor from '@/components/tender/Descriptor';

export default {
  name: 'Tenderer',
  computed: {
    ...mapState({
      tenders: state => state.Procurement.tenders,
      draftTenders: state => state.Tender.tenders,
    }),
  },
  methods: {
    ...mapActions({
      getTenders: constants.PROCUREMENT_GET_TENDERS,
      loadDraftTenders: constants.TENDER_LOAD_DRAFTS,
    }),
  },
  components: {
    Descriptor,
  },
  created() {
    this.getTenders();
    this.loadDraftTenders();
  },
};
</script>
