<template>
  <div class="descriptor">
    <div class="row align-items-center">
      <div class="col">
        <h1>{{description}}</h1>
        <p>Dirección del contrato {{address}}.</p>
      </div>
      <div class="col-3 text-center">
        <button type="button" class="btn btn-warning" @click="deleteTender"
                v-if="tenderType === tenderTypes.DRAFT">
          Borrar <i class="fas fa-trash-alt"></i>
        </button>
        <router-link class="btn" :to="{name: 'tender', params: {address: address, tag}}"
                     :class="{'btn-secondary': tenderType === tenderTypes.DEPLOYED, 'btn-primary': tenderType === tenderTypes.DRAFT}">
          <template v-if="tenderType === tenderTypes.DEPLOYED">
            Más información <i class="fas fa-chevron-right"></i>
          </template>
          <template v-else-if="tenderType === tenderTypes.DRAFT">
            Editar <i class="fas fa-edit"></i>
          </template>
        </router-link>
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
