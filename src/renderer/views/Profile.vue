<template>
  <div>
    <h1>Perfil</h1>
    <h2>Cuenta principal</h2>
    <div>
      Cuenta del usuario: <strong>{{userAddress}}</strong>
    </div>
    <h2>Cuentas anónimas</h2>
    <div v-for="hiddenAccount in hiddenAccounts">
      <h3>Proceso:
        <router-link :to="{name: 'tender', params: {address: hiddenAccount.tenderAddress, tag}}">
          {{hiddenAccount.tenderAddress}}
        </router-link>
      </h3>
      <div>Dirección: {{hiddenAccount.address}}</div>
      <div>Balance: {{hiddenAccount.balance | balance}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Configuration',
  data() {
    return {
      balance: 0,
      tag: constants.TENDER_FORM_TAGS.GENERAL_INFO,
    };
  },
  computed: {
    ...mapState({
      userAddress: state => state.Session.account,
      hiddenAccounts: state => state.Session.hiddenAccounts,
    }),
  },
  methods: {
    ...mapActions({
      getHiddenAccounts: constants.SESSION_GET_HIDDEN_ACCOUNTS,
    }),
  },
  created() {
    this.getHiddenAccounts();
  },
};
</script>
