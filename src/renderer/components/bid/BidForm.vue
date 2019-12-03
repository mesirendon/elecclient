<template>
  <div id="main">
    {{tender.questionnaire}}
    --------------------------------------------------------------------------------
    {{bid}}
    <p class="font-weight-bold">TENDER {{tender.number}}: {{tender.name}}</p>
    <div class="descriptor">
      <div class="row">
        <div class="col">
          <h5 class="title text-center">Contratante</h5>
        </div>
        <div class="col">
          <h5 class="title text-center">Precio del contrato</h5>
        </div>
        <div class="col">
          <h5 class="title text-center">Duracion del contrato</h5>
        </div>
        <div class="col">
          <h5 class="title text-center">Tipo del proceso</h5>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5 class="subtitle text-center">Alcaldia de Medallo</h5>
        </div>
        <div class="col">
          <h5 class="subtitle text-center">{{tender.basePrice}}</h5>
        </div>
        <div class="col">
          <h5 class="subtitle text-center">{{tender.schedule.duration}}
            {{tender.schedule.durationType}}</h5>
        </div>
        <div class="col">
          <h5 class="subtitle text-center">Licitación Pública</h5>
        </div>
      </div>
    </div>
    <p class="font-weight-bold">Lista de criterios requeridos</p>
    <div class="descriptor">
      <div class="row">
        <div class="col-6">
          <p>Toda la información subida a la plataforma es confidencial, solo la procuraduría
            general tendrá acceso a estos
            documentos . Posteriormente, estos documentos serán públicos para comentarios de
            ciudadanos y vendors una vez
            se realice la apertura de sobres oficial.</p>
        </div>
      </div>
      <div v-if="bid" v-for="(section, sidx) in tender.questionnaire">
        <p class="font-weight-bold">{{section.name}}</p>
        <question v-for="(question, qidx) in section.questions" :key="`s${sidx}-q${qidx}`"
                  :text="question.text" :type="question.type"
                  :required="question.mandatory" @change="saveData($event, sidx, qidx)"
                  :answer="bid.sections[sidx].questions[qidx].answer"/>
      </div>
    </div>
    <div class="row">
      <div class="col-2 offset-4">
        <button class="btn btn-primary" @click="saveBidDraft">Guardar proceso</button>
      </div>
      <div class="col-2">
        <button class="btn btn-primary" @click="sendBidDraft" >Finalizar Oferta</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import Question from '@/components/common/form/Question';
import * as constants from '@/store/constants';
import Tender from '@/handlers/tender';
import path from 'path';
import ipfs from '@/handlers/ipfs';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'BidForm',
  props: {
    id: {
      type: String,
      required: false,
    },
    tenderAddress: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      questionnaire: null,
    };
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      bid: state => state.Bid.bid,
    }),
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions({
      createBid: constants.BID_SAVE_DRAFT,
      saveBid: constants.BID_UPDATE_DRAFT,
      setBid: constants.BID_SET_BID,
    }),
    ...mapMutations({
      updateFile: constants.BID_UPDATE_FILE,
    }),
    saveBidDraft() {
      this.saveBid(this.bid);
    },
    saveData(data, sIdx, qIdx) {
      const { sections, ...rest } = this.bid;
      const { questions, ...sName } = sections[sIdx];
      const { name } = questions[qIdx];
      questions[qIdx] = {
        name,
        answer: data,
      };
      sections[sIdx] = { questions, ...sName };
      this.setBid({
        ...rest,
        sections,
      });
    },
    async sendBidDraft() {
      const folderPath = path.join(
        remote.app.getPath('userData'),
        constants.FILE_FOLDER,
        // eslint-disable-next-line no-underscore-dangle
        this.bid._id,
      );
      await this.uploadFiles(folderPath);
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
            this.bid.sections.forEach((section, sIdx) => {
              section.questions.forEach((question, qIdx) => {
                const questionName = question.name.split(' ').join('_');
                const extension = fileName.split('.').pop();
                if (`${questionName}.${extension}` === fileName) {
                  this.updateFile({
                    sIdx,
                    qIdx,
                    Hash,
                  });
                }
              });
            });
          });
          resolve(true);
        });
      }));
    },
    generateBid() {
      return this.tender.questionnaire
        .map((section) => {
          const questions = section.questions
            .map(question => ({
              name: question.text,
              answer: '',
            }));
          return {
            name: section.name,
            questions,
          };
        });
    },
  },
  async created() {
    if (!this.id) {
      this.createBid({
        tenderAddress: this.tenderAddress,
        sections: this.generateBid(),
      });
    }
    if (this.tenderAddress) {
      const tender = new Tender(this.tenderHandler);
      this.questionnaire = await tender.questionnaire;
    }
  },
};
</script>
