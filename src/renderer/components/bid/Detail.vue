<template>
  <div>
    <div v-if="requestPrivateKey">
      <h1><i class="fas fa-lock"></i> Oferta encriptada</h1>
      <div class="row">
        <div class="col">
          <h3 class="text-break text-monospace" v-if="cipherBid && cipherBid.ciphertext">
            {{cipherBid.ciphertext.substr(0,140)}}...</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-block btn-primary" type="button"
                  @click="requestPrivateKeyFromVendor">
            <i class="fas fa-key"></i> Solicitar llave de desencripción al proveedor
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="privateKeyRequested">
      <h1><i class="fas fa-user-lock"></i> Llave solicitada</h1>
      <p>La llave ha sido solicitada al proveedor. Una vez el proveedor haya revelado la clave, la
        oferta se revelará públicamente.</p>
    </div>
    <div v-else-if="plainBid">
      <h1>
        <a :href="`https://ropsten.etherscan.io/address/${address}`" target="_blank" class="active">
          {{address}}
        </a>
      </h1>
      <div class="descriptor">
        <div class="row" v-if="verifiedVendor">
          <div class="col">
            <h3 class="text-success">
              <i class="fas fa-user-shield"></i> Proveedor verificado
            </h3>
          </div>
          <div class="col-3" v-if="showOpenBidPublicly">
            <button class="btn btn-success" type="button" @click="openBidPublicly">
              <i class="fas fa-share-square"></i> Abrir oferta públicamente
            </button>
          </div>
        </div>
        <div class="row" v-else>
          <h3 class="text-danger">
            <i class="fas fa-user-ninja"></i> Proveedor no verificado
          </h3>
        </div>
      </div>
      <div class='descriptor'>
        <h3 class="minor-separated">Resultado de los criterios habilitantes</h3>
        <h5 v-if='enablingCriteria'>
          La oferta cumple con los criterios habilitantes de la licitación
        </h5>
        <h5 v-else>
          La oferta <strong>no</strong> cumple con los criterios habilitantes de la licitación
        </h5>
      </div>
      <h2>Respuestas a cuestionario</h2>
      <div class="descriptor" v-for="(section, sectionIdx) in plainBid.sections"
           v-if="showLot(section.lot)" :key="`sectionIdx-${sectionIdx}`">
        <h2>{{section.name}}</h2>
        <h3 v-if="section.lot !== null">Sección asociada al lote {{section.lot | idx}}</h3>
        <div class="row" v-for="(question, questionIdx) in section.questions"
             :key="`questionIdx-${questionIdx}`">
          <div class="col">{{question.name}}</div>
          <div class="col">{{question.answer}}</div>
        </div>
      </div>
      <div v-if="plainBid.lots.length">
        <h2>Lotes</h2>
        <div class="descriptor" v-for="(lot, lotIdx) in plainBid.lots" :key="`lotIdx-${lotIdx}`"
             v-if="lot.answered">
          <h3>{{lot.name}}</h3>
          <div class="row">
            <div class="col">
              Precio base: ${{lot.basePrice | price}}
            </div>
            <div class="col">
              Lista de precios: {{lot.priceList.title}}
            </div>
          </div>
          <h4>Items</h4>
          <div class="row descriptor" v-for="(item, itemIdx) in lot.priceList.items"
               :key="`itemIdx-${lotIdx}-${itemIdx}`">
            <div class="col"> Descripción: {{item.itemDescription}}</div>
            <div class="col"> Cantidad: {{item.itemAmount}}</div>
            <div class="col"> Unidad: {{item.itemUnit}}</div>
            <div class="col"> Precio estimado: {{item.itemEstimatedUnitPrice}}</div>
            <div class="col"> Respuesta: {{item.answer}}</div>
          </div>
        </div>
      </div>
      <div class="descriptor" v-if="client==='vendor'">
        <h3><strong>Comentarios:</strong></h3>
        <p>
          Su participación como ciudadano es clave para observar posibles errores en el proceso de
          licitación y alertar a los responsables de las presuntas irregularidades que podrían
          llegar a ocurrir.
          Con este objetivo se pone a su disposición el envío de observaciones relacionadas a esta
          oferta.
        </p>
        <h3 class="separated">Observaciones</h3>
        <div class="separated" v-if="observations">
          <observation @response="respondObservation" v-for="(observation, idx) in observations"
                       :observation="observation" :index="idx" :key="idx"/>
        </div>
        <div class="container" v-if="sentObservation">
          <h4 class="loading">Enviando transacción...</h4>
        </div>
        <div class="separated">
          <observation-form :type="observationType" @observation="sendObservation"
                            v-if="!sentObservation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ipfs from '@/handlers/ipfs';
