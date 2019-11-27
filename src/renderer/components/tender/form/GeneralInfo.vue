<template>
  <div>
    <h3>Informacion general</h3>
    <div class="descriptor">
      <form @submit.prevent>
        <div class="form-group row">
          <label class="col-form-label col-6" for="typeProcess">Tipo de proceso</label>
          <div class="col-6">
            <input type="text" id="typeProcess" class="form-control" value="Licitación pública"
                   readonly>
          </div>
        </div>
      </form>
      <question text="Número de proceso" :type="dataTypes.NUMBER" :answer="tender.number"
                @change="saveNumber"/>
      <question text="Nombre de proceso" :type="dataTypes.TEXT" :answer="tender.name"
                @change="saveName"/>
      <question text="Descripción" :type="dataTypes.TEXT_AREA" :answer="tender.description"
                @change="saveDescription"/>
      <question text="Relacionar con otro proceso" :type="dataTypes.BOOLEAN"
                :answer="tender.relatedToProcess"
                @change="saveRelated"/>
      <question text="Unidad de contratación" :answer="tender.office" :type="dataTypes.DROPDOWN"
                :list="contractUnitList" @change="saveOffice"/>
      <question text="Equipo del proceso" :type="dataTypes.TEXT" :answer="tender.procedureTeam"
                @change="saveProcedureTeam" suggested="CO1.PROC_TEAM.#####"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <question class="descriptor" :answer="tender.unspsc" text="Código UNSPSC" :type="dataTypes.LIST"
              :list="unspsc" @change="saveUnspsc"/>
    <h3>Plan anual de adquisiciones</h3>
    <question class="descriptor" text="Es una adquisición del PAA?" :type="dataTypes.BOOLEAN"
              :answer="tender.paa" @change="savePaa"/>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" :type="dataTypes.DROPDOWN" :list="contractType"
                :answer="tender.contractType"
                @change="saveType"/>
      <question text="Duración del contrato" :type="dataTypes.TEXT_AND_DROPDOWN" :list="duration"
                :answer="tender.duration" @change="saveDuration"
                :secondAnswer="tender.durationType" @secondChange="saveDurationType"/>
    </div>
    <h3>Direccion de notificaciones</h3>
    <question class="descriptor" text="Utilizar la misma dirección de la unidad de contratación"
              :type="dataTypes.CHECKBOX" :answer="tender.notifications"
              @change="saveNotifications"/>
    <h3>Acuerdos comerciales</h3>
    <question class="descriptor" text="Acuerdos comerciales" :type="dataTypes.BOOLEAN"
              :answer="tender.commercialAgreements"
              @change="saveAgreements"/>
    <h3>Configuración financiera</h3>
    <div class="descriptor">
      <question text="Definir Plan de Pagos?" :type="dataTypes.BOOLEAN"
                :answer="tender.definePaymentPlan" @change="saveDefinePaymentPlan"/>
      <question text="¿Pago de anticipos?" :type="dataTypes.BOOLEAN"
                :answer="tender.advancePayments" @change="saveAdvancePayments"/>
      <question text="¿Solicitud de garantías?" :type="dataTypes.BOOLEAN"
                :answer="tender.warranties" @change="saveWarranties"/>
      <div v-if="tender.warranties">
        <question text="Seriedad de la oferta" :type="dataTypes.BOOLEAN"
                  :answer="tender.seriousness" @change="saveSeriousness"/>
        <div v-if="tender.seriousness" class="form-group descriptor">
          <div class="row">
            <input class="col-1" type="radio" id="seriousnessPercentageCheck"
                   name="seriousnessSelection"
                   v-model="seriousnessCheck" value="seriousnessPercentageCheck">
            <label class="col" for="seriousnessPercentageCheck">
              % del presupuesto oficial estimado del Proceso de Contratación o de la oferta
            </label>
            <input v-if="seriousnessCheck === 'seriousnessPercentageCheck'" class="col-4"
                   type="number"
                   :value="tender.seriousnessPercentage"
                   @change="saveSeriousnessMinWagesPercentage">
          </div>
          <div class="row">
            <input class="col-1" type="radio" id="seriousnessMinWagesCheck"
                   name="seriousnessSelection"
                   v-model="seriousnessCheck" value="seriousnessMinWagesCheck">
            <label class="col" for="seriousnessMinWagesCheck">No. de SMMLV</label>
            <input v-if="seriousnessCheck === 'seriousnessMinWagesCheck'" class="col-4"
                   type="number"
                   :value="tender.seriousnessMinWages"
                   @change="saveSeriousnessMinWagesPercentage">
          </div>
        </div>
        <question text="Cumplimiento" :type="dataTypes.BOOLEAN" :answer="tender.compliance"
                  @change="saveCompliance"/>
        <div v-if="tender.compliance" class="descriptor">
          <div class="question-group">
            <question :type="dataTypes.CHECKBOX"
                      text="Buen manejo y correcta inversión del anticipo"
                      :answer="tender.complianceInvestment"
                      @change="saveTenderProperty('complianceInvestment', $event)"/>
            <question :type="dataTypes.NUMBER" text="Porcetanje del anticipo" placeholder="35"
                      :answer="tender.complianceInvestmentPercentage"
                      @change="saveTenderProperty('complianceInvestmentPercentage', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(desde)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceInvestmentStartDate"
                      @change="saveTenderProperty('complianceInvestmentStartDate', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(hasta)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceInvestmentEndDate"
                      @change="saveTenderProperty('complianceInvestmentEndDate', $event)"/>
          </div>
          <div class="question-group">
            <question :type="dataTypes.CHECKBOX"
                      text="Cumplimiento del contrato"
                      :answer="tender.complianceContract"
                      @change="saveTenderProperty('complianceContract', $event)"/>
            <question :type="dataTypes.NUMBER" text="Porcetanje del valor del contrato"
                      placeholder="35" :answer="tender.complianceContractPercentage"
                      @change="saveTenderProperty('complianceContractPercentage', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(desde)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceContractStartDate"
                      @change="saveTenderProperty('complianceContractStartDate', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(hasta)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceContractEndDate"
                      @change="saveTenderProperty('complianceContractEndDate', $event)"/>
          </div>
          <div class="question-group">
            <question :type="dataTypes.CHECKBOX"
                      text="Pago de salarios (superior a 5% del valor del contrato)"
                      :answer="tender.complianceWages"
                      @change="saveTenderProperty('complianceWages', $event)"/>
            <question :type="dataTypes.NUMBER" text="Porcetanje del valor del contrato"
                      placeholder="35" :answer="tender.complianceWagesPercentage"
                      @change="saveTenderProperty('complianceWagesPercentage', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(desde)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceWagesStartDate"
                      @change="saveTenderProperty('complianceWagesStartDate', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(hasta)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceWagesEndDate"
                      @change="saveTenderProperty('complianceWagesEndDate', $event)"/>
          </div>
          <div class="question-group">
            <question :type="dataTypes.CHECKBOX"
                      text="Calidad del servicio"
                      :answer="tender.complianceGoodsQuality"
                      @change="saveTenderProperty('complianceGoodsQuality', $event)"/>
            <question :type="dataTypes.NUMBER" text="Porcetanje del valor del contrato"
                      placeholder="35" :answer="tender.complianceGoodsPercentage"
                      @change="saveTenderProperty('complianceGoodsPercentage', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(desde)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceGoodsStartDate"
                      @change="saveTenderProperty('complianceGoodsStartDate', $event)"/>
            <question :type="dataTypes.DATE" text="Fecha de vigencia(hasta)"
                      placeholder="YYYY-MM-DD" :answer="tender.complianceGoodsEndDate"
                      @change="saveTenderProperty('complianceGoodsEndDate', $event)"/>
          </div>
        </div>
        <question text="Responsabilidad civil extra contractual" :type="dataTypes.BOOLEAN"
                  :answer="tender.civilLiability" @change="saveCivilLiability"/>
        <div v-if="tender.civilLiability" class="descriptor">
          <div class="row">
            <input class="col-1" type="radio" id="civilLiabilityMinWagesCheck"
                   v-model="civilLiabilityMinWagesCheck" :value="true"
                   @click="setCivilLiabilityMinWages">
            <label class="col" for="civilLiabilityMinWagesCheck">Valor de garantía (COP)</label>
            <input v-if="civilLiabilityMinWagesCheck" class="col-4" type="number"
                   v-model.number="civilLiabilityMinWages"
                   @change="saveCivilLiabilityMinWagesPercentageValue">
          </div>
          <div class="row">
            <input class="col-1" type="radio" id="civilLiabilityPercentageCheck"
                   v-model="civilLiabilityPercentageCheck" :value="true"
                   @click="setCivilLiabilityPercentage">
            <label class="col" for="civilLiabilityPercentageCheck">% valor de la oferta</label>
            <input v-if="civilLiabilityPercentageCheck" class="col-4" type="number"
                   v-model.number="civilLiabilityPercentage"
                   @change="saveCivilLiabilityMinWagesPercentageValue">
          </div>
          <div class="row">
            <input class="col-1" type="radio" id="civilLiabilityValueCheck"
                   v-model="civilLiabilityValueCheck" :value="true"
                   @click="setCivilLiabilityValue">
            <label class="col" for="civilLiabilityValueCheck">No. de SMMLV</label>
            <input v-if="civilLiabilityValueCheck" class="col-4" type="number"
                   v-model.number="civilLiabilityValue"
                   @change="saveCivilLiabilityMinWagesPercentageValue">
          </div>
        </div>
      </div>
    </div>

    <h3>Visita al lugar de ejecución</h3>
    <question class="descriptor" text="¿Permitir visitas al lugar de ejecución?"
              :type="dataTypes.BOOLEAN" :answer="tender.allowVisitsToThePlaceOfWork"
              @change="saveAllowVisitsToThePlaceOfWork"/>

    <h3>Precios</h3>
    <question class="descriptor" text="Valor estimado" :type="dataTypes.NUMBER"
              :answer="tender.basePrice" @change="saveBasePrice"/>

    <h3>Información presupuestal</h3>
    <div class="descriptor">
      <question
              text="Plan del Plan Marco para la Implementación del Acuerdo de Paz o asociado al Acuerdo de Paz"
              :type="dataTypes.BOOLEAN" :answer="tender.peaceAgreement"
              @change="savePeaceAgreement"/>
      <question text="Destinación de gasto" :type="dataTypes.DROPDOWN" :list="expenseType"
                :answer="tender.expenseType" @change="saveExpenseType"/>
      <question text="Origen de los recursos" :type="dataTypes.DROPDOWN" :list="budgetOrigin"
                :answer="tender.budgetOrigin" @change="saveBudgetOrigin"/>
      <question text="Entidad Estatal registrada en el SIIF" :type="dataTypes.BOOLEAN"
                :answer="tender.registeredInSIIF" @change="saveRegisteredInSIIF"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import contractUnitList from '@/helpers/contractUnit';
