<template>
  <div id="main" class="full-height">
    <loader v-if="loading"/>
    <div v-else>
      <h1>{{tender.name}} - Número: {{tender.number}}</h1>
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
            <h5 class="subtitle text-center">Alcaldia de Medellín</h5>
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
      <h2>Lotes</h2>
      <div class="descriptor">
        <div class="row">
          <div class="col">
            <p class="font-weight-bold">Lista de criterios requeridos</p>
            <p>Toda la información subida a la plataforma es confidencial, solo la procuraduría
              general tendrá acceso a estos
              documentos . Posteriormente, estos documentos serán públicos para comentarios de
              ciudadanos y vendors una vez
              se realice la apertura de sobres oficial.</p>
          </div>
        </div>
        <div v-for="(lot, lIdx) in tender.lots" v-if="tender.lots.length">
          <question class="font-weight-bold" :key="`${lIdx}`" :text="lot.name"
                    :type="dataTypes.CHECKBOX" @change="saveLot(lIdx, $event)"
                    :answer="bid.lots[lIdx].answered"/>
          <div v-if="bid.lots.length && bid.lots[lIdx].answered">
            <div class="row">
              <div class="col">
                Lista de precios: <span class="font-italic">{{lot.priceList.title}}</span>
              </div>
            </div>
            <question v-for="(item, iIdx) in lot.priceList.items" :text="item.itemDescription"
                      :type="dataTypes.NUMBER"
                      @change="saveItem(lIdx , iIdx, $event)"
                      :answer="bid.lots[lIdx].priceList.items[iIdx].answer"
                      :key="`l${lIdx}-i${iIdx}`"/>
          </div>
        </div>
      </div>
      <h2>Cuestionario</h2>
      <div class="descriptor">
        <div v-if="showSection(section.lot)" v-for="(section, sidx) in tender.questionnaire">
          <p class="font-weight-bold">{{section.name}}</p>
          <question v-for="(question, qidx) in section.questions" :key="`s${sidx}-q${qidx}`"
                    :text="question.text" :type="question.type"
                    :loaderType="fileLoaderTypes.ENCRIPTED_IPFS"
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
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import Question from '@/components/common/form/Question';
import Loader from '@/components/common/Loader';
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
      loading: false,
      fileLoaderTypes: constants.FILE_LOADER_TYPES,
    };
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      bid: state => state.Bid.bid,
      hiddenAccounts: state => state.Session.hiddenAccounts,
    }),
    hiddenAccount() {
      return this.hiddenAccounts
        .filter(hiddenAccount => hiddenAccount.tenderAddress === this.tenderAddress)[0];
    },
  },
  components: {
    Question,
    Loader,
  },
  methods: {
    ...mapActions({
      generateHiddenAccount: constants.SESSION_GENERATE_HIDDEN_ACCOUNT,
      createBid: constants.BID_SAVE_DRAFT,
      saveBid: constants.BID_UPDATE_DRAFT,
      setBid: constants.BID_SET_BID,
      getHiddenAccounts: constants.SESSION_GET_HIDDEN_ACCOUNTS,
    }),
    ...mapMutations({
      updateFile: constants.BID_UPDATE_FILE,
      setBidAnswered: constants.BID_SET_ANSWERED_LOT,
      setBidItem: constants.BID_SET_ITEM,
      setBidsProperty: constants.BID_SET_PROPERTY,
    }),
    setLoaderMessage(msg) {
      this.setBidsProperty({
        property: 'message',
        value: msg,
      });
    },
    setLoaderProgress(progress) {
      this.setBidsProperty({
        property: 'progress',
        value: progress,
      });
    },
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
      const { ...qRest } = questions[qIdx];
      questions[qIdx] = {
        ...qRest,
        answer: data,
      };
      sections[sIdx] = { questions, ...sName };
      this.setBid({
        ...rest,
        sections,
      });
    },
    async sendBidDraft() {
      this.loading = true;
      this.setLoaderMessage('Encriptando oferta');
      this.setLoaderProgress(10);
      const folderPath = path.join(
        remote.app.getPath('userData'),
        constants.FILE_FOLDER,
      );
      const cipherBid = await cipher.encrypt(
        this.hiddenAccount.publicKey,
        JSON.stringify(this.bid),
      );
      fs.writeFileSync(
        path.join(folderPath, 'cipher_bid.json'),
        JSON.stringify(cipherBid),
        (err) => {
          if (err) throw err;
        },
      );
      this.setLoaderMessage('Distribuyendo oferta encriptada');
      this.setLoaderProgress(40);
      const fileNameCipher = 'cipher_bid.json';
      const fileBufferCipher = fs.readFileSync(path.join(folderPath, fileNameCipher));
      const { Hash } = await ipfs.add({
        fileName: fileNameCipher,
        fileBuffer: fileBufferCipher,
      });
      const { bidHash, ...rest } = this.bid;
      this.setBid({ bidHash: Hash, ...rest });
      fs.unlinkSync(path.join(folderPath, 'cipher_bid.json'));
      this.setLoaderMessage('Publicando oferta en cadena de bloques');
      this.setLoaderProgress(50);
      await Bid.deploy(
        this.bid.bidHash,
        this.tender.tenderer,
        this.tenderAddress,
        this.hiddenAccount.address,
        this.hiddenAccount.publicKey,
        this.hiddenAccount.privateKey,
      );
      this.setLoaderMessage('Finalizando');
      this.setLoaderProgress(100);
      setTimeout(() => {
        this.$router.push({ name: 'home' });
      }, 1000);
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
              type: question.type,
              mandatory: question.mandatory,
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
  created() {
    if (!this.id) {
      this.generateHiddenAccount(this.tenderAddress);
      this.createBid({
        tenderAddress: this.tenderAddress,
        sections: this.generateSections(),
        lots: this.generateLots(),
      });
    }
    this.getHiddenAccounts();
  },
};
</script>
