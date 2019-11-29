<template>
  <div>
    <div v-if="alreadySaved">
      <button class="btn btn-secondary" @click="reset">Subir archivo nuevamente
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
import path from 'path';
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

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
      filesFolderPath: null,
      alreadySaved: false,
      uploadedFileName: null,
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
    path: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      bid: state => state.Bid.bid,
      client: state => state.Session.client,
      // eslint-disable-next-line no-underscore-dangle
      id: state => (state.Bid.bid && (_.indexOf(['newBid', 'bid'], state.route.name) >= 0) ? state.Bid.bid._id : state.Tender.tender._id),
      idType: state => (state.Bid.bid && (_.indexOf(['newBid', 'bid'], state.route.name) >= 0) ? 'bid' : 'tender'),
    }),
  },
  methods: {
    ...mapActions({
      setBid: constants.BID_SET_BID,
      setTender: constants.TENDER_SET_TENDER,
    }),
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
      this.alreadySaved = false;
    },
    reset() {
      this.clean();
      fs.unlinkSync(path.join(this.destinationFolderPath, `${this.uploadedFileName}`), (err) => {
        if (err) throw err;
      });
      fs.readdir(this.destinationFolderPath, (err, files) => {
        if (err) throw err;
        if (!files.length) {
          fs.rmdir(this.destinationFolderPath, (err) => {
            if (err) throw err;
          });
        }
      });
      this.$emit('loaded', '');
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
        const parent = this.destinationFolderPath.split('/')
          .slice(0, -1)
          .join('/');
        if (!fs.existsSync(parent)) fs.mkdirSync(parent);
        if (!fs.existsSync(this.destinationFolderPath)) fs.mkdirSync(this.destinationFolderPath);
        const extension = this.file.filePath.split('.')
          .pop();
        this.uploadedFileName = `${this.fileName.split(' ')
          .join('_')}.${extension}`;
        if (this.idType === 'tender') {
          const files = this.tender.filesList
            .map((file) => {
              if (file.name === this.fileName) {
                return {
                  name: file.name,
                  ipfsHash: file.ipfsHash,
                  fileName: this.uploadedFileName,
                };
              }
              return file;
            });
          const { filesList, ...rest } = this.tender;
          this.setTender({ filesList: files, ...rest });
        }
        fs.copyFile(
          this.file.filePath,
          path.join(this.destinationFolderPath, this.uploadedFileName),
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
          const extension = path.basename(file)
            .split('.')
            .pop();
          const uploadedFileName = `${this.fileName.split(' ')
            .join('_')}.${extension}`;
          if (file === uploadedFileName) {
            this.alreadySaved = true;
            this.uploadedFileName = uploadedFileName;
          }
        });
      });
    },
    init() {
      if (this.type === constants.FILE_LOADER_TYPES.DATABASE) {
        if (this.path) {
          this.destinationFolderPath = this.path;
        } else {
          const folderPath = path.join(remote.app.getPath('userData'), constants.FILE_FOLDER, this.id);
          this.destinationFolderPath = folderPath;
        }
        if (fs.existsSync(this.destinationFolderPath)) {
          this.getFiles();
        }
      }
    },
  },
  created() {
    if (this.id) {
      this.init();
    }
  },
  updated() {
    this.init();
  },
};
</script>

