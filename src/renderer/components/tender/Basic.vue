<template>
  <div>
    <p>{{number}} {{name}}</p>
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
      name: null,
      number: null,
    };
  },
  created() {
    const tender = new Tender(this.address);
    tender.number.then((number) => {
      this.number = number;
    });
    tender.name.then((name) => {
      this.name = name;
    });
  },
};
</script>
