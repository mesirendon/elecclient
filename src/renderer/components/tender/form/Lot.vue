<template>
  <div>
    <h2>Lotes</h2>

    <div class="tender-section-head">
      <div class="descriptor">
        <question text="Definir lotes" :type="dataTypes.BOOLEAN"
                  :answer="tender.defineLots" @change="saveDefineLots"/>
        <div v-if="tender.defineLots">
          <question text="Valor estimado por lote" :type="dataTypes.BOOLEAN"
                    :answer="tender.definePriceBoundariesPerLot" @change="saveDefinePriceBoundariesPerLot"/>
          <div v-if="addLotFormFlag">
            <form @submit.prevent>
              <div class="form-group row">
                <label class="col-form-label col" for="newLotName">Nombre del lote</label>
                <div class="col">
                  <input type="text" id="newLotName" class="form-control" v-model="newLotName">
                </div>
                <label v-if="tender.definePriceBoundariesPerLot" class="col-form-label col" for="newLotBasePrice">Valor estimado</label>
                <div v-if="tender.definePriceBoundariesPerLot" class="col">
                  <input type="number" id="newLotBasePrice" class="form-control" v-model="newLotBasePrice">
                </div>
                <div class="col-2">
                  <button class="btn btn-secondary" @click="addLot">Agregar</button>
                </div>
              </div>
            </form>
          </div>
          <div class="minor-separated" v-else>
            <button class="btn btn-secondary" @click="addLotFormFlag = true">
              <i class="fas fa-plus"></i> Agregar lote
            </button>
          </div>
        </div>
      </div>
      <div class="descriptor" v-for="(lot, idx) in tender.lots">
        <div class="form-group row">
          <p class="col">{{idx+1}}. {{lot.name}}:</p>
          <p class="col">$ {{lot.basePrice}}</p>
          <div class="col-2">
            <button class="btn btn-secondary" @click="deleteLot">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import * as constants from '@/store/constants';
  import Question from '@/components/tender/form/Question';

  export default {
    name: 'Lot',
    data() {
      return {
        dataTypes: constants.TENDER_BASE_DATA_TYPES,
        lot: { ...constants.TENDER_BASE_LOT },
        addLotFormFlag: false,
        newLotName: null,
        newLotBasePrice: null,
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
      addLot() {
        this.lot.name = this.newLotName;
        this.lot.basePrice = this.tender.definePriceBoundariesPerLot ? this.newLotBasePrice : 0;
        this.lot.priceList = [];
        this.addLotToList(this.lot);
        this.reset();
      },
      deleteLot(idx) {
        this.deleteLotFromList(idx);
      },
      reset() {
        this.newLotName = null;
        this.newLotBasePrice = null;
        this.addLotFormFlag = false;
      },
      saveDefineLots(data) {
        const { defineLots, ...rest } = this.tender;
        this.setTender({ defineLots: data, ...rest });
      },
      saveDefinePriceBoundariesPerLot(data) {
        const { definePriceBoundariesPerLot, ...rest } = this.tender;
        this.setTender({ definePriceBoundariesPerLot: data, ...rest });
      },
    },
  };
</script>
