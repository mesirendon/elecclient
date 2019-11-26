<template>
  <div class="home container" id="main">
    <tenderer class="tenderer" v-if="client === 'tenderer'"/>
    <vendor class="vendor" v-else-if="client === 'vendor'"/>

    <price-list/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';
import Tenderer from '@/components/home/Tenderer';
import Vendor from '@/components/home/Vendor';
import PriceList from '@/components/tender/form/PriceList';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      client: state => state.Session.client,
      tenders: state => state.Procurement.tenders,
    }),
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
    }),
  },
  components: {
    Tenderer,
    Vendor,
    PriceList,
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'login' });
    }
  },
};
</script>
