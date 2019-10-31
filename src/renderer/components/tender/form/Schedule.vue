<template>
  <div>
    <h3>Cronograma</h3>
    <div class="descriptor">
      <div class="form-group row right">
        <div class="col"></div>
        <div class="col-3 order-last">
          <p>Zona horaria: UTC-5</p>
          <p>(Bogotá, Lima, Quito)</p>
        </div>
      </div>
      <question text="Publicación del aviso, convocatoria y estudios previos" :type="dataTypes.DATE" :answer="schedule.rfpPublishingAnnouncementStudies" @change="saveRfpPublishingAnnouncementStudies"/>
      <question text="Presentar observaciones al pliego de condiciones" :type="dataTypes.DATE" :answer="schedule.rfpObservationDeadline" @change="saveRfpObservationDeadline"/>
      <question text="Respuesta a las observaciones al pliego de condiciones y publicación" :type="dataTypes.DATE" :answer="schedule.rfpObservationResponsesDeadline" @change="saveRfpObservationResponsesDeadline"/>
      <question text="Fecha de presentación del pliego definitivo. Expedición y publicación de acto administrativo de apertira del proceso de selección" :type="dataTypes.DATE" :answer="schedule.definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease" @change="saveDefinitiveRfpTermsPublishingAdministrativeActPublishingAndRelease"/>
      <question text="Audiencia de asignación de riesgos" :type="dataTypes.DATE" :answer="schedule.riskAssignationHearing" @change="saveRiskAssignationHearing"/>
      <question text="Presentar observaciones al pliego de condiciones definitivo" :type="dataTypes.DATE" :answer="schedule.finalRfpObservationsDeadline" @change="saveFinalRfpObservationsDeadline"/>
      <question text="Respuesta observaciones al pliego de condiciones definitivo" :type="dataTypes.DATE" :answer="schedule.finalRfpObservationsResponsesDeadline" @change="saveFinalRfpObservationsResponsesDeadline"/>
      <question text="Plazo máximo para expedir adendas" :type="dataTypes.DATE" :answer="schedule.addendumIssuingDeadline" @change="saveAddendumIssuingDeadline"/>
      <question text="Cierre de presentación de ofertas" :type="dataTypes.DATE" :answer="schedule.bidOfferingsClosed" @change="saveBidOfferingsClosed"/>
      <div class="blueish">
        <question text="Apertura de ofertas" :type="dataTypes.DATE" :answer="schedule.bidsOpening" @change="saveBidsOpening"/>
      </div>
      <div class="blueish">
        <question text="Informe de presentación de ofertas" :type="dataTypes.DATE" :answer="schedule.bidOfferingReport" @change="saveBidOfferingReport"/>
      </div>
      <question text="Publicación del informe de evaluación de ofertas" :type="dataTypes.DATE" :answer="schedule.bidOfferingReportPublishing" @change="saveBidOfferingReportPublishing"/>
      <question text="Observaciones del informe de evaluación de ofertas" :type="dataTypes.DATE" :answer="schedule.observationsOnEvaluationOrVerificationReport" @change="saveObservationsOnEvaluationOrVerificationReport"/>
      <question text="Audiencia de adjudicación y publicación de acto administrativo de adjudicación" :type="dataTypes.DATE" :answer="schedule.adjudicationHearingAdministrativeActPublishing" @change="saveAdjudicationHearingAdministrativeActPublishing"/>
      <question text="Firma del contrato" :type="dataTypes.DATE" :answer="schedule.contractSign" @change="saveContractSign"/>
      <question text="Entrega de garantías de ejecución de contrato" :type="dataTypes.DATE" :answer="schedule.bidValidWarranties" @change="saveBidValidWarranties"/>
      <div class="form-group blueish">
        <question class="dateSelector" text="Plazo de validez de las ofertas" :type="dataTypes.TEXT_AND_DROPDOWN" :list="duration" :answer="schedule.duration" :second-answer="schedule.durationType" @change="saveDuration" @secondChange="saveDurationType"/>
      </div>

    </div>
    <h3>Configuración financiera</h3>
    <div class="descriptor">
      <question text="Definir Plan de Pagos?" :type="dataTypes.BOOLEAN" :answer="tender.definePaymentPlan" @change="saveDefinePaymentPlan"/>
      <question text="¿Pago de anticipos?" :type="dataTypes.BOOLEAN" :answer="tender.advancePayments" @change="saveAdvancePayments"/>
      <question text="¿Solicitud de garantías?" :type="dataTypes.BOOLEAN" :answer="tender.warranties" @change="saveWarranties"/>
      <div v-if="tender.warranties">
        <question text="Seriedad de la oferta" :type="dataTypes.BOOLEAN" :answer="tender.seriousness" @change="saveSeriousness"/>
        <!-- TODO: SeriousnessMinWages & SeriousnessMinWagesCheck & SeriousnessPercentage & SeriousnessPercentageCheck -->
        <question text="Cumplimiento" :type="dataTypes.BOOLEAN" :answer="tender.compliance" @change="saveCompliance"/>
        <!-- TODO: x Good management and investment of advances & startDate & endDate -->
        <!-- TODO: x Return of advance payment & startDate & endDate -->
        <!-- TODO: ComplianceContract & ComplianceContractEndDate & ComplianceContractStartDate & ComplianceContractPercentage -->
        <!-- TODO: ComplianceWages & ComplianceWagesEndDate & ComplianceWagesStartDate & ComplianceWagesPercentage-->
        <!-- TODO: x Stability and quality of work & startDate & endDate -->
        <!-- TODO: x Service quality & startDate & endDate -->
        <!-- TODO: ComplianceGoodsQuality & ComplianceGoodsEndDate & ComplianceGoodsStartDate & ComplianceGoodsPercentage -->
        <!-- TODO: x Other & startDate & endDate -->
        <question text="Responsabilidad civil extra contractual" :type="dataTypes.BOOLEAN" :answer="tender.civilLiability" @change="saveCivilLiability"/>
        <!-- TODO: CivilLiabilityMinWages & CivilLiabilityMinWagesCheck & CivilLiabilityPercentage & CivilLiabilityPercentageCheck & CivilLiabilityValue & CivilLiabilityValueCheck -->
      </div>
    </div>

    <h3>Mipymes</h3>
    <question class="descriptor" text="Licitar este proceso a Mipymes" :type="dataTypes.BOOLEAN" :answer="tender.mipymes" @change="saveMipymes"/>

    <h3>Visita al lugar de ejecución</h3>
    <question class="descriptor" text="¿Permitir visitas al lugar de ejecución?" :type="dataTypes.BOOLEAN" :answer="tender.allowVisitsToThePlaceOfWork" @change="saveAllowVisitsToThePlaceOfWork"/>

    <h3>Lotes</h3>
    <div class="descriptor">
      <question text="Definir lotes" :type="dataTypes.BOOLEAN" :answer="tender.defineLots" @change="saveDefineLots"/>
      <question text="Definir valor estimado por lote" :type="dataTypes.BOOLEAN" :answer="tender.definePriceBoundariesPerLot" @change="saveDefinePriceBoundariesPerLot"/>
    </div>

    <h3>Precios</h3>
    <question class="descriptor" text="Valor estimado" :type="dataTypes.NUMBER" :answer="tender.basePrice" @change="saveBasePrice"/>

    <h3>Información presupuestal</h3>
    <div class="descriptor">
      <question text="Plan del Plan Marco para la Implementación del Acuerdo de Paz o asociado al Acuerdo de Paz" :type="dataTypes.BOOLEAN" :answer="tender.peaceAgreement" @change="savePeaceAgreement"/>
      <question text="Destinación de gasto" :type="dataTypes.DROPDOWN" :list="expenseType" :answer="tender.expenseType" @change="saveExpenseType"/>
      <question text="Origen de los recursos" :type="dataTypes.DROPDOWN" :list="budgetOrigin" :answer="tender.budgetOrigin" @change="saveBudgetOrigin"/>
      <question text="Entidad Estatal registrada en el SIIF" :type="dataTypes.BOOLEAN" :answer="tender.registeredInSIIF" @change="saveRegisteredInSIIF"/>
    </div>

    <h3>Configuraciones avanzadas</h3>
    <question class="descriptor" text="¿Visualizar y editar configuraciones avanzadas?" :type="dataTypes.BOOLEAN" :answer="tender.defineAdvancedSettings" @change="saveDefineAdvancedSettings"/>

  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapMutations, mapState } from 'vuex';
