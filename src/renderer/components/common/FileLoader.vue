<template>
  <div>
    <div v-if="loaded">
      <h4 class="loading" v-if="sent">Enviando transacción...</h4>
      <div class="row" v-else>
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
    </div>
    <form v-else>
      <div class="dropbox">
        <div class="form-group"></div>
        <input type="file" class="form-control-file input-file" id="file" accept=".zip,.pdf"
               @change="load">
        <p><i class="fas fa-cloud-upload-alt"></i> Adjunte su archivo</p>
      </div>
    </form>
  </div>
</template>

<script>
import ipfs from '@/handlers/ipfs';
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import { log } from 'electron-log';
const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'FileLoader',
  data() {
    return {
      fileLoaderTypes: constants.FILE_LOADER_TYPES,
      loaded: false,
      sent: false,
      file: {
        fileName: null,
        fileBuffer: null,
        filePath: null,
      },
    };
  },
  props: {
    type: {
      type: String,
      required: false,
      default: constants.FILE_LOADER_TYPES.IPFS,
    },
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
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
        filePath: file.path,
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
      if (this.type === this.fileLoaderTypes.IPFS) {
        this.sent = true;
        ipfs.add(this.file)
          .then(({ Hash }) => {
            this.loaded = false;
            this.sent = false;
            this.$emit('loaded', Hash);
          });
      } else {
        // eslint-disable-next-line no-underscore-dangle
        const folder = `${remote.app.getPath('userData')}/procurement/${this.tender._id}`;
        if (!fs.existsSync(folder)) {
          log('creando el path');
          fs.mkdirSync(folder);
        }
        fs.copyFile(
          this.file.filePath,
          `${folder}/${this.file.fileName}`
          ,
          (err) => {
            if (err) throw err;
          },
        );
        this.loaded = false;
        this.sent = false;
      }
    },
  },
};
</script>

