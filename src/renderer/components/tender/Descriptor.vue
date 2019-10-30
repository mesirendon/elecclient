<template>
  <div class="descriptor">
    <div class="row align-items-center">
      <div class="col">
        <h1>{{description}}</h1>
        <p>Dirección del contrato {{address}}.</p>
      </div>
      <div class="col-3 text-center">
        <router-link class="btn btn-secondary" :to="{name: 'tender', params: {address: address}}">
          <template v-if="type === 'deployed'">
            Más información <i class="fas fa-chevron-right"></i>
          </template>
          <template v-else-if="type === 'draft'">
            Editar <i class="fas fa-chevron-right"></i>
          </template>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
      type: 'deployed',
    };
  },
  computed: {
    ...mapState({
      tenders: state => state.Tender.tenders,
    }),
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
      this.type = 'draft';
      this.description = this.tender.description;
    }
  },
};
</script>
