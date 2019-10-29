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
      <div class="form-group row">
        <label class="col-form-label col-6" for="date1">Publicación del aviso, convocatoria y estudios previos</label>
        <div class="md-form col-3">
          <input type="date" id="date1" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-form-label col-6" for="date2">Presentar observaciones al pliego de condiciones</label>
        <div class="md-form col-3">
          <input type="date" id="date2" class="form-control">
        </div>
        <p class="col-3">mínimo 10 días hábiles</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date3">Respuesta a las observaciones al pliego de condiciones y publicación</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date3" class="form-control">
          </div>
        </div>
        <p class="col-3">3 a 5 días hábiles</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date4">Fecha de presentación del pliego definitivo. Expedición y publicación de acto administrativo de apertira del proceso de selección</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date4" class="form-control">
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date5">Audiencia de asignación de riesgos</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date5" class="form-control">
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date6">Presentar observaciones al pliego de condiciones definitivo</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date6" class="form-control">
          </div>
        </div>
        <p class="col-3">1 día hábil</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date7">Respuesta observaciones al pliego de condiciones definitivo</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date7" class="form-control">
          </div>
        </div>
        <p class="col-3">3 a 5 días hábiles</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date8">Plazo máximo para expedir adendas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date8" class="form-control">
          </div>
        </div>
        <p class="col-3">3 días hábiles antes de las 7 p.m.</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date9">Cierre de presentación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date9" class="form-control">
          </div>
        </div>
        <p class="col-3">definir fecha y hora</p>
      </div>
      <div class="form-group row blueish">
        <div class="col-6">
          <label for="date10">Apertura de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date10" class="form-control">
          </div>
        </div>
        <p class="col-3">misma fecha y hora</p>
      </div>
      <div class="form-group row blueish">
        <div class="col-6">
          <label for="date11">Informe de presentación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date11" class="form-control">
          </div>
        </div>
        <p class="col-3">30 min más porque tarda en desencriptar</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date12">Publicación del informe de evaluación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date12" class="form-control">
          </div>
        </div>
        <p class="col-3">5 días después</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date13">Observaciones del informe de evaluación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date13" class="form-control">
          </div>
        </div>
        <p class="col-3">5 días hábiles</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date14">Audiencia de adjudicación y publicación de acto administrativo de adjudicación</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date14" class="form-control">
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date15">Firma del contrato</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date15" class="form-control">
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date16">Entrega de garantías de ejecución de contrato</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date16" class="form-control">
          </div>
        </div>
      </div>
      <div class="form-group row blueish">
        <div class="col-6">
          <label for="date17">Plazo de validez de las ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date17" class="form-control">
          </div>
        </div>
        <p class="col-3">90 días siempre</p>
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
      <!-- TODO: CLICK TO ADD LOT NAME -->
      <label for="loteInput">Lotes</label>
      <input type="text" id="loteInput" class="form-control" placeholder="Lote 1">
    </div>

    <h3>Precios</h3>
    <question class="descriptor" text="Valor estimado" :type="dataTypes.TEXT" :answer="tender.basePrice" @change="saveBasePrice"/>

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
import { mapActions, mapState } from 'vuex';
import Question from '@/components/tender/form/Question';
import * as constants from '@/store/constants';
import expenseType from '@/helpers/expenseType';
import budgetOrigin from '@/helpers/budgetOrigin';

export default {
  name: 'Schedule',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      expenseType,
      budgetOrigin,
    };
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions({
      setTender: constants.TENDER_SET_TENDER,
    }),
    saveDefinePaymentPlan(paymentPlan) {
      const { definePaymentPlan, ...rest } = this.tender;
      this.setTender({ definePaymentPlan: paymentPlan, ...rest });
    },
    saveAdvancePayments(advancePayment) {
      const { advancePayments, ...rest } = this.tender;
      this.setTender({ advancePayments: advancePayment, ...rest });
    },
    saveWarranties(warranty) {
      const { warranties, ...rest } = this.tender;
      this.setTender({ warranties: warranty, ...rest });
    },
    saveMipymes(pyme) {
      const { mipymes, ...rest } = this.tender;
      this.setTender({ mipymes: pyme, ...rest });
    },
    saveAllowVisitsToThePlaceOfWork(visit) {
      const { allowVisitsToThePlaceOfWork, ...rest } = this.tender;
      this.setTender({ allowVisitsToThePlaceOfWork: visit, ...rest });
    },
    saveSeriousness(serious) {
      const { seriousness, ...rest } = this.tender;
      this.setTender({ seriousness: serious, ...rest });
    },
    saveCompliance(comp) {
      const { compliance, ...rest } = this.tender;
      this.setTender({ compliance: comp, ...rest });
    },
    saveCivilLiability(civil) {
      const { civilLiability, ...rest } = this.tender;
      this.setTender({ civilLiability: civil, ...rest });
    },
    saveDefineLots(lots) {
      const { defineLots, ...rest } = this.tender;
      this.setTender({ defineLots: lots, ...rest });
    },
    saveDefinePriceBoundariesPerLot(lotsPrice) {
      const { definePriceBoundariesPerLot, ...rest } = this.tender;
      this.setTender({ definePriceBoundariesPerLot: lotsPrice, ...rest });
    },
    saveBasePrice(baseP) {
      const { basePrice, ...rest } = this.tender;
      this.setTender({ basePrice: baseP, ...rest });
    },
    savePeaceAgreement(peace) {
      const { PeaceAgreement, ...rest } = this.tender;
      this.setTender({ PeaceAgreement: peace, ...rest });
    },
    saveExpenseType(expense) {
      const { expenseType, ...rest } = this.tender;
      this.setTender({ expenseType: expense, ...rest });
    },
    saveBudgetOrigin(budget) {
      const { budgetOrigin, ...rest } = this.tender;
      this.setTender({ budgetOrigin: budget, ...rest });
    },
    saveRegisteredInSIIF(SIIF) {
      const { registeredInSIIF, ...rest } = this.tender;
      this.setTender({ registeredInSIIF: SIIF, ...rest });
    },
    saveDefineAdvancedSettings(advance) {
      const { defineAdvancedSettings, ...rest } = this.tender;
      this.setTender({ defineAdvancedSettings: advance, ...rest });
    },
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
  },
};
</script>
