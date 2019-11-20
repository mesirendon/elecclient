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
      <question text="Número de proceso" :type="dataTypes.TEXT" :answer="tender.number"
                @change="saveNumber"/>
      <question text="Nombre de proceso" :type="dataTypes.TEXT" :answer="tender.name"
                @change="saveName"/>
      <question text="Descripcion" :type="dataTypes.TEXT_AREA" :answer="tender.description"
                @change="saveDescription"/>
      <question text="Relacionar con otro proceso" :type="dataTypes.BOOLEAN"
                :answer="tender.relatedToProcess"
                @change="saveRelated"/>
      <question text="Unidad de contratacion" :answer="tender.office" :type="dataTypes.DROPDOWN"
                :list="contractUnitList" @change="saveOffice"/>
    </div>
    <h3>Clasificacion del bien o servicio</h3>
    <question class="descriptor" :answer="tender.unspsc" text="Codigo UNSPSC" :type="dataTypes.LIST"
              :list="unspsc" @change="saveUnspsc"/>
    <h3>Plan anual de adquisiciones</h3>
    <question class="descriptor" text="Es una adquisicion del PAA?" :type="dataTypes.BOOLEAN"
              :answer="tender.paa" @change="savePaa"/>
    <h3>Informacion del contrato</h3>
    <div class="descriptor">
      <question text="Tipo" :type="dataTypes.DROPDOWN" :list="contractType"
                :answer="tender.contractType"
                @change="saveType"/>
      <question text="Duracion del contrato" :type="dataTypes.TEXT_AND_DROPDOWN" :list="duration"
                :answer="tender.schedule.bidValidTerm"
                :secondAnswer="tender.schedule.bidValidTermUnit" @change="saveTerm"
                @secondChange="saveTermUnit"/>
    </div>
    <h3>Direccion de notificaciones</h3>
    <question class="descriptor" text="Utilizar la misma direccion de la unidad de contratacion"
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
            <div class="col-6">
              <input type="radio" id="seriousnessPercentageCheck" v-model="seriousnessPercentageCheck" :value="true"
                     @click="setSeriousnessPercentage">
              <label for="seriousnessPercentageCheck">
                % del presupuesto oficial estimado del Proceso de Contratación o de la oferta
              </label>
            </div>
            <input v-if="seriousnessPercentageCheck" class="col-2" type="number" v-model.number="seriousnessPercentage"
                   @change="saveSeriousnessMinWagesPercentage">
          </div>
          <div class="row">
            <div class="col-6">
              <input type="radio" id="seriousnessMinWagesCheck" v-model="seriousnessMinWagesCheck" :value="true"
                     @click="setSeriousnessMinWages">
              <label for="seriousnessMinWagesCheck">No. de SMMLV</label>
            </div>
            <input v-if="seriousnessMinWagesCheck" class="col-2" type="number" v-model.number="seriousnessMinWages"
                   @change="saveSeriousnessMinWagesPercentage">
          </div>
        </div>
        <question text="Cumplimiento" :type="dataTypes.BOOLEAN" :answer="tender.compliance"
                  @change="saveCompliance"/>
        <div v-if="tender.compliance" class="descriptor">
          <question :type="dataTypes.CHECKBOX_CALENDAR"
                    text="Buen manejo y correcta inversión del anticipo"
                    percentage="% del anticipo"
                    :flag="tender.complianceInvestment"
                    :second-answer="tender.complianceInvestmentPercentage"
                    :start-date="tender.complianceInvestmentStartDate"
                    :end-date="tender.complianceInvestmentEndDate"
                    @flagChange="saveComplianceInvestment"
                    @secondChange="saveComplianceInvestmentPercentage"
                    @startDateChange="saveComplianceInvestmentStartDate"
                    @endDateChange="saveComplianceInvestmentEndDate"/>
          <!-- TODO: ComplianceContract & ComplianceContractEndDate & ComplianceContractStartDate & ComplianceContractPercentage -->
          <!-- TODO: ComplianceWages & ComplianceWagesEndDate & ComplianceWagesStartDate & ComplianceWagesPercentage-->
          <!-- TODO: ComplianceGoodsQuality & ComplianceGoodsEndDate & ComplianceGoodsStartDate & ComplianceGoodsPercentage -->
        </div>
        <question text="Responsabilidad civil extra contractual" :type="dataTypes.BOOLEAN"
                  :answer="tender.civilLiability" @change="saveCivilLiability"/>
        <div v-if="tender.civilLiability">
          <!-- TODO: CivilLiabilityMinWages & CivilLiabilityMinWagesCheck & CivilLiabilityPercentage & CivilLiabilityPercentageCheck & CivilLiabilityValue & CivilLiabilityValueCheck -->
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
import { mapActions, mapState } from 'vuex';
import contractUnitList from '@/helpers/contractUnit';
import unspsc from '@/helpers/unspsc';
import duration from '@/helpers/duration';
import contractType from '@/helpers/contractType';
import * as constants from '@/store/constants';
import expenseType from '@/helpers/expenseType';
import budgetOrigin from '@/helpers/budgetOrigin';
import compliance from '@/helpers/compliance';

