<template>
  <div>
    {{description}}
  </div>
</template>

<script>
import Tender from '@/handlers/tender';

export default {
  name: 'Basic',
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      description: null,
    };
  },
  created() {
    const tender = new Tender(this.address);
    tender.description.then((description) => {
      this.description = description;
    });
  },
};
</script>
