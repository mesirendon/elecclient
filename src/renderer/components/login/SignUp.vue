<template>
  <div>
    <h1>Palabras de control</h1>
    <p>Copia en un papel las siguientes palabras en el orden exacto.</p>
    <div v-if="check">
      <div class="row keywords justify-content-center">
        <template v-for="(word, idx) in shuffled">
          <button class="btn"
                  :class="{'btn-primary': word.active, 'btn-outline-primary': !word.active}"
                  @click="toggleWord(word.word, idx)">
            {{word.word}}
          </button> &nbsp;
        </template>
      </div>
      <div class="row keywords justify-content-center">
        <template v-for="word in control">
          <span class="badge badge-primary mnemonic">{{word}}</span> &nbsp;
        </template>
      </div>
      <div class="row justify-content-center" v-if="equals">
        <button class="btn btn-primary" @click="generate">Continuar</button>
      </div>
    </div>
    <template v-else-if="reveal">
      <div class="row keywords justify-content-center">
        <template v-for="word in mnemonic">
          <span class="badge badge-primary mnemonic">{{word}}</span> &nbsp;
        </template>
      </div>
      <div>
        <button class="btn btn-primary" @click="setCheck">Continuar</button>
      </div>
    </template>
    <button class="btn btn-primary" v-else @click="reveal = true">Revelar</button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import * as constants from '@/store/constants';
  import _ from 'lodash';

  export default {
    name: 'SignUp',
    data() {
      return {
        reveal: false,
        check: false,
        shuffled: null,
        control: [],
      };
    },
    computed: {
      ...mapState({
        mnemonic: state => state.Session.mnemonic,
      }),
      equals() {
        return _.isEqual(this.mnemonic, this.control);
      },
    },
    methods: {
      ...mapActions({
        createAccount: constants.SESSION_GENERATE_ACCOUNT,
      }),
      setCheck() {
        this.shuffled = _.shuffle(this.mnemonic)
          .map(word => ({
            word,
            active: true,
          }));
        this.check = true;
      },
      toggleWord(word, idx) {
        this.shuffled[idx].active = !this.shuffled[idx].active;
        if (_.indexOf(this.control, word) >= 0) {
          _.remove(this.control, w => w === word);
        } else {
          this.control.push(word);
        }
      },
      generate() {
        this.createAccount();
        this.$router.push({ name: 'home' });
      },
    },
  };
</script>

<style scoped lang="scss">
  .mnemonic {
    font-size: 1.2em;
    padding-bottom: 10px;
  }

  .keywords {
    padding: 10px;
  }
</style>
