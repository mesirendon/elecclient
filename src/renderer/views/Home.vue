<template>
  <div class="home container" id="main">
    <h1>Bienvenido</h1>
    <div v-if="client==='tenderer'">
      <button @click="createTender" class="btn btn-secondary">Crear proceso</button>
    </div>
    <div>
      <h3>Procesos de licitación actuales</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="(tender, idx) in tenders" :key="idx">
          <router-link class="link" :to="{name: 'tender', params: {address: tender}}">
            Proceso: {{tender}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      tenders: state => state.Procurement.tenders,
      client: state => state.Session.client,
    }),
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
    }),
  },
  methods: {
    ...mapActions({
      getTenders: constants.PROCUREMENT_GET_TENDERS,
      createTender: constants.PROCUREMENT_CREATE_TENDER,
    }),
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'login' });
    } else {
      this.getTenders();
    }
  },
};
</script>

<style lang="scss" scoped>
  #main {
    margin-top: 50px;
    margin-bottom: 200px;
  }

  h3 span {
    font-size: 16px;
    color: darkgrey;
  }

  .link {
    color: darkgray;
  }
</style>
