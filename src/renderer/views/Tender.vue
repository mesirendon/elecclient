<template>
  <div>
    <detail v-if="address" :address="address"/>
    <new v-else/>
  </div>
</template>

<script>
import Detail from '@/components/tender/Detail';
import New from '@/components/tender/New';

export default {
  name: 'Tender',
  props: {
    address: {
      type: String,
      required: false,
    },
  },
  components: {
    Detail,
    New,
  },
};
</script>