import Bid from '@/handlers/bid';
import Tender from '@/handlers/tender';
import Observation from '@/components/common/Observation';
import ObservationForm from '@/components/common/ObservationForm';
import cipher from '@/helpers/cipher';
import { log } from 'electron-log';

export default {
  name: 'Detail',
  props: {
    address: {
      type: String,
      required: true,
    },
    tenderAddress: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      observationType: 'observación',
      observations: [],
      sentObservation: false,
      enabled: true,
      tender: null,
      requestPrivateKey: true,
      privateKeyRequested: true,
      bidPrivateKey: null,
      cipherBid: {
        ciphertext: null,
      },
      plainBid: null,
      bid: null,
      showOpenBidPublicly: true,
    };
  },
  computed: {
    ...mapState({
      account: state => state.Session.account,
      client: state => state.Session.client,
      privateKey: state => state.Session.privateKey,
    }),
    verifiedVendor() {
      if (this.plainBid) {
        return this.plainBid.vendor === this.$web3.eth.accounts
          .recover(this.tenderAddress, this.plainBid.signature);
      }
      return false;
    },
    enablingCriteria() {
      let answer = true;
      this.plainBid.sections.forEach((section) => {
        section.questions.forEach((question) => {
          if (question.mandatory && !question.answer) {
            answer = false;
          }
        });
      });
      return answer;
    },
  },
  watch: {
    observations() {
      this.sentObservation = false;
    },
    cipherBid() {
      if (this.bidPrivateKey) return this.decrypt();
      return false;
    },
    bidPrivateKey() {
      if (this.cipherBid) return this.decrypt();
      return false;
    },
  },
  methods: {
    openBidPublicly() {
      const plainBidOffering = { ...this.plainBid };
      plainBidOffering.enabledByEvaluationFirstPhase = this.enablingCriteria;
      const fileBuffer = Buffer.from(JSON.stringify(plainBidOffering));
      ipfs.add({
        fileName: `Bid: ${this.address}.json`,
        fileBuffer,
      })
        .then(({ Hash }) => this.bid.setPlainBid(
          this.account,
          this.privateKey,
          Hash,
        ))
        .then(() => {
          this.$router.push({ name: 'home' });
        });
    },
    decrypt() {
      return cipher.decrypt(this.bidPrivateKey, this.cipherBid)
        .then((plainBid) => {
          this.plainBid = JSON.parse(plainBid);
        });
    },
    requestPrivateKeyFromVendor() {
      this.bid.setPrivateKey(
        this.account,
        this.privateKey,
        `0x1${'0'.repeat(63)}`,
      )
        .then(() => {
          this.$router.push({
            name: 'redirect',
            params: {
              name: 'bid',
              delay: 0,
            },
            query: {
              address: this.address,
              tenderAddress: this.tenderAddress,
            },
          });
        });
    },
    sendObservation(observation) {
      this.sentObservation = true;
      this.bid.sendObservation(
        this.account,
        this.privateKey,
        observation,
      )
        .then(() => this.getObservations());
    },
    getObservations() {
      this.bid.observations.then((observations) => {
        this.observations = observations;
      });
    },
    respondObservation(response) {
      this.bid.respondObservation(
        this.account,
        this.privateKey,
        response,
      )
        .then(() => this.getObservations());
    },
    showLot(lotIdx) {
      if (lotIdx === null) {
        return true;
      } else if (this.plainBid.lots[lotIdx].answered === true) {
        return true;
      }
      return false;
    },
  },
  components: {
    Observation,
    ObservationForm,
  },
  created() {
    this.tender = new Tender(this.tenderAddress);
    const bid = new Bid(this.address);
    bid.cipherBid
      .then(ipfs.get)
      .then((cipherBid) => {
        this.cipherBid = cipherBid;
      });
    bid.privateKey
      .then((privateKey) => {
        this.requestPrivateKey = !!privateKey.match(/0x0{63}/);
        this.privateKeyRequested = !!privateKey.match(/0x10{62}/);
        this.bidPrivateKey = privateKey;
      });
    bid.plainBid
      .then((hash) => {
        log(hash);
        if (hash) this.showOpenBidPublicly = false;
      });
    this.bid = bid;
  },
};
</script>
