<template>
  <div v-else class="container" id="main">
    <div class="descriptor">
      <div class="description minor-separated">
        <div class="row">
          <div class="col">
            <h5><strong>Licitación {{tenderState.number}}: {{tenderState.name}} </strong></h5>
            <p><a class="active" :href="`https://ropsten.etherscan.io/address/${address}`"
                  target="_blank">{{address}}</a></p>
          </div>
          <div class="col text-right">
            <p class="small-text">Tiempo restante para presentación de ofertas</p>
          </div>
        </div>
      </div>
      <h5 class="minor-separated"><strong>Resumen:</strong></h5>
      <p>{{description}}</p>
      <div class="separated">
        <div class="separated">
          <h5><strong>Estado de la licitación:</strong></h5>
          <div class="row minor-separated">
            <div class="col">
              <ul>
                <li class="inactive" :class="{active: active(date)}"
                    v-for="(date, dateIdx) in tenderState.schedule" :key="`dateIdx-${dateIdx}`"
                    v-if="(dateIdx !== 'bidMaintenanceTerm') && (dateIdx !== 'bidMaintenanceTermType')">
                  {{date | date}} - {{dateIdx | scheduleNames}}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="client==='vendor'" class="row">
            <div v-if="!bid && submittable" class="col">
              <router-link class="btn btn-secondary"
                           :to="{name: 'newBid', params: {tenderAddress: address}}">
                Subir oferta
              </router-link>
            </div>
            <div v-if="bid && submittable" class="col">
              <router-link class="btn btn-secondary" :disabled="!biddingPeriodStatus"
                           :to="{name: 'bid', params: {tenderAddress: address, address: bid._id}}">
                Continuar oferta
              </router-link>
            </div>
          </div>
          <div class="text-center" v-if="client==='tenderer'">
            <button class="btn btn-secondary" @click="getBids">Apertura de ofertas</button>
          </div>
        </div>
      </div>
    </div>
    <h2 v-if="client==='tenderer'">Ofertas actuales</h2>
    <div class="observation" v-for="(bid, bidIdx) in tenderState.bids" :key="`bidIdx-${bidIdx}`">
      <button class="btn btn-link" type="button" @click="loadBid(bidIdx)">
        Oferta: {{bid.address}}
      </button>
    </div>
    <h3 v-if="client==='vendor'" class="separated"><strong>Publique sus comentarios:</strong></h3>
    <div v-if="client==='vendor'" class="descriptor">
      <p class="separated">
        Su participación como ciudadano es clave para observar posibles errores en el proceso de
        licitación y alertar a los responsables de las presuntas irregularidades que podrían
        llegar a ocurrir.
        Con este objetivo se ponen a su disposición los mensajes directos a la entidad licitante y
        el envío de observaciones en las diferentes fases del proyecto.
      </p>
      <div class="container" v-if="sentObservation">
        <h4 class="loading">Enviando transacción...</h4>
      </div>
      <div class="separated">
        <observation-form :type="observationFormTypes.OBSERVATION" @observation="sendObservation"
                          v-if="!sentObservation"/>
      </div>
    </div>
    <h3 class="separated">Observaciones</h3>
    <div class="separated" v-if="observations">
      <observation @response="respondObservation" v-for="(observation, idx) in observations"
                   :observation="observation"
                   :index="idx" :key="idx"/>
    </div>
    <div v-if="winner" class="separated">
      <h3>Oferente ganador <span>{{winner}}</span></h3>
      <div>
        <h3 class="separated">Observaciones sobre el ganador</h3>
        <div class="separated" v-if="winnerObservations">
          <observation @response="respondWinnerObservation"
                       v-for="(observation, idx) in winnerObservations" :observation="observation"
                       :index="idx" :key="idx"/>
        </div>
        <div class="container" v-if="sentWinnerObservation">
          <h4 class="loading">Enviando transacción...</h4>
        </div>
        <div class="separated">
          <observation-form :type="observationFormTypes.OBSERVATION"
                            @observation="sendWinnerObservation"
                            v-if="!sentWinnerObservation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import moment from 'moment';
