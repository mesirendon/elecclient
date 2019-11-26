<template>
  <div>
    <div class="descriptor">
      <question text="Título" :type="dataTypes.TEXT"/>
      <question text="Requerir todos los artículos" :type="dataTypes.BOOLEAN"/>
      <question text="Requerir evidencias" :type="dataTypes.BOOLEAN"/>
      <question text="Evidencia (archivo)" :type="dataTypes.FILE"/>
      <question text="Definir código UNSPSC" :type="dataTypes.BOOLEAN"/>
      <div v-if="addPriceListItemFlag">
        <form @submit.prevent>
          <question text="Descripción" :type="dataTypes.TEXT_AREA"/>
          <question text="Cantidad" :type="dataTypes.TEXT"/>
          <question text="Unidad" :list="unit" :type="dataTypes.DROPDOWN"/>
          <question text="Precio unitario estimado" :type="dataTypes.NUMBER"/>
          <question text="Precio total estimado" :type="dataTypes.NUMBER"/>
          <div class="col-2">
            <button class="btn btn-secondary" @click="addPriceListItem">Agregar</button>
          </div>
          <question text="Precio total estimado" :type="dataTypes.NUMBER"/>
        </form>
      </div>
      <div class="minor-separated" v-else>
        <button class="btn btn-secondary" @click="addPriceListItemFlag = true">
          <i class="fas fa-plus"></i> Agregar artículo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import * as constants from '@/store/constants';
  import Question from '@/components/tender/form/Question';
  import unit from '@/helpers/unit';

  export default {
    name: 'PriceList',
    data() {
      return {
        dataTypes: constants.TENDER_BASE_DATA_TYPES,
        addPriceListItemFlag: false,
        items: [],
        unit,
      };
    },
    components: {
      Question,
    },
    computed: {
      ...mapState({
        tender: state => state.Tender.tender,
      }),
    },
    methods: {
      ...mapActions({
        setTender: constants.TENDER_SET_TENDER,
      }),
      ...mapMutations({
        addLotToList: constants.TENDER_ADD_LOT,
        deleteLotFromList: constants.TENDER_DELETE_LOT,
      }),
      addPriceListItem() {
        const priceListItem = {
          unspsc: null,
          description: '',
          quantity: 0,
          unitPrice: 0,
          totalItemPrice: 0,
          unit: null,
        };
        this.addItemToPriceList(priceListItem);
        this.reset();
      },
      deletePriceListItem(idx) {
        this.deleteItemFromPriceList(idx);
      },
      reset() {
        this.newLotName = null;
        this.newLotBasePrice = null;
        this.addLotFormFlag = false;
      },
    },
  };
</script>
