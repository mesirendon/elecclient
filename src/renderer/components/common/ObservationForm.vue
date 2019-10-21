<template>
  <div class="observation-form">
    <div class="row separated">
      <div class="col">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Observación</span>
          </div>
          <textarea v-model="observation.plain" class="form-control" aria-label="Observación">
            </textarea>
        </div>
      </div>
      <div class="col">
        <p v-if="observation.hash">{{observation.hash}}</p>
        <file-loader @loaded="setObservationFile" v-else></file-loader>
      </div>
    </div>
    <button class="btn btn-secondary" @click="uploadObservation">
      <i class="fas fa-file-upload"></i> Enviar observación
    </button>
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