import path from 'path';
import * as constants from '@/store/constants';
import Tender from '@/handlers/tender';
import Bid from '@/handlers/bid';
import ipfs from '@/handlers/ipfs';
import Observation from '@/components/common/Observation';
import ObservationForm from '@/components/common/ObservationForm';
import BidForm from '@/components/bid/BidForm';
import cipher from '@/helpers/cipher';
import { log } from 'electron-log';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'Detail',
  data() {
    return {
      observationFormTypes: constants.OBSERVATION_FORM_TYPES,
      tender: null,
      observations: [],
      messages: [],
      winnerObservations: [],
      winner: null,
      description: null,
      biddingPeriodStatus: false,
      observation: 'null',
      message: null,
      sentObservation: false,
      sentWinnerObservation: false,
      sentMessage: false,
      vendorBid: null,
    };
  },
  components: {
    Observation,
    ObservationForm,
    BidForm,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      account: state => state.Session.account,
      client: state => state.Session.client,
      privateKey: state => state.Session.privateKey,
      bid: state => state.Bid.bid,
      tenderState: state => state.Tender.tender,
      hiddenAccounts: state => state.Session.hiddenAccounts,
    }),
    submittable() {
      return parseInt(moment()
        .format('X'), 10) >= this.tenderState.schedule.bidsOpening;
    },
    hiddenAccount() {
      return this.hiddenAccounts.filter(ha => ha.tenderAddress === this.address)[0];
    },
  },
  watch: {
    observations() {
      this.sentObservation = false;
    },
    winnerObservations() {
      this.sentWinnerObservation = false;
    },
    messages() {
      this.sentMessage = false;
      this.message = null;
    },
    hiddenAccount() {
      const tender = new Tender(this.address);
      tender.getBidAddress(this.hiddenAccount.address)
        .then(bidAddress => new Bid(bidAddress))
        .then(bid => ([bid, bid.privateKey]))
        .then(promises => Promise.all(promises))
        .then(([bid, privateKey]) => {
          if (privateKey.match(/0x10{62}/)) {
            bid.setPrivateKey(
              this.hiddenAccount.address,
              this.hiddenAccount.privateKey,
              this.hiddenAccount.privateKey,
            );
          }
        });
    },
  },
  methods: {
    ...mapActions({
      loadDraftBids: constants.BID_LOAD_DRAFTS,
      setTender: constants.TENDER_SET_TENDER,
      setBid: constants.BID_SET_BID,
      loadHiddenAccounts: constants.SESSION_GET_HIDDEN_ACCOUNTS,
    }),
    ...mapMutations({
      setScheduleDate: constants.TENDER_SET_SCHEDULE_DATE,
      setTenderProperty: constants.TENDER_SET_TENDER_PROPERTY,
      setBidsProperty: constants.TENDER_SET_BIDS_PROPERTY,
      addBid: constants.TENDER_ADD_BID,
    }),
    active(val) {
      return val >= parseInt(moment()
        .format('X'), 10);
    },
    loadBid(bidIdx) {
      this.setBid(this.tenderState.bids[bidIdx]);
      this.$router.push({
        name: 'bid',
        params: {
          address: this.tenderState.bids[bidIdx].address,
          tenderAddress: this.address,
        },
      });
    },
    async getBids() {
      await this.tender.bids.then((bidsAddresses) => {
        bidsAddresses.forEach(bidAddress => this.addBid({
          address: bidAddress,
          ipfsHash: null,
          data: null,
        }));
        this.tenderState.bids.forEach((bidObject, idx) => {
          const bidInstance = new Bid(bidObject.address);
          bidInstance.getCipherBid()
            .then(bidHash => ipfs.get(bidHash))
            .then(encryptedBid => cipher.decrypt(this.privateKey, encryptedBid))
            .then(async (strBid) => {
              const bid = JSON.parse(strBid);
              bid.enablingCriteria = true;
              bid.sections.forEach((section) => {
                if (section.lot === null) {
                  section.questions.forEach((question) => {
                    if (question.mandatory && question.answer === '') {
                      bid.enablingCriteria = false;
                    }
                  });
                }
              });
              bid.lots.forEach((lot, lIdx) => {
                if (lot.answered) {
                  bid.sections.forEach((section) => {
                    if (section.lot === lIdx) {
                      section.questions.forEach((question) => {
                        if (question.mandatory && question.answer === '') {
                          bid.enablingCriteria = false;
                        }
                      });
                    }
                  });
                  if (lot.priceList.requireAllTheArticles) {
                    lot.priceList.items.forEach((item) => {
                      if (item.answer === '') {
                        bid.enablingCriteria = false;
                      }
                    });
                  }
                }
              });
              this.setBidsProperty({
                idx,
                property: 'data',
                data: bid,
              });
              const filePath = path.join(remote.app.getPath('userData'), constants.FILE_FOLDER, `bid_${idx}.json`);
              fs.writeFileSync(
                filePath,
                JSON.stringify(bid),
                (err) => {
                  if (err) throw err;
                },
              );
              const fileName = `bid_${idx}.json`;
              const fileBuffer = fs.readFileSync(filePath);
              const { Hash } = await ipfs.add({
                fileName,
                fileBuffer,
              });
              this.setBidsProperty({
                idx,
                property: 'ipfsHash',
                data: Hash,
              });
              fs.unlinkSync(filePath, (err) => { if (err) throw err; });
              await bidInstance.setPlainBid(
                this.account,
                this.privateKey,
                Hash,
              );
              log(idx);
            });
        });
      });
    },
    startAuction() {
      this.tender.startAuction(
        this.account,
        this.privateKey,
      );
      this.biddingPeriodStatus = this.tender.biddingPeriodStatus;
    },
    sendObservation(observation) {
      this.sentObservation = true;
      this.tender.sendObservation(
        this.account,
        this.privateKey,
        observation,
      )
        .then(() => this.getObservations());
    },
    getObservations() {
      this.tender.observations.then((observations) => {
        this.observations = observations;
      });
    },
    respondObservation(response) {
      this.tender.respondObservation(
        this.account,
        this.privateKey,
        response,
      )
        .then(() => this.getObservations());
    },
    sendWinnerObservation(observation) {
      this.sentWinnerObservation = true;
      this.tender.sendWinnerObservation(
        this.account,
        this.privateKey,
        observation,
      )
        .then(() => this.getWinnerObservations());
    },
    getWinnerObservations() {
      this.tender.winnerObservations.then((winnerObservations) => {
        this.winnerObservations = winnerObservations;
      });
    },
    respondWinnerObservation(response) {
      this.tender.respondWinnerObservation(
        this.account,
        this.privateKey,
        response,
      )
        .then(() => this.getWinnerObservations());
    },
  },
  created() {
    this.loadHiddenAccounts();

    const tender = new Tender(this.address, JSON.stringify(this.account)
      .replace('"', '')
      .replace('"', ''));
    tender.schedule.then((data) => {
      const { schedule, ...rest } = this.tenderState;
      this.setTender({ schedule: data, ...rest });
    });
    tender.description.then((description) => {
      this.description = description;
    });
    tender.biddingPeriodStatus.then((state) => {
      this.biddingPeriodStatus = state;
    });
    tender.winner.then((winner) => {
      this.winner = winner;
    });
    tender.tenderer.then((data) => {
      const { tenderer, ...rest } = this.tenderState;
      this.setTender({ tenderer: data, ...rest });
    });
    tender.name.then((data) => {
      const { name, ...rest } = this.tenderState;
      this.setTender({ name: data, ...rest });
    });
    tender.number.then((data) => {
      const { number, ...rest } = this.tenderState;
      this.setTender({ number: data, ...rest });
    });
    tender.basePrice.then((data) => {
      const { basePrice, ...rest } = this.tenderState;
      this.setTender({ basePrice: data, ...rest });
    });
    tender.bidMaintenanceTerm.then((data) => {
      this.setScheduleDate({
        property: 'bidMaintenanceTerm',
        value: data,
      });
    });
    tender.bidMaintenanceTermType.then((data) => {
      this.setScheduleDate({
        property: 'bidMaintenanceTermType',
        value: data,
      });
    });
    tender.questionnaire.then((questionnaireHash) => {
      ipfs.get(questionnaireHash)
        .then((questionnaireObject) => {
          const { questionnaire, ...rest } = this.tenderState;
          this.setTender({ questionnaire: questionnaireObject, ...rest });
        });
    });
    tender.lots.then((lotsHash) => {
      ipfs.get(lotsHash)
        .then((lotsObject) => {
          const { lots, ...rest } = this.tenderState;
          this.setTender({ lots: lotsObject, ...rest });
        });
    });
    tender.publicKey.then((data) => {
      const { publicKey, ...rest } = this.tenderState;
      this.setTender({ publicKey: data, ...rest });
    });
    this.tender = tender;
    this.getObservations();
    this.getWinnerObservations();
    this.loadDraftBids(this.address);
  },
};
</script>
