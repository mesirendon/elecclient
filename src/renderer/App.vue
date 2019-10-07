<template>
  <div id="app" class="container-fluid full-height">
    <div class="row full-height">
      <div class="col-2" v-if="isLogged">
        <left-menu></left-menu>
      </div>
      <div id="content" class="col">
        <router-view class="container-fluid"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as constants from '@/store/constants';
  import LeftMenu from '@/components/common/LeftMenu';

  export default {
    name: 'Procurement',
    computed: {
      ...mapGetters({
        isLogged: constants.SESSION_IS_LOGGED,
      }),
    },
    methods: {
      ...mapActions({
        loadDB: constants.SESSION_LOAD_DB,
      }),
    },
    components: {
      LeftMenu,
    },
    created() {
      this.loadDB();
    },
  };
</script>

<style lang="scss">
  @import "styles/main";
</style>
