<template>
  <div>
    <detail v-if="published" :address="address"/>
    <tender-form v-else-if="address" :id="address"/>
    <tender-form v-else/>
  </div>
</template>

<script>
import Detail from '@/components/tender/Detail';
import TenderForm from '@/components/tender/TenderForm';

export default {
  name: 'Tender',
  props: {
    address: {
      type: String,
      required: false,
    },
  },
  computed: {
    published() {
      return this.address.match(/0x[a-fA-F0-9]{40}/);
    },
  },
  components: {
    Detail,
    TenderForm,
  },
};
</script>
