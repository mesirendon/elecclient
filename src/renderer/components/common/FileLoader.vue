<template>
  <div>
    <div class="row" v-if="loaded">
      <div class="col">
        <button class="btn btn-primary" @click="upload">
          <i class="fas fa-file-upload"></i> Subir
        </button>
      </div>
      <div class="col">
        <button class="btn btn-warning" @click="clean">
          <i class="fas fa-trash-alt"></i> Borrar
        </button>
      </div>
    </div>
    <form v-else>
      <div class="form-group">
        <label for="file">Seleccionar archivo</label>
        <input type="file" class="form-control-file" id="file" accept=".zip,.pdf"
               @change="load">
      </div>
    </form>
  </div>
</template>

<script>
import ipfs from '@/handlers/ipfs';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'FileLoader',
  data() {
    return {
      loaded: false,
      file: {
        fileName: null,
        fileBuffer: null,
      },
    };
  },
  methods: {
    load(e) {
      const { files } = e.target;
      if (!files.length) return;
      const [file] = files;
      const fileName = file.path.split('/')
        .pop();
      const fileBuffer = fs.readFileSync(file.path);
      this.file = {
        fileName,
        fileBuffer,
      };
      this.loaded = true;
    },
    clean() {
      this.file = {
        fileName: null,
        fileBuffer: null,
      };
      this.loaded = false;
    },
    upload() {
      ipfs.add(this.file)
        .then(({ Hash }) => {
          this.$emit('loaded', Hash);
        });
    },
  },
};
</script>

<style scoped>

</style>
