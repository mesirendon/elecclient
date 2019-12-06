<template>
  <div>
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
                :answer="schedule.rfpObservationDeadline"
                @change="setScheduleDate({property: 'rfpObservationDeadline', value: $event})"/>
      <question text="Respuesta a las observaciones al pliego de condiciones y publicación"
                :type="dataTypes.DATE" :answer="schedule.rfpObservationResponsesDeadline"
                @change="setScheduleDate({property: 'rfpObservationResponsesDeadline', value: $event})"/>
      <question
              text="Fecha de presentación del pliego definitivo. Expedición y publicación de acto administrativo de apertira del proceso de selección"
              :type="dataTypes.DATE"
              :answer="schedule.definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease"
              @change="setScheduleDate({property: 'definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease', value: $event})"/>
      <question text="Audiencia de asignación de riesgos" :type="dataTypes.DATE"
                :answer="schedule.riskAssignationHearing"
                @change="setScheduleDate({property: 'riskAssignationHearing', value: $event})"/>
      <question text="Presentar observaciones al pliego de condiciones definitivo"
                :type="dataTypes.DATE" :answer="schedule.finalRfpObservationsDeadline"
                @change="setScheduleDate({property: 'finalRfpObservationsDeadline', value: $event})"/>
      <question text="Respuesta observaciones al pliego de condiciones definitivo"
                :type="dataTypes.DATE" :answer="schedule.finalRfpObservationsResponsesDeadline"
                @change="setScheduleDate({property: 'finalRfpObservationsResponsesDeadline', value: $event})"/>
      <question text="Plazo máximo para expedir adendas" :type="dataTypes.DATE"
                :answer="schedule.addendumIssuingDeadline"
                @change="setScheduleDate({property: 'addendumIssuingDeadline', value: $event})"/>
      <question text="Cierre de presentación de ofertas" :type="dataTypes.DATE"
                :answer="schedule.bidOfferingsClosed"
                @change="setScheduleDate({property: 'bidOfferingsClosed', value: $event})"/>
      <div class="blueish">
        <question text="Apertura de ofertas" :type="dataTypes.DATE" :answer="schedule.bidsOpening"
                  @change="setScheduleDate({property: 'bidsOpening', value: $event})"/>
      </div>
      <div class="blueish">
        <question text="Informe de presentación de ofertas" :type="dataTypes.DATE"
                  :answer="schedule.bidOfferingReport"
                  @change="setScheduleDate({property: 'bidOfferingReport', value: $event})"/>
      </div>
      <question text="Publicación del informe de evaluación de ofertas" :type="dataTypes.DATE"
                :answer="schedule.bidOfferingReportPublishing"
                @change="setScheduleDate({property: 'bidOfferingReportPublishing', value: $event})"/>
      <question text="Observaciones del informe de evaluación de ofertas" :type="dataTypes.DATE"
                :answer="schedule.observationsOnEvaluationOrVerificationReport"
                @change="setScheduleDate({property: 'observationsOnEvaluationOrVerificationReport', value: $event})"/>
      <question
              text="Audiencia de adjudicación y publicación de acto administrativo de adjudicación"
              :type="dataTypes.DATE"
              :answer="schedule.adjudicationHearingAdministrativeActPublishing"
              @change="setScheduleDate({property: 'adjudicationHearingAdministrativeActPublishing', value: $event})"/>
      <question text="Firma del contrato" :type="dataTypes.DATE" :answer="schedule.contractSign"
                @change="setScheduleDate({property: 'contractSign', value: $event})"/>
      <question text="Entrega de garantías de ejecución de contrato" :type="dataTypes.DATE"
                :answer="schedule.bidValidWarranties"
                @change="setScheduleDate({property: 'bidValidWarranties', value: $event})"/>
      <div class="form-group blueish">
        <question class="dateSelector" text="Plazo de validez de las ofertas"
                  :type="dataTypes.TEXT" :list="duration"
                  :answer="schedule.bidMaintenanceTerm"
                  @change="setScheduleDate({property: 'bidMaintenanceTerm', value: $event})"/>
        <question class="dateSelector" text="Periodo"
                  :type="dataTypes.DROPDOWN" :list="duration"
                  :answer="schedule.bidMaintenanceTermType"
                  @change="setScheduleDate({property: 'bidMaintenanceTermType', value: $event})"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapMutations, mapState } from 'vuex';
import * as constants from '@/store/constants';
import duration from '@/helpers/duration';

import Question from '@/components/common/form/Question';

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
        value: data,
      });
      this.setScheduleDate({
        property: 'rfpObservationDeadline',
        value: moment.unix(data)
          .add(10, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'rfpObservationResponsesDeadline',
        value: moment.unix(data)
          .add(15, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease',
        value: moment.unix(data)
          .add(15, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'riskAssignationHearing',
        value: moment.unix(data)
          .add(15, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'finalRfpObservationsDeadline',
        value: moment.unix(data)
          .add(16, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'finalRfpObservationsResponsesDeadline',
        value: moment.unix(data)
          .add(21, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'addendumIssuingDeadline',
        value: moment.unix(data)
          .add(25, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'bidOfferingsClosed',
        value: moment.unix(data)
          .add(25, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'bidsOpening',
        value: moment.unix(data)
          .add(25, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'bidOfferingReport',
        value: moment.unix(data)
          .add(25, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'bidOfferingReportPublishing',
        value: moment.unix(data)
          .add(30, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'observationsOnEvaluationOrVerificationReport',
        value: moment.unix(data)
          .add(35, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'adjudicationHearingAdministrativeActPublishing',
        value: moment.unix(data)
          .add(36, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'contractSign',
        value: moment.unix(data)
          .add(37, 'days')
          .format('X'),
      });
      this.setScheduleDate({
        property: 'bidValidWarranties',
        value: moment.unix(data)
          .add(38, 'days')
          .format('X'),
      });
      this.$emit('change');
      this.$router.push({
        name: 'redirect',
        params: {
          name: 'tender',
          delay: 0,
        },
        query: {
          address: this.address,
          tag: constants.TENDER_FORM_TAGS.SCHEDULE,
        },
      });
    },
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line no-underscore-dangle
      address: state => state.Tender.tender._id,
      schedule: state => state.Tender.tender.schedule,
    }),
  },
};
</script>
