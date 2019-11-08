<template>
  <div class="container">
    <detail v-if="published" :address="address"/>
    <bid-form v-else-if="address" :id="address"/>
    <bid-form v-else :tenderAddress="tenderAddress"/>
  </div>
</template>

<script>
import BidForm from '@/components/bid/BidForm';
import Detail from '@/components/bid/Detail';

export default {
  name: 'Bid',
  props: {
    address: {
      type: String,
      required: false,
    },
    tenderAddress: {
      type: String,
      required: false,
    },
  },
  computed: {
    published() {
      if (this.address) {
        return this.address.match(/0x[a-fA-F0-9]{40}/);
      }
      return false;
    },
  },
  components: {
    BidForm,
    Detail,
  },
};
</script>
