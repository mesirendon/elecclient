<template>
  <div class="descriptor">
    <div class="row align-items-center">
      <div class="col">
        <h1>{{description}}</h1>
        <p>Dirección del contrato {{address}}.</p>
      </div>
      <div class="col-3 text-center">
        <router-link class="btn btn-secondary" :to="{name: 'tender', params: {address: address}}">
          Más información <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  created() {
    const tender = new Tender(this.address);
    tender.description.then((description) => {
      this.description = description;
    });
    this.tender = tender;
  },
};
</script>
