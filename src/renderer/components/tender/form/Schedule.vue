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
      <question text="Publicación del aviso, convocatoria y estudios previos" :type="dataTypes.DATE"
                :answer="schedule.rfpPublishingAnnouncementStudies"
                @change="saveRfpPublishingAnnouncementStudies"/>
      <question text="Presentar observaciones al pliego de condiciones" :type="dataTypes.DATE"
                :answer="schedule.rfpObservationDeadline" @change="saveRfpObservationDeadline"/>
      <question text="Respuesta a las observaciones al pliego de condiciones y publicación"
                :type="dataTypes.DATE" :answer="schedule.rfpObservationResponsesDeadline"
                @change="saveRfpObservationResponsesDeadline"/>
      <question
              text="Fecha de presentación del pliego definitivo. Expedición y publicación de acto administrativo de apertira del proceso de selección"
              :type="dataTypes.DATE"
              :answer="schedule.definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease"
              @change="saveDefinitiveRfpTermsPublishingAdministrativeActPublishingAndRelease"/>
      <question text="Audiencia de asignación de riesgos" :type="dataTypes.DATE"
                :answer="schedule.riskAssignationHearing" @change="saveRiskAssignationHearing"/>
      <question text="Presentar observaciones al pliego de condiciones definitivo"
                :type="dataTypes.DATE" :answer="schedule.finalRfpObservationsDeadline"
                @change="saveFinalRfpObservationsDeadline"/>
      <question text="Respuesta observaciones al pliego de condiciones definitivo"
                :type="dataTypes.DATE" :answer="schedule.finalRfpObservationsResponsesDeadline"
                @change="saveFinalRfpObservationsResponsesDeadline"/>
      <question text="Plazo máximo para expedir adendas" :type="dataTypes.DATE"
                :answer="schedule.addendumIssuingDeadline" @change="saveAddendumIssuingDeadline"/>
      <question text="Cierre de presentación de ofertas" :type="dataTypes.DATE"
                :answer="schedule.bidOfferingsClosed" @change="saveBidOfferingsClosed"/>
      <div class="blueish">
        <question text="Apertura de ofertas" :type="dataTypes.DATE" :answer="schedule.bidsOpening"
                  @change="saveBidsOpening"/>
      </div>
      <div class="blueish">
        <question text="Informe de presentación de ofertas" :type="dataTypes.DATE"
                  :answer="schedule.bidOfferingReport" @change="saveBidOfferingReport"/>
      </div>
      <question text="Publicación del informe de evaluación de ofertas" :type="dataTypes.DATE"
                :answer="schedule.bidOfferingReportPublishing"
                @change="saveBidOfferingReportPublishing"/>
      <question text="Observaciones del informe de evaluación de ofertas" :type="dataTypes.DATE"
                :answer="schedule.observationsOnEvaluationOrVerificationReport"
                @change="saveObservationsOnEvaluationOrVerificationReport"/>
      <question
              text="Audiencia de adjudicación y publicación de acto administrativo de adjudicación"
              :type="dataTypes.DATE"
              :answer="schedule.adjudicationHearingAdministrativeActPublishing"
              @change="saveAdjudicationHearingAdministrativeActPublishing"/>
      <question text="Firma del contrato" :type="dataTypes.DATE" :answer="schedule.contractSign"
                @change="saveContractSign"/>
      <question text="Entrega de garantías de ejecución de contrato" :type="dataTypes.DATE"
                :answer="schedule.bidValidWarranties" @change="saveBidValidWarranties"/>
      <div class="form-group blueish">
        <question class="dateSelector" text="Plazo de validez de las ofertas"
                  :type="dataTypes.TEXT_AND_DROPDOWN" :list="duration" :answer="schedule.duration"
                  :second-answer="schedule.durationType" @change="saveDuration"
                  @secondChange="saveDurationType"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapMutations, mapState } from 'vuex';
import * as constants from '@/store/constants';
import duration from '@/helpers/duration';

import Question from '@/components/tender/form/Question';

export default {
  name: 'Schedule',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
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
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveRfpObservationDeadline(data) {
      this.setScheduleDate({
        property: 'rfpObservationDeadline',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveRfpObservationResponsesDeadline(data) {
      this.setScheduleDate({
        property: 'rfpObservationResponsesDeadline',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveDefinitiveRfpTermsPublishingAdministrativeActPublishingAndRelease(data) {
      this.setScheduleDate({
        property: 'definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveRiskAssignationHearing(data) {
      this.setScheduleDate({
        property: 'riskAssignationHearing',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveFinalRfpObservationsDeadline(data) {
      this.setScheduleDate({
        property: 'finalRfpObservationsDeadline',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveFinalRfpObservationsResponsesDeadline(data) {
      this.setScheduleDate({
        property: 'finalRfpObservationsResponsesDeadline',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveAddendumIssuingDeadline(data) {
      this.setScheduleDate({
        property: 'addendumIssuingDeadline',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveBidOfferingsClosed(data) {
      this.setScheduleDate({
        property: 'bidOfferingsClosed',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveBidsOpening(data) {
      this.setScheduleDate({
        property: 'bidsOpening',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveBidOfferingReport(data) {
      this.setScheduleDate({
        property: 'bidOfferingReport',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveBidOfferingReportPublishing(data) {
      this.setScheduleDate({
        property: 'bidOfferingReportPublishing',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveObservationsOnEvaluationOrVerificationReport(data) {
      this.setScheduleDate({
        property: 'observationsOnEvaluationOrVerificationReport',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveAdjudicationHearingAdministrativeActPublishing(data) {
      this.setScheduleDate({
        property: 'adjudicationHearingAdministrativeActPublishing',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveContractSign(data) {
      this.setScheduleDate({
        property: 'contractSign',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveBidValidWarranties(data) {
      this.setScheduleDate({
        property: 'bidValidWarranties',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveDuration(data) {
      this.setScheduleDate({
        property: 'duration',
        value: moment(data)
          .valueOf()
          .toString(),
      });
    },
    saveDurationType(data) {
      this.setScheduleDate({
        property: 'durationType',
        value: moment(data)
          .valueOf()
          .toString(),
      });
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
