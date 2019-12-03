<template>
  <loader/>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '@/components/common/Loader';

export default {
  name: 'Redirect',
  props: {
    name: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      required: false,
      default: 500,
    },
  },
  computed: {
    ...mapState({
      params: state => state.route.query,
    }),
  },
  components: {
    Loader,
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: this.name,
        params: { ...this.params },
      });
    }, this.delay);
  },
};
</script>
