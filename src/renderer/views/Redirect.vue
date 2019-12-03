<template>
  <div class="loading row align-items-center">
    <h1 class="col">
      <i class="fas fa-spinner fa-pulse"></i>
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Redirect',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      params: state => state.route.query,
    }),
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: this.name,
        params: { ...this.params },
      });
    }, 1000);
  },
};
</script>

<style scoped>

</style>
