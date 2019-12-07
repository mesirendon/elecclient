<template>
  <div id="main">
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
          <h5 class="subtitle text-center">{{tender.schedule.bidMaintenanceTerm}}
            {{tender.schedule.bidMaintenanceTermType}}</h5>
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
      <div v-for="(lot, lidx) in tender.lots">
        <question :key="`${lidx}`" :text="lot.name" :type="dataTypes.CHECKBOX" @change="saveLot(lidx, $event)"
                  :answer="bid.lots[lidx].answered"/>
        <div v-if="bid.lots[lidx].answered">
          <div class="row">
            <div class="col">
              <p>PriceList</p>
            </div>
            <div class="col">
              <p>{{lot.priceList.title}}</p>
            </div>
          </div>
          <question v-for="(item, iIdx) in lot.priceList.items" :text="item.itemDescription" :type="dataTypes.NUMBER"
                    @change="saveItem(lidx , iIdx, $event)" :answer="bid.lots[lidx].priceList.items[iIdx].answer"
                    :key="`l${lidx}-i${iIdx}`"/>
        </div>
      </div>
      <div v-if="showSection(section.lot)" v-for="(section, sidx) in tender.questionnaire">
        <p class="font-weight-bold">{{section.name}}</p>
        <question v-for="(question, qidx) in section.questions" :key="`s${sidx}-q${qidx}`"
                  :text="question.text" :type="question.type"
                  :required="question.mandatory" @change="saveData($event, sidx, qidx)"
                  :answer="bid.sections[sidx].questions[qidx].answer"/>
      </div>
    </div>
    <div class="row">
      <div class="col-2 offset-4">
        <button class="btn btn-primary" @click="saveBidDraft">Guardar oferta</button>
      </div>
      <div class="col-2">
        <button class="btn btn-primary" @click="sendBidDraft">Finalizar oferta</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import Question from '@/components/common/form/Question';
import * as constants from '@/store/constants';
import path from 'path';
import ipfs from '@/handlers/ipfs';
import cipher from '@/helpers/cipher.js';
import Bid from '@/handlers/bid';

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
      account: state => state.Session.account,
      privateKey: state => state.Session.privateKey,
      publicKey: state => state.Session.publicKey,
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
      setBidAnswered: constants.BID_SET_ANSWERED_LOT,
      setBidItem: constants.BID_SET_ITEM,
    }),
    showSection(lIdx) {
      if (this.bid && lIdx === null) {
        return true;
      } else if (this.bid.lots[lIdx].answered === true) {
        return true;
      }
      return false;
    },
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
      if (fs.existsSync(folderPath)) await this.uploadEncryptedFiles(folderPath);
      // eslint-disable-next-line no-underscore-dangle
      else fs.mkdirSync(folderPath);
      const cipherBid = await cipher.encrypt(
        this.tender.publicKey,
        JSON.stringify(this.bid),
      );
      fs.writeFileSync(
        path.join(folderPath, 'cipher_bid.json'),
        JSON.stringify(cipherBid),
        (err) => {
          if (err) throw err;
        },
      );
      const fileNameCipher = 'cipher_bid.json';
      const fileBufferCipher = fs.readFileSync(path.join(folderPath, fileNameCipher));
      const { Hash } = await ipfs.add({
        fileName: fileNameCipher,
        fileBuffer: fileBufferCipher,
      });
      const { bidHash, ...rest } = this.bid;
      this.setBid({ bidHash: Hash, ...rest });
      fs.unlinkSync(path.join(folderPath, 'cipher_bid.json'));
      await Bid.deploy(
        this.bid.bidHash,
        this.tender.tenderer,
        this.tenderAddress,
        this.account,
        this.publicKey,
        this.privateKey,
      );
      this.$router.push({ name: 'home' });
    },
    uploadEncryptedFiles(folderPath) {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
          const fileName = path.basename(file);
          const fileBuffer = fs.readFileSync(path.join(folderPath, fileName));
          cipher.encrypt(this.tender.publicKey, fileBuffer)
            .then(async (cipherText) => {
              fs.writeFileSync(path.join(folderPath, `cipher_${fileName}.json`), JSON.stringify(cipherText));
              const fileNameCipher = `cipher_${fileName}.json`;
              const fileBufferCipher = fs.readFileSync(path.join(folderPath, fileNameCipher));
              const { Hash } = await ipfs.add({
                fileName: fileNameCipher,
                fileBuffer: fileBufferCipher,
              });
              fs.unlinkSync(path.join(folderPath, `cipher_${fileName}.json`));
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
              resolve(Hash);
            })
            .catch(reject);
        });
      });
    },
    saveItem(lIdx, iIdx, val) {
      this.setBidItem({
        lIdx,
        iIdx,
        val,
      });
    },
    saveLot(lIdx, val) {
      this.setBidAnswered({
        lIdx,
        val,
      });
    },
    generateSections() {
      return this.tender.questionnaire
        .map((section) => {
          const questions = section.questions
            .map(question => ({
              name: question.text,
              answer: '',
            }));
          return {
            name: section.name,
            lot: section.lot,
            questions,
          };
        });
    },
    generateLots() {
      return this.tender.lots
        .map((lot) => {
          const items = lot.priceList.items
            .map(item => ({
              itemDescription: item.itemDescription,
              itemAmount: item.itemAmount,
              itemUnit: item.itemUnit,
              itemEstimatedUnitPrice: item.itemEstimatedUnitPrice,
              itemEstimatedTotalPrice: item.itemEstimatedTotalPrice,
              itemUnspscCode: item.itemUnspscCode,
              answer: null,
            }));
          return {
            name: lot.name,
            basePrice: lot.basePrice,
            answered: false,
            priceList: {
              title: lot.priceList.title,
              requireAllTheArticles: lot.priceList.requireAllTheArticles,
              evidenceFile: null,
              items,
            },
          };
        });
    },
  },
  async created() {
    if (!this.id) {
      this.createBid({
        tenderAddress: this.tenderAddress,
        sections: this.generateSections(),
        lots: this.generateLots(),
      });
    }
  },
};
</script>
