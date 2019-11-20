<template>
  <div>
    <div class="row tender-form-head">
      <div class="col">
        <ul class="nav nav-tabs separated">
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'generalInfo'}"
                    @click="active = 'generalInfo'">
              Información general
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'schedule'}"
                    @click="active = 'schedule'">
              Cronograma
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'questionnaire'}"
                    @click="active = 'questionnaire'">
              Cuestionario
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'lot'}"
                    @click="active = 'lot'">
              Lotes
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'documents'}"
                    @click="active = 'documents'">
              Documentos
            </button>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <button class="btn btn-secondary" @click="saveTenderDraft">
          Guardar
        </button>
        <button class="btn btn-secondary" @click="sendTenderToSecop">
          SECOP
        </button>
      </div>
    </div>
    <div class="tender-form-content">
      <general-info v-if="active === 'generalInfo'"/>
      <schedule v-else-if="active === 'schedule'"/>
      <questionnaire v-else-if="active === 'questionnaire'"/>
      <lot v-else-if="active === 'lot'"/>
      <documents v-else-if="active === 'documents'"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

import GeneralInfo from '@/components/tender/form/GeneralInfo';
import Schedule from '@/components/tender/form/Schedule';
import Questionnaire from '@/components/tender/form/Questionnaire';
import Lot from '@/components/tender/form/Lot';
import Documents from '@/components/tender/form/Documents';
import Secop from '@/helpers/secop';
import { log, error } from 'electron-log';