import Question from '@/components/tender/form/Question';
import * as constants from '@/store/constants';
import expenseType from '@/helpers/expenseType';
import budgetOrigin from '@/helpers/budgetOrigin';
import duration from '@/helpers/duration';

export default {
  name: 'Schedule',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      expenseType,
      budgetOrigin,
      duration,
    };
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions({
      setTender: constants.TENDER_SET_TENDER,
    }),
    ...mapMutations({
      setScheduleDate: constants.TENDER_SET_SCHEDULE_DATE,
    }),
    saveRfpPublishingAnnouncementStudies(data) {
      this.setScheduleDate({
        property: 'rfpPublishingAnnouncementStudies',
        value: moment(data).valueOf().toString(),
      });
    },
    saveRfpObservationDeadline(data) {
      this.setScheduleDate({
        property: 'rfpObservationDeadline',
        value: moment(data).valueOf().toString(),
      });
    },
    saveRfpObservationResponsesDeadline(data) {
      this.setScheduleDate({
        property: 'rfpObservationResponsesDeadline',
        value: moment(data).valueOf().toString(),
      });
    },
    saveDefinitiveRfpTermsPublishingAdministrativeActPublishingAndRelease(data) {
      this.setScheduleDate({
        property: 'definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease',
        value: moment(data).valueOf().toString(),
      });
    },
    saveRiskAssignationHearing(data) {
      this.setScheduleDate({
        property: 'riskAssignationHearing',
        value: moment(data).valueOf().toString(),
      });
    },
    saveFinalRfpObservationsDeadline(data) {
      this.setScheduleDate({
        property: 'finalRfpObservationsDeadline',
        value: moment(data).valueOf().toString(),
      });
    },
    saveFinalRfpObservationsResponsesDeadline(data) {
      this.setScheduleDate({
        property: 'finalRfpObservationsResponsesDeadline',
        value: moment(data).valueOf().toString(),
      });
    },
    saveAddendumIssuingDeadline(data) {
      this.setScheduleDate({
        property: 'addendumIssuingDeadline',
        value: moment(data).valueOf().toString(),
      });
    },
    saveBidOfferingsClosed(data) {
      this.setScheduleDate({
        property: 'bidOfferingsClosed',
        value: moment(data).valueOf().toString(),
      });
    },
    saveBidsOpening(data) {
      this.setScheduleDate({
        property: 'bidsOpening',
        value: moment(data).valueOf().toString(),
      });
    },
    saveBidOfferingReport(data) {
      this.setScheduleDate({
        property: 'bidOfferingReport',
        value: moment(data).valueOf().toString(),
      });
    },
    saveBidOfferingReportPublishing(data) {
      this.setScheduleDate({
        property: 'bidOfferingReportPublishing',
        value: moment(data).valueOf().toString(),
      });
    },
    saveObservationsOnEvaluationOrVerificationReport(data) {
      this.setScheduleDate({
        property: 'observationsOnEvaluationOrVerificationReport',
        value: moment(data).valueOf().toString(),
      });
    },
    saveAdjudicationHearingAdministrativeActPublishing(data) {
      this.setScheduleDate({
        property: 'adjudicationHearingAdministrativeActPublishing',
        value: moment(data).valueOf().toString(),
      });
    },
    saveContractSign(data) {
      this.setScheduleDate({
        property: 'contractSign',
        value: moment(data).valueOf().toString(),
      });
    },
    saveBidValidWarranties(data) {
      this.setScheduleDate({
        property: 'bidValidWarranties',
        value: moment(data).valueOf().toString(),
      });
    },
    saveDuration(data) {
      this.setScheduleDate({
        property: 'duration',
        value: moment(data).valueOf().toString(),
      });
    },
    saveDurationType(data) {
      this.setScheduleDate({
        property: 'durationType',
        value: moment(data).valueOf().toString(),
      });
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
    saveMipymes(data) {
      const { mipymes, ...rest } = this.tender;
      this.setTender({ mipymes: data, ...rest });
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
    saveDefineLots(data) {
      const { defineLots, ...rest } = this.tender;
      this.setTender({ defineLots: data, ...rest });
    },
    saveDefinePriceBoundariesPerLot(data) {
      const { definePriceBoundariesPerLot, ...rest } = this.tender;
      this.setTender({ definePriceBoundariesPerLot: data, ...rest });
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
    saveDefineAdvancedSettings(data) {
      const { defineAdvancedSettings, ...rest } = this.tender;
      this.setTender({ defineAdvancedSettings: data, ...rest });
    },
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      schedule: state => state.Tender.tender.schedule,
    }),
  },
};
</script>
