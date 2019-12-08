<template>
  <div>
    <h1>Configuracion</h1>
    Cuenta del usuario: <strong>{{userAddress}}</strong>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Configuration',
  computed: {
    ...mapState({
      userAddress: state => state.Session.account,
    }),
  },
};
</script>
