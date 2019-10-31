<template>
  <div>
    <div v-if="alreadySaved">
      <button class="btn btn-secondary" @click="alreadySaved = false">Subir archivo nuevamente
      </button>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
import ipfs from '@/handlers/ipfs';
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import { log } from 'electron-log';
import path from 'path';

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
      destinationFolderPath: null,
      alreadySaved: false,
    };
  },
  props: {
    type: {
      type: String,
      required: false,
      default: constants.FILE_LOADER_TYPES.IPFS,
    },
    fileName: {
      type: String,
      required: false,
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
        if (!fs.existsSync(this.destinationFolderPath)) {
          fs.mkdirSync(this.destinationFolderPath);
        }
        fs.copyFile(
          this.file.filePath,
          `${this.destinationFolderPath}/${this.fileName}`
          ,
          (err) => {
            if (err) throw err;
          },
        );
        this.loaded = false;
        this.sent = false;
        this.alreadySaved = true;
        this.$emit('loaded', this.destinationFolderPath);
      }
    },
    getFiles() {
      fs.readdir(this.destinationFolderPath, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          log(file);
          if (file === this.fileName) {
            this.alreadySaved = true;
          }
        });
      });
    },
  },
  created() {
    // eslint-disable-next-line no-underscore-dangle
    const id = this.tender._id;
    const folderPath = path.join(remote.app.getPath('userData'), constants.FILE_FOLDER, id);
    if (fs.existsSync(folderPath)) {
      this.destinationFolderPath = folderPath;
      this.getFiles();
    }
  },
};
</script>

