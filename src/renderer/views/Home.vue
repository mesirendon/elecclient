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
  import { mapMutations, mapState } from 'vuex';
  import * as constants from '@/store/constants';
  import Procurement from '@/handlers/procurement';

  export default {
    name: 'Home',
    computed: {
      ...mapState({
        tenders: state => state.Procurement.tenders,
      }),
    },
    methods: {
      ...mapMutations({
        setProcurementProperty: constants.PROCUREMENT_SET_PROPERTY,
      }),
    },
    created() {
      Procurement.init();
      Procurement.getTenders()
        .then((tenders) => {
          this.setProcurementProperty({
            property: 'tenders',
            value: tenders,
          });
        });
    },
  };
</script>
