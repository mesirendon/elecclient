<template>
  <div>
    <h1>Documentos</h1>
    <div class="row">
      <div class="col-2 offset-10">
        <button class="btn btn-secondary" @click="load = true">Subir archivo</button>
      </div>
    </div>
    <file-loader class="descriptor" v-if="load" :type="fileLoaderTypes.DATABASE"></file-loader>
  </div>
</template>

<script>
import FileLoader from '@/components/common/FileLoader';
import * as constants from '@/store/constants';

export default {
  name: 'Documents',
  data() {
    return {
      fileLoaderTypes: constants.FILE_LOADER_TYPES,
      load: false,
    };
  },
  components: {
    FileLoader,
  },
};
</script>

<style scoped>

</style>
