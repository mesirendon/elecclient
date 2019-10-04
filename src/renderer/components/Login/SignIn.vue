<template>
  <div>
    <div class="row justify-content-center">
      <form @submit.prevent="recover">
        <div class="form-group">
          <label for="keyWords">Palabras clave separadas por espacios</label>
          <textarea class="form-control" id="keyWords" rows="4" cols="80"
                    v-model="text"></textarea>
        </div>
        <button class="btn btn-primary" type="submit" v-if="keyWords.length === 12 && keyWords[11]">
          <i class="fas fa-upload"></i> Recuperar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'SignIn',
  data() {
    return {
      text: null,
    };
  },
  computed: {
    keyWords() {
      if (this.text) {
        return this.text.split(' ');
      }
      return [];
    },
  },
  methods: {
    ...mapActions({
      recoverAccount: constants.SESSION_RECOVER_ACCOUNT,
    }),
    recover() {
      this.recoverAccount(this.keyWords);
    },
  },
};
</script>
