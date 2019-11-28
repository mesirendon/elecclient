<template>
  <div>
    <div class="tender-section-head">
      <div class="descriptor">
        <form @submit.prevent>
          <question text="Nombre del Lote" :type="dataTypes.TEXT" placeholder="Lote 1"
                    v-model="lotName"/>
          <question text="Valor Estimado" :type="dataTypes.NUMBER" placeholder="10000000"
                    v-model="estimatedValue"/>
          <question text="Agregar Lista de Precios" :type="dataTypes.CHECKBOX"
                    v-model="addPriceList"/>
          <div v-if="addPriceListC">
            <div class="descriptor">
              <question text="Título de la Lista de Precios" :type="dataTypes.TEXT"
                        :placeholder="`Propuesta económica ${(lotName && lotName.data) ? lotName.data : 'del lote'}`"
                        v-model="listPriceTitle"/>
              <div class="row">
                <div class="col">
                  <question text="Requerir Todos los Artículos" :type="dataTypes.CHECKBOX"
                            v-model="requireAllTheArticles"/>
                </div>
                <div class="col">
                  <question text="Requerir Evidencias" :type="dataTypes.CHECKBOX"
                            v-model="requireEvidences"/>
                </div>
                <div class="col">
                  <question text="Definir Código UNSPSC" :type="dataTypes.CHECKBOX"
                            v-model="requireUNSPSCCode"/>
                </div>
              </div>
              <div class="row" v-if="requireEvidencesC">
                <div class="col">
                  <question text="Evidencia" :type="dataTypes.FILE" v-model="evidenceFile"/>
                </div>
              </div>
            </div>
            <div class="descriptor">
              <div v-if="itemDefinitionFlag">
                <question text="Código UNSPSC" :type="dataTypes.LIST" :list="unspsc"
                          v-model="itemUnspscCode" v-if="requireUNSPSCCodeC"/>
                <question text="Descripción" :type="dataTypes.TEXT" placeholder="Ítem 1"
                          v-model="itemDescription"/>
                <question text="Cantidad" :type="dataTypes.NUMBER" placeholder="2"
                          v-model="itemAmount"/>
                <question text="Unidad" :type="dataTypes.DROPDOWN" :list="unit" v-model="itemUnit"/>
                <question text="Precio Unitario Estimado" :type="dataTypes.NUMBER"
                          placeholder="2000" v-model="itemEstimatedUnitPrice"/>
                <input type="number" v-model="itemEstimatedTotalPrice" readonly>
              </div>
              <div>
                <button class="btn btn-secondary" type="button"
                        @click="addItemButton">
                  <i class="fas fa-plus-square"></i> Agregar ítem
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="descriptor" v-if="items.length">
          <div v-for="(item, idx) in items" :key="`item-${idx}`">
            <div class="row">
              <div class="col">
                <span class="font-weight-bold">{{idx}}.</span> {{item.itemDescription}}
              </div>
              <div class="col">{{item.itemAmount}} (${{item.itemEstimatedUnitPrice}})</div>
              <div class="col font-weight-bold">${{item.itemEstimatedTotalPrice}}</div>
              <div class="col">
                <button class="btn btn-secondary" type="button" @click="deleteItem(idx)">
                  <i class="fas fa-minus-square"></i> Borrar ítem
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="btn btn-block btn-secondary" type="button" @click="addLotToTender">
            <i class="far fa-plus-square"></i> Agregar lote
          </button>
        </div>
      </div>
    </div>
    <div class="descriptor" v-for="(lot, lotIdx) in lots" :key="`lot-${lotIdx}}`">
      <div class="row">
        <div class="col">
          <h3>{{lotIdx}}. {{lot.name}}</h3>
        </div>
        <div class="col">
          <h4>Precio base: ${{lot.basePrice}}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col">Lista de precios: {{lot.priceList.title}}</div>
      </div>
      <div v-for="(item, itemInLotIdx) in lot.priceList.items" :key="`itemLot-${itemInLotIdx}`">
        <div class="row">
          <div class="col">
            <span class="font-weight-bold">{{itemInLotIdx}}.</span> {{item.itemDescription}}
          </div>
          <div class="col">{{item.itemAmount}} (${{item.itemEstimatedUnitPrice}})</div>
          <div class="col font-weight-bold">${{item.itemEstimatedTotalPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import Question from '@/components/common/form/Question';
import unspsc from '@/helpers/unspsc';
import unit from '@/helpers/unit';
import { log } from 'electron-log';

export default {
  name: 'Lot',
  data() {
    return {
      unspsc,
      unit,
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      lotName: null,
      estimatedValue: null,
      addPriceList: false,
      listPriceTitle: null,
      requireAllTheArticles: false,
      requireEvidences: false,
      requireUNSPSCCode: false,
      evidenceFile: null,
      itemDefinitionFlag: false,
      itemUnspscCode: null,
      itemDescription: null,
      itemAmount: null,
      itemUnit: null,
      itemEstimatedUnitPrice: null,
      items: [],
    };
  },
  components: {
    Question,
  },
  computed: {
    ...mapState({
      lots: state => state.Tender.tender.lots,
    }),
    addPriceListC() { return this.addPriceList && this.addPriceList.data; },
    requireEvidencesC() { return this.requireEvidences && this.requireEvidences.data; },
    requireUNSPSCCodeC() { return this.requireUNSPSCCode && this.requireUNSPSCCode.data; },
    itemEstimatedTotalPrice() {
      if (
        this.itemAmount &&
        this.itemAmount.data &&
        this.itemEstimatedUnitPrice &&
        this.itemEstimatedUnitPrice.data
      ) {
        return this.itemAmount.data * this.itemEstimatedUnitPrice.data;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions({
      setTender: constants.TENDER_SET_TENDER,
    }),
    ...mapMutations({
      addLotToList: constants.TENDER_ADD_LOT,
      deleteLotFromList: constants.TENDER_DELETE_LOT,
    }),
    addItemButton() {
      if (this.itemDefinitionFlag) {
        const item = {
          itemDescription: this.itemDescription.data,
          itemAmount: this.itemAmount.data,
          itemUnit: this.itemUnit.data,
          itemEstimatedUnitPrice: this.itemEstimatedUnitPrice.data,
          itemEstimatedTotalPrice: this.itemEstimatedTotalPrice,
        };
        if (this.requireUNSPSCCodeC) item.itemUnspscCode = this.itemUnspscCode.data;
        this.items.push(item);
        this.itemDefinitionFlag = false;
      } else {
        this.itemUnspscCode = null;
        this.itemDescription = null;
        this.itemAmount = null;
        this.itemUnit = null;
        this.itemEstimatedUnitPrice = null;
        this.itemDefinitionFlag = true;
      }
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
    },
    addLotToTender() {
      const priceList = {
        title: this.listPriceTitle.data,
        requireAllTheArticles: this.requireAllTheArticles.data,
        evidenceFile: this.evidenceFile.data,
        items: this.items,
      };
      const lot = {
        name: this.lotName.data,
        basePrice: this.estimatedValue.data,
        priceList,
      };
      this.addLotToList(lot);
      this.reset();
    },
    deleteLot(idx) {
      log(`Lot index ${idx}`);
      this.deleteLotFromList(idx);
    },
    reset() {
      this.lotName = null;
      this.estimatedValue = null;
      this.addPriceList = false;
      this.listPriceTitle = null;
      this.requireAllTheArticles = false;
      this.requireEvidences = false;
      this.requireUNSPSCCode = false;
      this.evidenceFile = null;
      this.itemDefinitionFlag = false;
      this.itemUnspscCode = null;
      this.itemDescription = null;
      this.itemAmount = null;
      this.itemUnit = null;
      this.itemEstimatedUnitPrice = null;
      this.items = [];
    },
  },
};
</script>
