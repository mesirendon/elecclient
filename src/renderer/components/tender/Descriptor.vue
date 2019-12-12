<template>
  <div class="descriptor">
    <div class="row align-items-center">
      <div class="col">
        <p><strong>Licitación {{number}}. {{name}}</strong></p>
        <p>Estado: Evaluación, abierto a comentarios</p>
      </div>
      <div class="col-4 text-right">
        <router-link class="btn btn-default" :to="{name: 'tender', params: {address: address, tag}}">
          <template v-if="tenderType === tenderTypes.DEPLOYED">
            Más información <i class="fas fa-chevron-right"></i>
          </template>
          <template v-else-if="tenderType === tenderTypes.DRAFT">
            Editar <i class="fas fa-edit"></i>
          </template>
        </router-link>
        <button type="button" class="btn btn-default" @click="deleteTender"
                v-if="tenderType === tenderTypes.DRAFT">
          Borrar <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

import Tender from '@/handlers/tender';

export default {
  name: 'Descriptor',
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tender: null,
      name: null,
      number: null,
      tenderType: constants.TENDER_STATE.DEPLOYED,
      tenderTypes: constants.TENDER_STATE,
      tag: constants.TENDER_FORM_TAGS.GENERAL_INFO,
    };
  },
  computed: {
    ...mapState({
      tenders: state => state.Tender.tenders,
    }),
  },
  methods: {
    ...mapActions({
      delete: constants.TENDER_DELETE_DRAFT,
    }),
    deleteTender() {
      this.delete(this.address);
    },
  },
  created() {
    if (this.address.match(/0x[a-fA-F0-9]{40}/)) {
      const tender = new Tender(this.address);
      tender.number.then((number) => {
        this.number = number;
      });
      tender.name.then((name) => {
        this.name = name;
      });
      this.tender = tender;
    } else {
      // eslint-disable-next-line no-underscore-dangle
      [this.tender] = this.tenders.filter(t => t._id === this.address);
      this.tenderType = this.tenderTypes.DRAFT;
      this.name = this.tender.name;
      this.number = this.tender.number;
    }
  },
};
</script>
