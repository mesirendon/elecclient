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
                placeholder="12345" @change="saveTenderProperty('number', $event)"/>
      <question text="Nombre de proceso" :type="dataTypes.TEXT" :answer="tender.name"
                placeholder="PAE 2019" @change="saveTenderProperty('name', $event)"/>
      <question text="Descripción" :type="dataTypes.TEXT_AREA" :answer="tender.description"
                @change="saveTenderProperty('description', $event)"/>
      <question text="Relacionar con otro proceso" :type="dataTypes.BOOLEAN"
                :answer="tender.relatedToProcess"
                @change="saveTenderProperty('relatedToProcess', $event)"/>
      <question text="Unidad de contratación" :answer="tender.office" :type="dataTypes.DROPDOWN"
                :list="contractUnitList" @change="saveTenderProperty('office', $event)"/>
      <question text="Equipo del proceso" :type="dataTypes.TEXT" :answer="tender.procedureTeam"
                @change="saveTenderProperty('procedureTeam', $event)"
                placeholder="CO1.PROC_TEAM.#####"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <div class="descriptor">
      <question :answer="tender.unspsc" text="Código UNSPSC" :type="dataTypes.LIST" :list="unspsc"
                @change="saveTenderProperty('unspsc', $event)"/>
    </div>
    <h3>Plan anual de adquisiciones</h3>
    <div class="descriptor">
      <question text="Es una adquisición del PAA?" :type="dataTypes.BOOLEAN" :answer="tender.paa"
                @change="saveTenderProperty('paa', $event)"/>
    </div>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" :type="dataTypes.DROPDOWN" :list="contractType"
                :answer="tender.contractType" @change="saveTenderProperty('contractType', $event)"/>
      <question text="Duración del contrato" :type="dataTypes.NUMBER" placeholder="28"
                :answer="tender.duration" @change="saveTenderProperty('duration', $event)"/>
      <question text="Periodo" :type="dataTypes.DROPDOWN" :list="duration"
                :answer="tender.durationType"
                @change="saveTenderProperty('durationType', $event)"/>
    </div>
    <h3>Direccion de notificaciones</h3>
    <div class="descriptor">
      <question text="Utilizar la misma dirección de la unidad de contratación"
                :type="dataTypes.CHECKBOX" :answer="tender.notifications"
                @change="saveTenderProperty('notifications', $event)"/>
    </div>
    <h3>Acuerdos comerciales</h3>
    <div class="descriptor">
      <question text="Acuerdos comerciales" :type="dataTypes.BOOLEAN"
                :answer="tender.commercialAgreements"
                @change="saveTenderProperty('commercialAgreements', $event)"/>
    </div>
    <h3>Configuración financiera</h3>
    <div class="descriptor">
      <question text="Definir Plan de Pagos?" :type="dataTypes.BOOLEAN"
                :answer="tender.definePaymentPlan"
                @change="saveTenderProperty('definePaymentPlan', $event)"/>
      <question text="¿Pago de anticipos?" :type="dataTypes.BOOLEAN"
                :answer="tender.advancePayments"
                @change="saveTenderProperty('advancePayments', $event)"/>
      <question text="¿Solicitud de garantías?" :type="dataTypes.BOOLEAN"
                :answer="tender.warranties" @change="saveTenderProperty('warranties', $event)"/>
      <div v-if="tender.warranties">
        <question text="Seriedad de la oferta" :type="dataTypes.BOOLEAN"
                  :answer="tender.seriousness" @change="saveSeriousness"/>
        <div v-if="tender.seriousness" class="form-group descriptor">
          <div class="row">
            <input class="col-1" type="radio" id="seriousnessPercentageCheck"
                   name="seriousnessSelection" v-model="seriousnessCheck"
                   value="seriousnessPercentageCheck">
            <label class="col" for="seriousnessPercentageCheck">
              % del presupuesto oficial estimado del Proceso de Contratación o de la oferta
            </label>
            <input v-if="seriousnessCheck === 'seriousnessPercentageCheck'" class="col-4"
                   type="number" :value="tender.seriousnessPercentage"
                   @change="saveSeriousnessValues">
          </div>
          <div class="row">
            <input class="col-1" type="radio" id="seriousnessMinWagesCheck"
                   name="seriousnessSelection" v-model="seriousnessCheck"
                   value="seriousnessMinWagesCheck">
            <label class="col" for="seriousnessMinWagesCheck">No. de SMMLV</label>
            <input v-if="seriousnessCheck === 'seriousnessMinWagesCheck'" class="col-4"
                   type="number" :value="tender.seriousnessMinWages"
                   @change="saveSeriousnessValues">
          </div>
        </div>
        <question text="Cumplimiento" :type="dataTypes.BOOLEAN" :answer="tender.compliance"
                  @change="saveCompliance"/>
        <div v-if="tender.compliance" class="descriptor">
          <div class="question-group">
            <question class="font-weight-bold" :type="dataTypes.CHECKBOX"
                      text="Buen manejo y correcta inversión del anticipo"
                      :answer="tender.complianceInvestment" @change="saveComplianceInvestment"/>
            <div v-if="tender.complianceInvestment">
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
          </div>
          <div class="question-group">
            <question class="font-weight-bold" :type="dataTypes.CHECKBOX"
                      text="Cumplimiento del contrato" :answer="tender.complianceContract"
                      @change="saveComplianceContract"/>
            <div v-if="tender.complianceContract">
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
          </div>
          <div class="question-group">
            <question class="font-weight-bold" :type="dataTypes.CHECKBOX"
                      text="Pago de salarios (superior a 5% del valor del contrato)"
                      :answer="tender.complianceWages"
                      @change="saveComplianceWages"/>
            <div v-if="tender.complianceWages">
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
          </div>
          <div class="question-group">
            <question class="font-weight-bold" :type="dataTypes.CHECKBOX"
                      text="Calidad del servicio"
                      :answer="tender.complianceGoodsQuality"
                      @change="saveComplianceGoodsQuality"/>
            <div v-if="tender.complianceGoodsQuality">
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
        </div>
        <question text="Responsabilidad civil extra contractual" :type="dataTypes.BOOLEAN"
                  :answer="tender.civilLiability"
                  @change="saveCivilLiability"/>
        <div v-if="tender.civilLiability" class="descriptor">
          <div class="row">
            <input class="col-1" type="radio" id="civilLiabilityMinWagesCheck"
                   name="civilLiabilityCheck" v-model="civilLiabilityCheck"
                   value="civilLiabilityMinWages">
            <label class="col" for="civilLiabilityMinWagesCheck">Valor de garantía (COP)</label>
            <input v-if="civilLiabilityCheck === 'civilLiabilityMinWages'" class="col-4"
                   type="number" :value="tender.civilLiabilityMinWages"
                   @change="saveCivilLiabilityValues">
          </div>
          <div class="row">
            <input class="col-1" type="radio" id="civilLiabilityPercentageCheck"
                   name="civilLiabilityCheck" v-model="civilLiabilityCheck"
                   value="civilLiabilityPercentage">
            <label class="col" for="civilLiabilityPercentageCheck">% valor de la oferta</label>
            <input v-if="civilLiabilityCheck === 'civilLiabilityPercentage'" class="col-4"
                   type="number" :value="tender.civilLiabilityPercentage"
                   @change="saveCivilLiabilityValues">
          </div>
          <div class="row">
            <input class="col-1" type="radio" id="civilLiabilityValueCheck"
                   name="civilLiabilityCheck" v-model="civilLiabilityCheck"
                   value="civilLiabilityValue">
            <label class="col" for="civilLiabilityValueCheck">No. de SMMLV</label>
            <input v-if="civilLiabilityCheck === 'civilLiabilityValue'" class="col-4"
                   type="number" :value="tender.civilLiabilityValue"
                   @change="saveCivilLiabilityValues">
          </div>
        </div>
      </div>
    </div>
    <h3>Visita al lugar de ejecución</h3>
    <div class="descriptor">
      <question text="¿Permitir visitas al lugar de ejecución?" :type="dataTypes.BOOLEAN"
                :answer="tender.allowVisitsToThePlaceOfWork"
                @change="saveTenderProperty('allowVisitsToThePlaceOfWork', $event)"/>
    </div>
    <h3>Precios</h3>
    <div class="descriptor">
      <question text="Valor estimado" :type="dataTypes.NUMBER" :answer="tender.basePrice"
                placeholder="156000000" @change="saveTenderProperty('basePrice', $event)"/>
    </div>
    <h3>Información presupuestal</h3>
    <div class="descriptor">
      <question :type="dataTypes.BOOLEAN" :answer="tender.peaceAgreement"
                text="Plan del Plan Marco para la Implementación del Acuerdo de Paz o Asociado al Acuerdo de Paz"
                @change="saveTenderProperty('peaceAgreement', $event)"/>
      <question text="Destinación de gasto" :type="dataTypes.DROPDOWN" :list="expenseType"
                :answer="tender.expenseType" @change="saveTenderProperty('expenseType', $event)"/>
      <question text="Origen de los Recursos" :type="dataTypes.DROPDOWN" :list="budgetOrigin"
                :answer="tender.budgetOrigin" @change="saveTenderProperty('budgetOrigin', $event)"/>
      <question text="Entidad Estatal Registrada en el SIIF" :type="dataTypes.BOOLEAN"
                :answer="tender.registeredInSIIF"
                @change="saveTenderProperty('registeredInSIIF', $event)"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import contractUnitList from '@/helpers/contractUnit';
