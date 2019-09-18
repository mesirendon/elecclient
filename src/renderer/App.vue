<template>
  <div id="app" class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import * as constants from '@/store/constants';

  export default {
    name: 'Procurement',
    methods: {
      ...mapActions({
        loadDB: constants.SESSION_LOAD_DB,
      }),
    },
    created() {
      this.loadDB();
    },
  };
</script>

<style lang="scss">
  @import "styles/main";
</style>