import unspsc from '@/helpers/unspsc';
import duration from '@/helpers/duration';
import contractType from '@/helpers/contractType';
import * as constants from '@/store/constants';
import expenseType from '@/helpers/expenseType';
import budgetOrigin from '@/helpers/budgetOrigin';
import Question from '@/components/common/form/Question';
import { log } from 'electron-log';

export default {
  name: 'GeneralInfo',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      contractUnitList,
      unspsc,
      duration,
      contractType,
      expenseType,
      budgetOrigin,
      seriousnessCheck: null,
      seriousnessMinWagesCheck: false,
      seriousnessPercentageCheck: false,
      civilLiabilityMinWages: null,
      civilLiabilityMinWagesCheck: false,
      civilLiabilityPercentage: null,
      civilLiabilityPercentageCheck: false,
      civilLiabilityValue: null,
      civilLiabilityValueCheck: false,
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
      setTenderProperty: constants.TENDER_SET_TENDER_PROPERTY,
    }),
    saveTenderProperty(property, { data }) {
      this.setTenderProperty({
        property,
        data,
      });
    },
    saveNumber({ data }) {
      const { number, ...rest } = this.tender;
      this.setTender({ number: data, ...rest });
    },
    saveName({ data }) {
      const { name, ...rest } = this.tender;
      this.setTender({ name: data, ...rest });
    },
    saveDescription({ data }) {
      const { description, ...rest } = this.tender;
      this.setTender({ description: data, ...rest });
    },
    saveRelated({ data }) {
      const { relatedToProcess, ...rest } = this.tender;
      this.setTender({ relatedToProcess: data, ...rest });
    },
    saveOffice({ data }) {
      const { office, ...rest } = this.tender;
      this.setTender({ office: data, ...rest });
    },
    saveProcedureTeam({ data }) {
      const { procedureTeam, ...rest } = this.tender;
      this.setTender({ procedureTeam: data, ...rest });
    },
    saveUnspsc({ data }) {
      const { unspsc, ...rest } = this.tender;
      this.setTender({ unspsc: data, ...rest });
    },
    savePaa({ data }) {
      const { paa, ...rest } = this.tender;
      this.setTender({ paa: data, ...rest });
    },
    saveDuration({ data }) {
      const { duration, ...rest } = this.tender;
      this.setTender({ duration: data, ...rest });
    },
    saveDurationType({ data }) {
      const { durationType, ...rest } = this.tender;
      this.setTender({ durationType: data, ...rest });
    },
    saveType({ data }) {
      const { contractType, ...rest } = this.tender;
      this.setTender({ contractType: data, ...rest });
    },
    saveNotifications({ data }) {
      const { notifications, ...rest } = this.tender;
      this.setTender({ notifications: data, ...rest });
    },
    saveAgreements({ data }) {
      const { commercialAgreements, ...rest } = this.tender;
      this.setTender({ commercialAgreements: data, ...rest });
    },
    saveDefinePaymentPlan({ data }) {
      const { definePaymentPlan, ...rest } = this.tender;
      this.setTender({ definePaymentPlan: data, ...rest });
    },
    saveAdvancePayments({ data }) {
      const { advancePayments, ...rest } = this.tender;
      this.setTender({ advancePayments: data, ...rest });
    },
    saveWarranties({ data }) {
      const { warranties, ...rest } = this.tender;
      this.setTender({ warranties: data, ...rest });
    },
    saveAllowVisitsToThePlaceOfWork({ data }) {
      const { allowVisitsToThePlaceOfWork, ...rest } = this.tender;
      this.setTender({ allowVisitsToThePlaceOfWork: data, ...rest });
    },
    saveSeriousness({ data }) {
      const { seriousness, ...rest } = this.tender;
      this.setTender({ seriousness: data, ...rest });
    },
    saveSeriousnessMinWagesPercentage(e) { // TODO: FIX
      const {
        seriousnessCheck,
        seriousnessMinWages,
        seriousnessPercentage,
        ...rest
      } = this.tender;
      const obj = {
        seriousnessPercentage: null,
        seriousnessMinWages: null,
        seriousnessCheck: null,
      };
      if (this.seriousnessCheck === 'seriousnessPercentageCheck') {
        obj.seriousnessPercentage = parseInt(e.target.value, 10);
        obj.seriousnessMinWages = 0;
        obj.seriousnessCheck = this.seriousnessCheck;
      } else if (this.seriousnessCheck === 'seriousnessMinWagesCheck') {
        obj.seriousnessPercentage = 0;
        obj.seriousnessMinWages = parseInt(e.target.value, 10);
        obj.seriousnessCheck = this.seriousnessCheck;
      }
      log(obj, e.target.value);
      this.setTender({
        ...obj,
        ...rest,
      });
    },
    saveCompliance({ data }) {
      const { compliance, ...rest } = this.tender;
      this.setTender({ compliance: data, ...rest });
    },
    saveCivilLiability({ data }) {
      const { civilLiability, ...rest } = this.tender;
      this.setTender({ civilLiability: data, ...rest });
    },
    setCivilLiabilityMinWages() { // TODO: FIX
      this.civilLiabilityMinWagesCheck = true;
      this.civilLiabilityPercentageCheck = false;
      this.civilLiabilityValueCheck = false;
      this.civilLiabilityPercentage = 0;
      this.civilLiabilityValue = 0;
    },
    setCivilLiabilityPercentage() { // TODO: FIX
      this.civilLiabilityPercentageCheck = true;
      this.civilLiabilityMinWagesCheck = false;
      this.civilLiabilityValueCheck = false;
      this.civilLiabilityMinWages = 0;
      this.civilLiabilityValue = 0;
    },
    setCivilLiabilityValue() { // TODO: FIX
      this.civilLiabilityValueCheck = true;
      this.civilLiabilityPercentageCheck = false;
      this.civilLiabilityMinWagesCheck = false;
      this.civilLiabilityPercentage = 0;
      this.civilLiabilityMinWages = 0;
    },
    saveCivilLiabilityMinWagesPercentageValue() { // TODO: FIX
      const {
        civilLiabilityMinWagesCheck,
        civilLiabilityMinWages,
        civilLiabilityPercentageCheck,
        civilLiabilityPercentage,
        civilLiabilityValueCheck,
        civilLiabilityValue,
        ...rest
      } = this.tender;
      this.setTender({
        civilLiabilityMinWagesCheck: this.civilLiabilityMinWagesCheck,
        civilLiabilityMinWages: this.civilLiabilityMinWages,
        civilLiabilityPercentageCheck: this.civilLiabilityPercentageCheck,
        civilLiabilityPercentage: this.civilLiabilityPercentage,
        civilLiabilityValueCheck: this.civilLiabilityValueCheck,
        civilLiabilityValue: this.civilLiabilityValue,
        ...rest,
      });
    },
    saveBasePrice({ data }) {
      const { basePrice, ...rest } = this.tender;
      this.setTender({ basePrice: data, ...rest });
    },
    savePeaceAgreement({ data }) {
      const { peaceAgreement, ...rest } = this.tender;
      this.setTender({ peaceAgreement: data, ...rest });
    },
    saveExpenseType({ data }) {
      const { expenseType, ...rest } = this.tender;
      this.setTender({ expenseType: data, ...rest });
    },
    saveBudgetOrigin({ data }) {
      const { budgetOrigin, ...rest } = this.tender;
      this.setTender({ budgetOrigin: data, ...rest });
    },
    saveRegisteredInSIIF({ data }) {
      const { registeredInSIIF, ...rest } = this.tender;
      this.setTender({ registeredInSIIF: data, ...rest });
    },
  },
  mounted() {
    this.seriousnessCheck = this.tender.seriousnessCheck;
  },
};
</script>
