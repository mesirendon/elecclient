<template>
  <div class="home container" id="main">
    <h2>Bienvenido</h2>
    <br>
    <hr>
    <br>
    <div>
      <h3>Procesos de licitación actuales</h3>
      <br>
      <ul class="list-group">
        <li class="list-group-item" v-for="(tender, idx) in tenders" :key="idx">
          {{tender}}
        </li>
      </ul>
    </div>
    <br>
    <form @submit.prevent="createTender">
      <button class="btn btn-secondary" type="submit">Crear proceso</button>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import * as constants from '@/store/constants';

  export default {
    name: 'Home',
    computed: {
      ...mapState({
        tenders: state => state.Procurement.tenders,
      }),
    },
    methods: {
      ...mapActions({
        getTenders: constants.PROCUREMENT_GET_TENDERS,
        createTender: constants.PROCUREMENT_CREATE_TENDER,
      }),
    },
    created() {
      this.getTenders();
    },
  };
</script>

<style lang="scss" scoped>
  #main {
    margin-top: 50px;
    margin-bottom: 200px;
  }
  h3 span {
    font-size:16px;
    color: darkgrey;
  }
</style>
