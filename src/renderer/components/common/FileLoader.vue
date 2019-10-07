<template>
  <div>
    <div class="row" v-if="loaded">
      <div class="col">
        <button class="btn btn-block btn-primary" @click="upload">
          <i class="fas fa-file-upload"></i> Subir
        </button>
      </div>
      <div class="col">
        <button class="btn btn-block btn-warning" @click="clean">
          <i class="fas fa-trash-alt"></i> Borrar
        </button>
      </div>
    </div>
    <form v-else>
      <div class="dropbox">
        <div class="form-group"></div>
        <input type="file" class="form-control-file input-file" id="file" accept=".zip,.pdf"
               @change="load">
        <p><i class="fas fa-cloud-upload-alt"></i> Arrastra aca</p>
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

<style scoped lang="scss">
  .dropbox {
    border: 2px dashed grey;
    -webkit-border-radius: 30px;
    border-radius: 30px;
    background: #ececec;
    min-height: 100%;
    position: relative;
    cursor: pointer;
    &:hover {
      background: #ececec;
    }
    p {
      font-size: 1.2em;
      text-align: center;
      padding: 10px 0;
    }
  }

  .input-file {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
</style>
