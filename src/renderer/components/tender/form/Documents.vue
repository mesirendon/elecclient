<template>
  <div>
    <h1>Documentos</h1>
    <div class="row">
      <div class="col-2 offset-10">
        <button class="btn btn-secondary" @click="load = true">Subir archivo</button>
      </div>
    </div>
    <file-loader class="descriptor" v-if="load"></file-loader>
  </div>
</template>

<script>
import FileLoader from '@/components/common/FileLoader';

export default {
  name: 'Documents',
  data() {
    return {
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
