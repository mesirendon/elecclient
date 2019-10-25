<template>
  <div>
    <h1><i class="fas fa-plus"></i> Nuevo proceso de licitación</h1>
    <form @submit.prevent>
      <button type="button" class="btn btn-secondary" @click="saveDraft">
        <i class="fas fa-plus"></i> Crear proceso dummy
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'New',
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
  },
  methods: {
    ...mapActions({
      setTender: constants.TENDER_SET_TENDER,
    }),
    saveDraft() {},
  },
};
</script>
