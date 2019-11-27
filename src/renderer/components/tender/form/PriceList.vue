<template>
  <div>
    <div>
      <question text="Título" :type="dataTypes.TEXT"
                :answer="priceList.title" @change="savePriceListTitle"/>
      <question text="Requerir todos los artículos" :type="dataTypes.BOOLEAN"
                :answer="priceList.allItemsRequired" @change="savePriceListAllItemsRequired"/>
      <question text="Requerir evidencias" :type="dataTypes.BOOLEAN"
                :answer="priceList.requireEvidence" @change="savePriceListRequireEvidence"/>
      <question v-if="priceList.requireEvidence" text="Evidencia (archivo)"
                :type="dataTypes.FILE" :answer="priceList.evidenceFile"
                @change="savePriceListEvidenceFile"/>
      <question text="Definir código UNSPSC" :type="dataTypes.BOOLEAN"
                :answer="priceList.defineUnspscCode" @change="savePriceListDefineUnspscCode"/>
      <div v-if="addPriceListItemFlag">
        <form @submit.prevent>
          <question v-if="priceList.defineUnspscCode" :type="dataTypes.LIST"
                    text="Código UNSPSC" :list="unspsc"
                    :answer="priceListItem.unspscCode"
                    @change="savePriceListItemUnspscCode"/>
          <question text="Descripción" :type="dataTypes.TEXT_AREA"
                :answer="priceListItem.description" @change="savePriceListItemDescription"/>
          <question text="Cantidad" :type="dataTypes.NUMBER"
                    :answer="priceListItem.quantity" @change="savePriceListItemQuantity"/>
          <question text="Unidad" :list="unit" :type="dataTypes.DROPDOWN"
                    :answer="priceListItem.unit" @change="savePriceListItemUnit"/>
          <question text="Precio unitario estimado" :type="dataTypes.NUMBER"
                    :answer="priceListItem.estimatedUnitaryPrice"
                    @change="savePriceListItemEstimatedUnitaryPrice"/>
          <div class="form-group row">
            <label class="col-form-label col-6" for="estimatedTotalPrice">Precio total estimado</label>
            <div class="col-6">
              <input class="form-control" id="estimatedTotalPrice" type="number"
                     v-model="priceListItem.estimatedTotalPrice">
            </div>
          </div>
          <div class="col-4">
            <button class="btn btn-secondary" @click="addPriceListItem">Agregar artículo</button>
          </div>
        </form>
      </div>
      <div class="minor-separated" v-else>
        <button class="btn btn-secondary" @click="addPriceListItemFlag = true">
          <i class="fas fa-plus"></i> Agregar artículo
        </button>
      </div>
      {{priceListItems}}
      <div v-for="(item, idx) in priceListItems">
        <div class="form-group row">
          <p class="col-1">{{idx+1}}. </p>
          <p v-if="item.unspscCode" class="col-2">{{item.unspscCode}}</p>
          <p class="col">{{item.description}}</p>
          <p class="col">{{item.quantity}} x ${{item.estimatedUnitaryPrice}}
            = ${{item.estimatedTotalPrice}}</p>
          <div class="col-1">
            <button class="btn btn-secondary" @click="deletePriceListItem(idx)">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as constants from '@/store/constants';
  import Question from '@/components/tender/form/Question';
  import unit from '@/helpers/unit';
  import unspsc from '@/helpers/unspsc';
  import { log } from 'electron-log';

  export default {
    name: 'PriceList',
    data() {
      return {
        dataTypes: constants.TENDER_BASE_DATA_TYPES,
        priceListItem: constants.TENDER_BASE_PRICE_LIST_ITEM,
        priceList: constants.TENDER_BASE_PRICE_LIST,
        addPriceListItemFlag: false,
        unit,
        unspsc,
      };
    },
    components: {
      Question,
    },
    props: {
      priceListItems: {
        type: Array,
        required: false,
      },
    },
    methods: {
      addPriceListItem() {
        this.priceListItems.push(this.priceListItem);
        this.resetPriceListItem();
      },
      deletePriceListItem(idx) {
        this.priceListItems.splice(idx, 1);
      },
      resetPriceListItem() {
        this.priceListItem = { ...constants.TENDER_BASE_PRICE_LIST_ITEM };
        log(constants.TENDER_BASE_PRICE_LIST_ITEM);
        log(this.priceListItem);
        this.addPriceListItemFlag = false;
      },
      savePriceListTitle(data) {
        this.priceList.title = data;
      },
      savePriceListAllItemsRequired(data) {
        this.priceList.allItemsRequired = data;
      },
      savePriceListRequireEvidence(data) {
        this.priceList.requireEvidence = data;
      },
      savePriceListEvidenceFile(data) {
        this.priceList.evidenceFile = data;
      },
      savePriceListDefineUnspscCode(data) {
        this.priceList.defineUnspscCode = data;
      },
      savePriceListItemUnspscCode(data) {
        this.priceListItem.unspscCode = data;
      },
      savePriceListItemDescription(data) {
        this.priceListItem.description = data;
      },
      savePriceListItemQuantity(data) {
        this.priceListItem.quantity = data;
        this.savePriceListItemEstimatedTotalPrice();
      },
      savePriceListItemUnit(data) {
        this.priceListItem.unit = data;
      },
      savePriceListItemEstimatedUnitaryPrice(data) {
        this.priceListItem.estimatedUnitaryPrice = data;
        this.savePriceListItemEstimatedTotalPrice();
      },
      savePriceListItemEstimatedTotalPrice() {
        this.priceListItem.estimatedTotalPrice = this.priceListItem.estimatedUnitaryPrice
          * this.priceListItem.quantity;
      },
    },
  };
</script>
