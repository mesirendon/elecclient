<template>
  <div>
    <detail v-if="published" :address="address"/>
    <tender-form v-else-if="address" :id="address" :tag="tag"/>
    <tender-form v-else/>
  </div>
</template>

<script>
import Detail from '@/components/tender/Detail';
import TenderForm from '@/components/tender/TenderForm';
import { TENDER_FORM_TAGS } from '@/store/constants';

export default {
  name: 'Tender',
  props: {
    address: {
      type: String,
      required: false,
    },
    tag: {
      type: String,
      required: false,
      default: TENDER_FORM_TAGS.GENERAL_INFO,
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
    Detail,
    TenderForm,
  },
};
</script>