import Question from '@/components/tender/form/Question';

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
      compliance,
      seriousnessMinWagesCheck: false,
      seriousnessMinWages: null,
      seriousnessPercentageCheck: false,
      seriousnessPercentage: null,
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
    saveNumber(numberProcess) {
      const { number, ...rest } = this.tender;
      this.setTender({ number: numberProcess, ...rest });
    },
    saveName(nameProcess) {
      const { name, ...rest } = this.tender;
      this.setTender({ name: nameProcess, ...rest });
    },
    saveDescription(descriptionProcess) {
      const { description, ...rest } = this.tender;
      this.setTender({ description: descriptionProcess, ...rest });
    },
    saveRelated(related) {
      const { relatedToProcess, ...rest } = this.tender;
      this.setTender({ relatedToProcess: related, ...rest });
    },
    saveOffice(officeSelection) {
      const { office, ...rest } = this.tender;
      this.setTender({ office: officeSelection, ...rest });
    },
    saveUnspsc(unspscCode) {
      const { unspsc, ...rest } = this.tender;
      this.setTender({ unspsc: unspscCode, ...rest });
    },
    savePaa(belongsToPaa) {
      const { paa, ...rest } = this.tender;
      this.setTender({ paa: belongsToPaa, ...rest });
    },
    saveTerm(term) {
      const { schedule, ...rest } = this.tender;
      schedule.bidValidTerm = term;
      this.setTender({ schedule, ...rest });
    },
    saveTermUnit(termUnit) {
      const { schedule, ...rest } = this.tender;
      schedule.bidValidTermUnit = termUnit;
      this.setTender({ schedule, ...rest });
    },
    saveType(type) {
      const { contractType, ...rest } = this.tender;
      this.setTender({ contractType: type, ...rest });
    },
    saveNotifications(newNotification) {
      const { notifications, ...rest } = this.tender;
      this.setTender({ notifications: newNotification, ...rest });
    },
    saveAgreements(agreements) {
      const { commercialAgreements, ...rest } = this.tender;
      this.setTender({ commercialAgreements: agreements, ...rest });
    },
    saveDocuments(docs) {
      const { insideDocuments, ...rest } = this.tender;
      this.setTender({ insideDocuments: docs, ...rest });
    },
    saveDefinePaymentPlan(data) {
      const { definePaymentPlan, ...rest } = this.tender;
      this.setTender({ definePaymentPlan: data, ...rest });
    },
    saveAdvancePayments(data) {
      const { advancePayments, ...rest } = this.tender;
      this.setTender({ advancePayments: data, ...rest });
    },
    saveWarranties(data) {
      const { warranties, ...rest } = this.tender;
      this.setTender({ warranties: data, ...rest });
    },
    saveAllowVisitsToThePlaceOfWork(data) {
      const { allowVisitsToThePlaceOfWork, ...rest } = this.tender;
      this.setTender({ allowVisitsToThePlaceOfWork: data, ...rest });
    },
    saveSeriousness(data) {
      const { seriousness, ...rest } = this.tender;
      this.setTender({ seriousness: data, ...rest });
    },
    setSeriousnessMinWages() {
      this.seriousnessMinWagesCheck = true;
      this.seriousnessPercentageCheck = false;
      this.seriousnessPercentage = 0;
    },
    setSeriousnessPercentage() {
      this.seriousnessPercentageCheck = true;
      this.seriousnessMinWagesCheck = false;
      this.seriousnessMinWages = 0;
    },
    saveSeriousnessMinWagesPercentage() {
      const {
        seriousnessPercentageCheck,
        seriousnessMinWages,
        seriousnessMinWagesCheck,
        seriousnessPercentage,
        ...rest
      } = this.tender;
      this.setTender({
        seriousnessMinWagesCheck: this.seriousnessMinWagesCheck,
        seriousnessMinWages: this.seriousnessMinWages,
        seriousnessPercentageCheck: this.seriousnessPercentageCheck,
        seriousnessPercentage: this.seriousnessPercentage,
        ...rest,
      });
    },
    saveCompliance(data) {
      const { compliance, ...rest } = this.tender;
      this.setTender({ compliance: data, ...rest });
    },
    saveComplianceInvestment(data) {
      const { complianceInvestment, ...rest } = this.tender;
      this.setTender({ complianceInvestment: data, ...rest });
    },
    saveComplianceInvestmentPercentage(data) {
      const { complianceInvestmentPercentage, ...rest } = this.tender;
      this.setTender({ complianceInvestmentPercentage: data, ...rest });
    },
    saveComplianceInvestmentStartDate(data) {
      const { complianceInvestmentStartDate, ...rest } = this.tender;
      this.setTender({ complianceInvestmentStartDate: data, ...rest });
    },
    saveComplianceInvestmentEndDate(data) {
      const { complianceInvestmentEndDate, ...rest } = this.tender;
      this.setTender({ complianceInvestmentEndDate: data, ...rest });
    },
    saveComplianceRepayment(data) {
      const { complianceRepayment, ...rest } = this.tender;
      this.setTender({ complianceRepayment: data, ...rest });
    },
    saveComplianceRepaymentPercentage(data) {
      const { complianceRepaymentPercentage, ...rest } = this.tender;
      this.setTender({ complianceRepaymentPercentage: data, ...rest });
    },
    saveComplianceRepaymentStartDate(data) {
      const { complianceRepaymentStartDate, ...rest } = this.tender;
      this.setTender({ complianceRepaymentStartDate: data, ...rest });
    },
    saveComplianceRepaymentEndDate(data) {
      const { complianceRepaymentEndDate, ...rest } = this.tender;
      this.setTender({ complianceRepaymentEndDate: data, ...rest });
    },
    saveCivilLiability(data) {
      const { civilLiability, ...rest } = this.tender;
      this.setTender({ civilLiability: data, ...rest });
    },
    saveBasePrice(data) {
      const { basePrice, ...rest } = this.tender;
      this.setTender({ basePrice: data, ...rest });
    },
    savePeaceAgreement(data) {
      const { peaceAgreement, ...rest } = this.tender;
      this.setTender({ peaceAgreement: data, ...rest });
    },
    saveExpenseType(data) {
      const { expenseType, ...rest } = this.tender;
      this.setTender({ expenseType: data, ...rest });
    },
    saveBudgetOrigin(data) {
      const { budgetOrigin, ...rest } = this.tender;
      this.setTender({ budgetOrigin: data, ...rest });
    },
    saveRegisteredInSIIF(data) {
      const { registeredInSIIF, ...rest } = this.tender;
      this.setTender({ registeredInSIIF: data, ...rest });
    },
  },
};
</script>
