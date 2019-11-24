<template>
  <div>
    <div class="row tender-form-head">
      <div class="col">
        <ul class="nav nav-tabs separated">
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'generalInfo'}"
                    @click="active = 'generalInfo'">
              Información general
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'schedule'}"
                    @click="active = 'schedule'">
              Cronograma
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'questionnaire'}"
                    @click="active = 'questionnaire'">
              Cuestionario
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'lot'}"
                    @click="active = 'lot'">
              Lotes
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'documents'}"
                    @click="active = 'documents'">
              Documentos
            </button>
          </li>
        </ul>
      </div>
      <div class="col-3">
        <button class="btn btn-secondary" @click="saveTenderDraft">
          Guardar
        </button>
        <button class="btn btn-secondary" @click="sendTenderDraft">
          Publicar
        </button>
      </div>
    </div>
    {{tender}}
    <div class="tender-form-content">
      <general-info v-if="active === 'generalInfo'"/>
      <schedule v-else-if="active === 'schedule'"/>
      <questionnaire v-else-if="active === 'questionnaire'"/>
      <lot v-else-if="active === 'lot'"/>
      <documents v-else-if="active === 'documents'"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import GeneralInfo from '@/components/tender/form/GeneralInfo';
import Schedule from '@/components/tender/form/Schedule';
import Questionnaire from '@/components/tender/form/Questionnaire';
import Lot from '@/components/tender/form/Lot';
import Documents from '@/components/tender/form/Documents';
import path from 'path';
import ipfs from '@/handlers/ipfs';
import _ from 'lodash';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'TenderForm',
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      active: 'generalInfo',
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
    }),
    saveTenderDraft() {
      this.saveTender(this.tender);
    },
    sendTenderDraft() {
      // eslint-disable-next-line no-underscore-dangle
      const folderPath = path.join(remote.app.getPath('userData'), constants.FILE_FOLDER, this.tender._id);
      fs.readdir(folderPath, (err, files) => {
        if (err) throw err;
        files.forEach(async (file) => {
          const fileName = path.basename(file);
          const fileBuffer = fs.readFileSync(path.join(folderPath, fileName));
          const { Hash } = await ipfs.add({ fileName, fileBuffer });
          const fileIdx = _.findIndex(this.tender.filesList, f => `${f.fileName}` === fileName);
          this.updateFile({ fileIdx, Hash });
        });
      });
      fs.writeFile(path.join(folderPath, 'questionnaire.json'), JSON.stringify(this.tender.questionnaire), (err) => {
        if (err) throw err;
      });
      const fileName = 'questionnaire.json';
      const fileBuffer = fs.readFileSync(path.join(folderPath, fileName));
      ipfs.add({ fileName, fileBuffer })
        .then(({ Hash }) => {
          const { questionnaireHash, ...rest } = this.tender;
          this.setTender({ questionnaireHash: Hash, ...rest });
          fs.unlinkSync(path.join(folderPath, 'questionnaire.json'), (err) => {
            if (err) throw err;
          });
        });
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
