<template>
  <div class="container full-height">
    <loader v-if="loading"/>
    <div v-else>
      <div class="row tender-form-head">
        <div class="col">
          <ul class="nav nav-tabs separated">
            <li class="nav-item">
              <button class="nav-link" :class="{active: active === tags.GENERAL_INFO}"
                      @click="active = tags.GENERAL_INFO">
                Información general
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" :class="{active: active === tags.SCHEDULE}"
                      @click="active = tags.SCHEDULE">
                Cronograma
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" :class="{active: active === tags.LOT}"
                      @click="active = tags.LOT">
                Lotes
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" :class="{active: active === tags.QUESTIONNAIRE}"
                      @click="active = tags.QUESTIONNAIRE">
                Cuestionario
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" :class="{active: active === tags.DOCUMENTS}"
                      @click="active = tags.DOCUMENTS">
                Documentos
              </button>
            </li>
          </ul>
        </div>
        <div class="col-3 text-right">
          <button class="btn btn-primary" @click="saveTenderDraft">
            Guardar
          </button>
          <button class="btn btn-primary" @click="sendTenderDraft">
            Publicar
          </button>
        </div>
      </div>
      <div class="tender-form-content">
        <general-info v-if="active === tags.GENERAL_INFO"/>
        <schedule v-else-if="active === tags.SCHEDULE" @change="saveTenderDraft"/>
        <lot v-else-if="active === tags.LOT" @change="saveTenderDraft"/>
        <questionnaire v-else-if="active === tags.QUESTIONNAIRE" @sectionAdded="saveTenderDraft"/>
        <documents v-else-if="active === tags.DOCUMENTS"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import path from 'path';
import ipfs from '@/handlers/ipfs';
import _ from 'lodash';
import * as constants from '@/store/constants';
import Tender from '@/handlers/tender';
import GeneralInfo from '@/components/tender/form/GeneralInfo';
import Schedule from '@/components/tender/form/Schedule';
import Questionnaire from '@/components/tender/form/Questionnaire';
import Lot from '@/components/tender/form/Lot';
import Documents from '@/components/tender/form/Documents';
import Loader from '@/components/common/Loader';
import { error } from 'electron-log';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'TenderForm',
  props: {
    id: {
      type: String,
      required: false,
    },
    tag: {
      type: String,
      required: false,
      default: constants.TENDER_FORM_TAGS.GENERAL_INFO,
    },
  },
  data() {
    return {
      active: this.tag,
      tags: constants.TENDER_FORM_TAGS,
      loading: false,
    };
  },
  components: {
    GeneralInfo,
    Schedule,
    Questionnaire,
    Lot,
    Documents,
    Loader,
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      tenders: state => state.Tender.tenders,
      account: state => state.Session.account,
      privateKey: state => state.Session.privateKey,
      publicKey: state => state.Session.publicKey,
    }),
  },
  methods: {
    ...mapActions({
      createTender: constants.TENDER_SAVE_DRAFT,
      saveTender: constants.TENDER_UPDATE_DRAFT,
      setTender: constants.TENDER_SET_TENDER,
    }),
    ...mapMutations({
      updateFile: constants.TENDER_UPDATE_FILE,
      updateEvidenceFile: constants.TENDER_UPDATE_EVIDENCE_FILE,
    }),
    saveTenderDraft() {
      this.saveTender(this.tender);
    },
    async sendTenderDraft() {
      this.loading = true;
      const folderPath = path.join(
        remote.app.getPath('userData'),
        constants.FILE_FOLDER,
        // eslint-disable-next-line no-underscore-dangle
        this.tender._id,
      );
      try {
        await this.uploadFiles(folderPath);
      } catch (e) {
        error(e);
      }
      fs.writeFileSync(
        path.join(folderPath, 'questionnaire.json'),
        JSON.stringify(this.tender.questionnaire),
        (err) => {
          if (err) throw err;
        },
      );
      const fileName = 'questionnaire.json';
      const fileBuffer = fs.readFileSync(path.join(folderPath, fileName));
      const questionnaireIPFSResponse = await ipfs.add({
        fileName,
        fileBuffer,
      });
      const { questionnaireHash, ...rest } = this.tender;
      this.setTender({ questionnaireHash: questionnaireIPFSResponse.Hash, ...rest });
      fs.unlinkSync(path.join(folderPath, 'questionnaire.json'), (err) => { if (err) throw err; });
      fs.writeFileSync(
        path.join(folderPath, 'lots.json'),
        JSON.stringify(this.tender.lots),
        (err) => {
          if (err) throw err;
        },
      );
      const fileNameLots = 'lots.json';
      const fileBufferLots = fs.readFileSync(path.join(folderPath, fileNameLots));
      const lotsIPFSResponse = await ipfs.add({
        fileName: fileNameLots,
        fileBuffer: fileBufferLots,
      });
      const { lotsHash, ...otherParams } = this.tender;
      this.setTender({ lotsHash: lotsIPFSResponse.Hash, ...otherParams });
      fs.unlinkSync(path.join(folderPath, 'lots.json'), (err) => { if (err) throw err; });
      await Tender.deploy(
        JSON.parse(JSON.stringify(this.tender)),
        this.account,
        this.publicKey,
        this.privateKey,
      );
      setTimeout(() => {
        this.$router.push({ name: 'home' });
      }, 1000);
    },
    uploadFiles(folderPath) {
      return new Promise(((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
          const evidenceIdx = files.findIndex(e => e === 'evidence');
          if (evidenceIdx >= 0) files.splice(evidenceIdx, 1);
          if (err) reject(err);
          files.forEach(async (file) => {
            const fileName = path.basename(file);
            const fileBuffer = fs.readFileSync(path.join(folderPath, fileName));
            const { Hash } = await ipfs.add({
              fileName,
              fileBuffer,
            });
            const fileIdx = _.findIndex(this.tender.filesList, f => `${f.fileName}` === fileName);
            this.updateFile({
              fileIdx,
              Hash,
            });
          });
          resolve(true);
        });
      }));
    },
  },
  created() {
    if (!this.id) {
      this.createTender();
    }
    // eslint-disable-next-line no-underscore-dangle
    const [tenderToLoad] = this.tenders.filter(t => t._id === this.id);
    this.setTender(tenderToLoad);
  },
};
</script>
