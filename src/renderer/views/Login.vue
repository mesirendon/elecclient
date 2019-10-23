<template>
  <div>
    <h1>Modulo de inicio de sesión</h1>
    <sign-up v-if="option === 'newAccount'"></sign-up>
    <sign-in v-else-if="option === 'importAccount'"></sign-in>
    <div class="row justify-content-center" v-else-if="option === 'typeSet'">
      <div class="col-5">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">
              <i class="fas fa-plus-square"></i>
            </h1>
            <h6 class="card-subtitle mb-2 text-center">Crear nueva cuenta</h6>
            <p class="card-text">
              Usa esta opción si aún no tienes una cuenta.
            </p>
            <button class="btn btn-primary btn-block" @click="option = 'newAccount'">
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">
              <i class="fas fa-upload"></i>
            </h1>
            <h6 class="card-subtitle mb-2 text-center">Cargar desde frase</h6>
            <p class="card-text">
              Usa esta opción si ya dispones de una frase.
            </p>
            <button class="btn btn-primary btn-block" @click="option = 'importAccount'">
              Importar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-5">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">
              <i class="fas fa-landmark"></i>
            </h1>
            <h2 class="card-subtitle mb-2 text-center">Entidades del estado</h2>
            <p class="card-text">
              Usa esta opción si representas a una entidad del estado.
            </p>
            <button class="btn btn-primary btn-block" @click="setTenderer">
              Continuar
            </button>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">
              <i class="fas fa-user-friends"></i>
            </h1>
            <h2 class="card-subtitle mb-2 text-center">Proveedores</h2>
            <p class="card-text">
              Usa esta opción si un proveedor.
            </p>
            <button class="btn btn-primary btn-block" @click="setVendor">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as constants from '@/store/constants';

import SignUp from '@/components/login/SignUp';
import SignIn from '@/components/login/SignIn';

export default {
  name: 'Login',
  data() {
    return {
      client: null,
      option: null,
    };
  },
  computed: {
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
    }),
  },
  watch: {
    isLogged(val) {
      if (val) this.$router.push({ name: 'home' });
    },
  },
  methods: {
    ...mapActions({
      setClient: constants.SESSION_SET_CLIENT,
    }),
    setTenderer() {
      this.client = 'tenderer';
      this.option = 'typeSet';
      this.setClient(this.client);
    },
    setVendor() {
      this.client = 'vendor';
      this.option = 'typeSet';
      this.setClient(this.client);
    },
  },
  components: {
    SignUp,
    SignIn,
  },
};
</script>