import unspsc from '@/helpers/unspsc';
import duration from '@/helpers/duration';
import contractType from '@/helpers/contractType';
import * as constants from '@/store/constants';
import expenseType from '@/helpers/expenseType';
import budgetOrigin from '@/helpers/budgetOrigin';
import Question from '@/components/common/form/Question';

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
      civilLiabilityCheck: null,
      civilLiabilityMinWages: null,
      civilLiabilityPercentage: null,
      civilLiabilityValue: null,
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
    ...mapMutations({
      setTenderProperty: constants.TENDER_SET_TENDER_PROPERTY,
    }),
    saveTenderProperty(property, data) {
      this.setTenderProperty({
        property,
        data,
      });
    },
    saveSeriousness(data) {
      this.saveTenderProperty('seriousness', data);
      if (!data) {
        this.saveTenderProperty('seriousnessCheck', null);
        this.saveTenderProperty('seriousnessPercentage', null);
        this.saveTenderProperty('seriousnessMinWages', null);
      }
    },
    saveSeriousnessValues({ target: { value } = {} }) {
      switch (this.seriousnessCheck) {
        case 'seriousnessPercentageCheck':
          this.saveTenderProperty('seriousnessPercentage', parseInt(value, 10));
          this.saveTenderProperty('seriousnessMinWages', null);
          break;
        case 'seriousnessMinWagesCheck':
          this.saveTenderProperty('seriousnessPercentage', null);
          this.saveTenderProperty('seriousnessMinWages', parseInt(value, 10));
          break;
        default:
      }
      this.saveTenderProperty('seriousnessCheck', this.seriousnessCheck);
    },
    saveCompliance(data) {
      this.saveTenderProperty('compliance', data);
      if (!data) {
        this.saveComplianceInvestment(false);
        this.saveComplianceContract(false);
        this.saveComplianceWages(false);
        this.saveComplianceGoodsQuality(false);
      }
    },
    saveComplianceInvestment(data) {
      this.saveTenderProperty('complianceInvestment', data);
      if (!data) {
        this.saveTenderProperty('complianceInvestmentPercentage', null);
        this.saveTenderProperty('complianceInvestmentStartDate', null);
        this.saveTenderProperty('complianceInvestmentEndDate', null);
      }
    },
    saveComplianceContract(data) {
      this.saveTenderProperty('complianceContract', data);
      if (!data) {
        this.saveTenderProperty('complianceContractPercentage', null);
        this.saveTenderProperty('complianceContractStartDate', null);
        this.saveTenderProperty('complianceContractEndDate', null);
      }
    },
    saveComplianceGoodsQuality(data) {
      this.saveTenderProperty('complianceGoodsQuality', data);
      if (!data) {
        this.saveTenderProperty('complianceGoodsPercentage', null);
        this.saveTenderProperty('complianceGoodsStartDate', null);
        this.saveTenderProperty('complianceGoodsEndDate', null);
      }
    },
    saveComplianceWages(data) {
      this.saveTenderProperty('complianceWages', data);
      if (!data) {
        this.saveTenderProperty('complianceWagesPercentage', null);
        this.saveTenderProperty('complianceWagesStartDate', null);
        this.saveTenderProperty('complianceWagesEndDate', null);
      }
    },
    saveCivilLiability(data) {
      this.saveTenderProperty('civilLiability', data);
      if (!data) {
        this.saveTenderProperty('civilLiabilityCheck', null);
        this.saveTenderProperty('civilLiabilityMinWages', null);
        this.saveTenderProperty('civilLiabilityPercentage', null);
        this.saveTenderProperty('civilLiabilityValue', null);
      }
    },
    saveCivilLiabilityValues({ target: { value } = {} }) {
      switch (this.civilLiabilityCheck) {
        case 'civilLiabilityMinWages':
          this.saveTenderProperty('civilLiabilityMinWages', parseInt(value, 10));
          this.saveTenderProperty('civilLiabilityPercentage', null);
          this.saveTenderProperty('civilLiabilityValue', null);
          break;
        case 'civilLiabilityPercentage':
          this.saveTenderProperty('civilLiabilityMinWages', null);
          this.saveTenderProperty('civilLiabilityPercentage', parseInt(value, 10));
          this.saveTenderProperty('civilLiabilityValue', null);
          break;
        case 'civilLiabilityValue':
          this.saveTenderProperty('civilLiabilityMinWages', null);
          this.saveTenderProperty('civilLiabilityPercentage', null);
          this.saveTenderProperty('civilLiabilityValue', parseInt(value, 10));
          break;
        default:
      }
      this.saveTenderProperty('civilLiabilityCheck', this.civilLiabilityCheck);
    },
  },
  mounted() {
    this.seriousnessCheck = this.tender.seriousnessCheck;
    this.civilLiabilityCheck = this.tender.civilLiabilityCheck;
  },
};
</script>
