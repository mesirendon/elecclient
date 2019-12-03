<template>
  <div>
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
      <div class="col-3">
        <button class="btn btn-secondary" @click="saveTenderDraft">
          Guardar
        </button>
        <button class="btn btn-secondary" @click="sendTenderToSecop">
          SECOP
        </button>
        <button class="btn btn-secondary" @click="sendTenderDraft">
          Publicar
        </button>
      </div>
    </div>
    <div class="tender-form-content">
      <general-info v-if="active === tags.GENERAL_INFO"/>
      <schedule v-else-if="active === tags.SCHEDULE"/>
      <lot v-else-if="active === tags.LOT"/>
      <questionnaire v-else-if="active === tags.QUESTIONNAIRE" @sectionAdded="saveTenderDraft"/>
      <documents v-else-if="active === tags.DOCUMENTS"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
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
import Secop from '@/helpers/secop';
import { log, error } from 'electron-log';

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
    };
  },
  components: {
    GeneralInfo,
    Schedule,
    Questionnaire,
    Lot,
    Documents,
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
    sendTenderToSecop() {
      const urlProcess = 'https://marketplace-formacion.secop.gov.co/CO1ExternalIntegrationPublicServicesConnect/Connect/ConnectPublicService.svc?wsdl';
      // const urlDocuments = 'https://marketplace-formacion.secop.gov.co/CO1ExternalIntegrationPublicServicesConnect/ConnectFiles/ConnectFilesPublicService.svc?wsdl';
      const secop = new Secop(urlProcess, '700043011_190812102806', 'PJC!J;B{pg');
      secop.sendProcess('CO1.DOC.188059')
        .then(result => log(`Result ---> ${JSON.stringify(result)}`))
        .catch(err => error(`Could not download document ${JSON.stringify(err)}`));
    },
    ...mapMutations({
      updateFile: constants.TENDER_UPDATE_FILE,
      updateEvidenceFile: constants.TENDER_UPDATE_EVIDENCE_FILE,
    }),
    saveTenderDraft() {
      this.saveTender(this.tender);
    },
    async sendTenderDraft() {
      const folderPath = path.join(
        remote.app.getPath('userData'),
        constants.FILE_FOLDER,
        // eslint-disable-next-line no-underscore-dangle
        this.tender._id,
      );
      await this.uploadFiles(folderPath);
      await this.uploadEvidenceFiles(path.join(folderPath, 'evidence'));
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
      this.$router.push({ name: 'home' });
    },
    uploadFiles(folderPath) {
      return new Promise(((resolve) => {
        fs.readdir(folderPath, (err, files) => {
          if (err) throw err;
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
    uploadEvidenceFiles(folderPath) {
      return new Promise(((resolve) => {
        fs.readdir(folderPath, (err, files) => {
          if (err) throw err;
          files.forEach(async (file) => {
            const fileName = path.basename(file);
            const fileNameParts = fileName.split('.');
            fileNameParts.pop();
            const fileNameWoutExt = fileNameParts.join('.');
            const fileBuffer = fs.readFileSync(path.join(folderPath, file));
            const { Hash } = await ipfs.add({
              fileName,
              fileBuffer,
            });
            const lotIdx = _.findIndex(this.tender.lots, lot => `Evidencia_${lot.name.split(' ').join('_')}` === fileNameWoutExt);
            this.updateEvidenceFile({
              lotIdx,
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
