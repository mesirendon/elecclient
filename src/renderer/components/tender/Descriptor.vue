<template>
  <div class="descriptor">
    <div class="row align-items-center">
      <div class="col">
        <h1>{{description}}</h1>
        <p>Dirección del contrato {{address}}.</p>
      </div>
      <div class="col-3 text-center">
        <router-link class="btn btn-secondary" :to="{name: 'tender', params: {address: address}}"
                     v-if="tenderType === tenderTypes.DEPLOYED">
          Más información <i class="fas fa-chevron-right"></i>
        </router-link>
        <template v-else-if="tenderType === tenderTypes.DRAFT">
          <button type="button" class="btn btn-warning" @click="deleteTender">
            Borrar <i class="fas fa-trash-alt"></i>
          </button>
          <router-link class="btn btn-primary" :to="{name: 'tender', params: {address: address}}">
            Editar <i class="fas fa-edit"></i>
          </router-link>
        </template>
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
      description: null,
      tenderType: constants.TENDER_STATE.DEPLOYED,
      tenderTypes: constants.TENDER_STATE,
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
      tender.description.then((description) => {
        this.description = description;
      });
      this.tender = tender;
    } else {
      // eslint-disable-next-line no-underscore-dangle
      [this.tender] = this.tenders.filter(t => t._id === this.address);
      this.tenderType = this.tenderTypes.DRAFT;
      this.description = this.tender.description;
    }
  },
};
</script>
