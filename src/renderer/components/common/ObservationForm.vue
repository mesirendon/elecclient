<template>
  <div class="observation-form">
    <div class="row separated">
      <div class="col">
        <div class="input-group">
          <textarea v-model="observation.plain" class="form-control" :placeholder="`Escriba su ${type}...`"></textarea>
        </div>
      </div>
      <div class="col">
        <p v-if="observation.hash">{{observation.hash}}</p>
        <file-loader @loaded="setObservationFile" v-else/>
      </div>
    </div>
    <div class="centered">
      <button class="btn btn-primary" @click="uploadObservation">
        <i class="fas fa-file-upload"></i>  Publicar observación {{type}}
      </button>
    </div>
  </div>
</template>

<script>
import FileLoader from '@/components/common/FileLoader';

export default {
  name: 'ObservationForm',
  data() {
    return {
      observation: {
        plain: null,
        hash: '',
      },
    };
  },
  components: {
    FileLoader,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    uploadObservation() {
      this.$emit('observation', this.observation);
    },
    setObservationFile(ipfsHash) {
      this.observation.hash = ipfsHash;
    },
  },
};
</script>

<style scoped>

</style>
