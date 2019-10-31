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
              :answer="tender.comercialAgreements"
              @change="saveAgreements"/>
    <h3>Documentos internos</h3>
    <question class="descriptor" text="Documentos internos" :type="dataTypes.FILE"
              :answer="tender.insideDocuments"
              @change="saveDocuments"/>
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
        <!-- TODO: SeriousnessMinWages & SeriousnessMinWagesCheck & SeriousnessPercentage & SeriousnessPercentageCheck -->
        <question text="Cumplimiento" :type="dataTypes.BOOLEAN" :answer="tender.compliance"
                  @change="saveCompliance"/>
        <!-- TODO: x Good management and investment of advances & startDate & endDate -->
        <!-- TODO: x Return of advance payment & startDate & endDate -->
        <!-- TODO: ComplianceContract & ComplianceContractEndDate & ComplianceContractStartDate & ComplianceContractPercentage -->
        <!-- TODO: ComplianceWages & ComplianceWagesEndDate & ComplianceWagesStartDate & ComplianceWagesPercentage-->
        <!-- TODO: x Stability and quality of work & startDate & endDate -->
        <!-- TODO: x Service quality & startDate & endDate -->
        <!-- TODO: ComplianceGoodsQuality & ComplianceGoodsEndDate & ComplianceGoodsStartDate & ComplianceGoodsPercentage -->
        <!-- TODO: x Other & startDate & endDate -->
        <question text="Responsabilidad civil extra contractual" :type="dataTypes.BOOLEAN"
                  :answer="tender.civilLiability" @change="saveCivilLiability"/>
        <!-- TODO: CivilLiabilityMinWages & CivilLiabilityMinWagesCheck & CivilLiabilityPercentage & CivilLiabilityPercentageCheck & CivilLiabilityValue & CivilLiabilityValueCheck -->
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
    saveNotifications(notif) {
      const { notifications, ...rest } = this.tender;
      this.setTender({ notifications: notif, ...rest });
    },
    saveAgreements(agreements) {
      const { comercialAgreements, ...rest } = this.tender;
      this.setTender({ comercialAgreements: agreements, ...rest });
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
    saveCompliance(data) {
      const { compliance, ...rest } = this.tender;
      this.setTender({ compliance: data, ...rest });
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
      const { PeaceAgreement, ...rest } = this.tender;
      this.setTender({ PeaceAgreement: data, ...rest });
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