export default {
  name: 'TenderForm',
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      active: 'generalInfo',
    };
  },
  components: {
    GeneralInfo,
    Schedule,
    Questionnaire,
    Lot,
    Documents,
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      tenders: state => state.Tender.tenders,
    }),
  },
  methods: {
    ...mapActions({
      createTender: constants.TENDER_SAVE_DRAFT,
      saveTender: constants.TENDER_UPDATE_DRAFT,
      setTender: constants.TENDER_SET_TENDER,
    }),
    sendTenderToSecop() {
      const input = {
        BuyerDossierData: {
          AcquisitionFromAnnualPurchasingPlan: true,
          AdditionalCategory: {
            NewEntities: {
              Items: {
                AdditionalCategorizationExternalIntegrationCreate: [
                  {
                    MainCategory: {
                      Code: '50192700',
                      Norm: 'UNSPSC',
                      targetNSAlias: 'tns',
                      targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                    },
                  },
                  {
                    MainCategory: {
                      Code: '50193000',
                      Norm: 'UNSPSC',
                      targetNSAlias: 'tns',
                      targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                    },
                  },
                  {
                    MainCategory: {
                      Code: '78131800',
                      Norm: 'UNSPSC',
                      targetNSAlias: 'tns',
                      targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                    },
                  },
                ],
                targetNSAlias: 'q7',
                targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
              },
              targetNSAlias: 'tns',
              targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          Category: {
            Code: '39121000',
            Norm: 'UNSPSC',
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          CommercialAgreement: false,
          Description: 'Prestación de servicios para la atención alimentaria a población escolar',
          Duration: 90,
          DurationType: 'Days',
          EstimatedValue: 49145656234,
          EstimatedValueCurrency: 'COP',
          IsEstimatedValueExact: true,
          IsRelatedToBuyerDossier: false,
          JustificationTypeOfContractCode: 'Law1150of2007',
          Location: {
            LocationCode: 'CO-ANT-05001',
            StreetAddress: 'Calle 44 Número 52-165 Centro Administrativo Municipal Medellín Antioquia COLOMBIA',
            ZipCode: '050015',
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          Name: 'Prestación de servicios para la atención alimentaria a población escolar',
          OperationReference: '21221',
          Reference: '7000_19_11_19',
          SameAddressOfOperation: false,
          TypeOfContractCode: 'ServicesProvisioning',
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        EProcurementProfileIdentifier: 'CCE-02-Licitacion_Publica',
        ProcedureRequestData: {
          AllowVisitsToThePlaceOfWork: false,
          Dates: {
            NewEntities: {
              Items: {
                DateExternalIntegrationCreate: [
                  {
                    DateUniqueIdentifier: 'LegalAnnouncementPublishingDate',
                    Value: '2019-12-24T04:40:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'PublicAnnouncementPublishingDate',
                    Value: '2019-12-24T04:41:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DraftDocumentsPublishingDate',
                    Value: '2019-12-24T04:42:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DeadlineToSubmitClarificationsAboutReplies',
                    Value: '2019-12-24T04:43:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DeadlineToRequireSMELimitation',
                    Value: '2019-12-24T04:44:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DeadlineToReplyClarificationsAboutDraftSpecifications',
                    Value: '2019-12-24T04:45:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'FinalSpecificationsPublishingDateEstimate',
                    Value: '2019-12-24T04:46:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'OfficialStartDateForSelectionProcess',
                    Value: '2019-12-24T04:47:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'RiskAssessmentMeetingDate',
                    Value: '2019-12-24T04:48:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'Deadline2SubmitClarificationsAboutFinalSpecs',
                    Value: '2019-12-24T04:49:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'Deadline2ReplyClarificationsAboutFinalSpecs',
                    Value: '2019-12-24T04:50:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DeadlineToMakeAmendments',
                    Value: '2019-12-24T04:51:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DueDateForReceivingReplies',
                    Value: '2019-12-24T04:52:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'OpeningRepliesDate',
                    Value: '2019-12-24T04:53:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'RepliesListPublishingDate',
                    Value: '2019-12-24T04:54:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'EvaluationReportPublishingDate',
                    Value: '2019-12-24T04:55:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'DeadlineToSubmitObjectionsToEvaluationReport',
                    Value: '2019-12-24T04:56:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'AwardDecisionMeetingDate',
                    Value: '2019-12-24T04:57:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'AwardDecisioPublishingDate',
                    Value: '2019-12-24T04:58:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'ContractSignatureDate',
                    Value: '2019-12-24T04:59:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    DateUniqueIdentifier: 'ContractWarrantyDeliveryDate',
                    Value: '2019-12-24T05:00:00',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                ],
                targetNSAlias: 'q12',
                targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
              },
              targetNSAlias: 'tns',
              targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          DefineAdvancedSettings: false,
          DefineLots: true,
          DefinePriceBoundariesPerLot: true,
          Description: 'Descripción en la sección de lotes, donde acabo?',
          Evaluation: {
            DefineEvaluation: true,
            DefinitionType: 'MostEconomicallyAdvantageousTender',
            EvaluationMethod: 'Automatic_Semi_Automatic',
            PublishEvaluationSystemToBidders: true,
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          FinancialSettings: {
            CivilLiability: true,
            CivilLiabilityMinWages: 0,
            CivilLiabilityMinWagesCheck: false,
            CivilLiabilityPercentage: 5,
            CivilLiabilityPercentageCheck: true,
            CivilLiabilityValue: 500,
            CivilLiabilityValueCheck: false,
            Compliance: true,
            ComplianceContract: true,
            ComplianceContractEndDate: '2019-12-24T05:01:00',
            ComplianceContractPercentage: 10,
            ComplianceContractStartDate: '2019-12-24T05:00:00',
            ComplianceGoodsEndDate: '2019-12-24T05:03:00',
            ComplianceGoodsPercentage: 10,
            ComplianceGoodsQuality: true,
            ComplianceGoodsStartDate: '2019-12-24T05:02:00',
            ComplianceWages: true,
            ComplianceWagesEndDate: '2019-12-24T05:05:00',
            ComplianceWagesPercentage: 5,
            ComplianceWagesStartDate: '2019-12-24T05:04:00',
            DefinePaymentPlan: false,
            Seriousness: true,
            SeriousnessMinWages: 100,
            SeriousnessMinWagesCheck: false,
            SeriousnessPercentage: 10,
            SeriousnessPercentageCheck: true,
            Warranties: true,
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          LimitRepliesToSmallCompanies: false,
          Lots: {
            NewEntities: {
              Items: {
                LotExternalIntegrationCreate: [
                  {
                    BasePrice: 100,
                    Description: 'Descripción del lote 1',
                    LotNumber: 1,
                    Name: 'Lote 1',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    BasePrice: 200,
                    Description: 'Descripción del lote 3',
                    LotNumber: 2,
                    Name: 'Lote 2',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                  {
                    BasePrice: 300,
                    Description: 'Descripción del lote 3',
                    LotNumber: 3,
                    Name: 'Lote 3',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                ],
                targetNSAlias: 'q16',
                targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
              },
              targetNSAlias: 'tns',
              targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          Questionnaires: {
            NewEntities: {
              Items: {
                QuestionnaireExternalIntegrationCreate: [
                  {
                    Questions: {
                      NewEntities: {
                        Items: {
                          QuestionExternalIntegrationCreate: [
                            {
                              IsMandatoryQuestion: true,
                              QuestionContent: 'Adjunte Carta de presentación debidamente diligenciado, de acuerdo al anexo, encontrado en el documento adicional de los documentos del proceso',
                              QuestionType: 'SingleAttachmentQuestion',
                              targetNSAlias: 'tns',
                              targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                            },
                            {
                              AnswerMaxLength: 100,
                              IsMandatoryQuestion: true,
                              LotNumber: 2,
                              QuestionContent: 'What is your name?',
                              QuestionType: 'SingleOpenQuestion',
                              RequiresEvidence: false,
                              SingleLineAnswer: true,
                              targetNSAlias: 'tns',
                              targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                            },
                            {
                              IsMandatoryQuestion: true,
                              LotNumber: 2,
                              QuestionContent: 'What is your age?',
                              QuestionType: 'SingleNumberQuestion',
                              targetNSAlias: 'tns',
                              targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                            },
                            {
                              AddExtraSpecification: false,
                              AllLinesAreMandatory: true,
                              DefineSpecificCategory: true,
                              HelpText: 'Question 111',
                              IsMandatoryQuestion: true,
                              Lines: {
                                NewEntities: {
                                  Items: {
                                    LineQuestionExternalIntegrationCreate: [
                                      {
                                        CategoryCode: '22101600',
                                        CeilingPrice: 50,
                                        CostPrice: 5,
                                        Description: 'Mouses',
                                        LineType: 'Item',
                                        Quantity: 20,
                                        Reference: 'Mous',
                                        Unit: 'NXTWY.UMT.3',
                                        targetNSAlias: 'tns',
                                        targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                                      },
                                    ],
                                  },
                                  targetNSAlias: 'tns',
                                  targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
                                },
                              },
                              LotNumber: 1,
                              PriceListScreenConfiguration: 'BasePriceUNSPSCCfg',
                              QuestionType: 'PriceListQuestion',
                              RequiresEvidence: false,
                              targetNSAlias: 'tns',
                              targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                            },
                          ],
                          targetNSAlias: 'q20',
                          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                        },
                        targetNSAlias: 'tns',
                        targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
                      },
                      targetNSAlias: 'tns',
                      targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                    },
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                ],
                targetNSAlias: 'q19',
                targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
              },
              targetNSAlias: 'tns',
              targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
          SIIFIntegration: {
            BudgetOrigin: 'OwnResources',
            ExpenseType: 'Investment',
            RegisteredInSIIF: false,
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
          },
        },
        ProcedureTeamIntegrationUniqueIdentifier: 'CO1.PROC_TEAM.28701',
      };
      const urlProcess = 'https://marketplace-formacion.secop.gov.co/CO1ExternalIntegrationPublicServicesConnect/Connect/ConnectPublicService.svc?wsdl';
      // const urlDocuments = 'https://marketplace-formacion.secop.gov.co/CO1ExternalIntegrationPublicServicesConnect/ConnectFiles/ConnectFilesPublicService.svc?wsdl';
      const secop = new Secop(urlProcess, '700043011_190812102806', 'PJC!J;B{pg');
      secop.sendProcess(input) // 'CO1.DOC.188059'
        .then(result => log(`Result ---> ${JSON.stringify(result)}`))
        .catch(err => error(`Could not download document ${JSON.stringify(err)}`));
    },
    saveTenderDraft() {
      this.saveTender(this.tender);
    },
  },
  created() {
    if (!this.id) {
      this.createTender();
    }
    // eslint-disable-next-line no-underscore-dangle
    const [tenderToLoad] = this.tenders.filter(t => t._id === this.id);
    this.setTender(tenderToLoad);
  },
};
</script>
