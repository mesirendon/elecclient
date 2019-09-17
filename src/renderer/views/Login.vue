<template>
  <div>
    <h1>Modulo de inicio de sesión</h1>
    <sign-up v-if="option === 'newAccount'"></sign-up>
    <sign-in v-else-if="option === 'importAccount'"></sign-in>
    <div class="row justify-content-center" v-else>
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
  </div>
</template>

<script>
  import SignUp from '@/components/Login/SignUp';
  import SignIn from '@/components/Login/SignIn';

  export default {
    name: 'Login',
    data() {
      return {
        option: null,
      };
    },
    components: {
      SignUp,
      SignIn,
    },
  };
</script>
