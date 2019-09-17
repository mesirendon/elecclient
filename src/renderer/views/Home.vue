<template>
  <div>
    <h1>Procurement Client</h1>
    <button class="btn btn-primary">
      Create a new tender process
    </button>
    <ul>
      <li v-for="tender in tenders">{{tender}}</li>
    </ul>
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
      }),
      ...mapGetters({
        isLogged: constants.SESSION_IS_LOGGED,
      }),
    },
    methods: {
      ...mapActions({
        getTenders: constants.PROCUREMENT_GET_TENDERS,
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
