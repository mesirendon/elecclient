import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', date => moment.unix(date)
  .format('YYYY-MM-DD'));
Vue.filter('idx', idx => idx + 1);
Vue.filter('price', price => price.toFixed(2)
  .replace(/\d(?=(\d{3})+\.)/g, '$&,'));
Vue.filter('scheduleNames', (key) => {
  switch (key) {
    case 'rfpPublishingAnnouncementStudies':
      return 'Publicación del aviso, convocatoria y estudios previos';
    case 'rfpObservationDeadline':
      return 'Presentar observaciones al pliego de condiciones';
    case 'rfpObservationResponsesDeadline':
      return 'Respuesta a las observaciones al pliego de condiciones y publicación';
    case 'definitiveRfpTermsPublishingAdministrativeActPublishingAndRelease':
      return 'Fecha de presentación del pliego definitivo. Expedición y publicación de acto administrativo de apertira del proceso de selección';
    case 'riskAssignationHearing':
      return 'Audiencia de asignación de riesgos';
    case 'finalRfpObservationsDeadline':
      return 'Presentar observaciones al pliego de condiciones definitivo';
    case 'finalRfpObservationsResponsesDeadline':
      return 'Respuesta observaciones al pliego de condiciones definitivo';
    case 'addendumIssuingDeadline':
      return 'Plazo máximo para expedir adendas';
    case 'bidOfferingsClosed':
      return 'Cierre de presentación de ofertas';
    case 'bidsOpening':
      return 'Apertura de ofertas';
    case 'bidOfferingReport':
      return 'Informe de presentación de ofertas';
    case 'bidOfferingReportPublishing':
      return 'Publicación del informe de evaluación de ofertas';
    case 'observationsOnEvaluationOrVerificationReport':
      return 'Observaciones del informe de evaluación de ofertas';
    case 'adjudicationHearingAdministrativeActPublishing':
      return 'Audiencia de adjudicación y publicación de acto administrativo de adjudicación';
    case 'contractSign':
      return 'Firma del contrato';
    case 'bidValidWarranties':
      return 'Entrega de garantías de ejecución de contrato';
    default:
      return '';
  }
});
Vue.filter('balance', balance => `${Vue.web3.utils.fromWei(balance)} ETH`);
