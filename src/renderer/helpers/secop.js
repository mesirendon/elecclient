import soap from 'soap-as-promised';
import moment from 'moment';
// import xml2js from 'xml2js';
// import * as constants from '@/store/constants';

// const parser = new xml2js.Parser();
const headers = {
  'con:Info': {
    'vor:CompanyCode': '700043011',
    'vor:UserCode': '2068013',
  },
};

export default class Secop {
  constructor(url, user, password) {
    this.user = user;
    this.password = password;
    this.eventualClient = soap.createClient(url);
  }
  autenticate() {
    return new Promise((resolve, reject) => {
      this.eventualClient
        .then((client) => {
          const wsSecurity = new soap.WSSecurity(this.user, this.password, { mustUnderstand: '1' });
          client.setSecurity(wsSecurity);
          client.addSoapHeader(headers, '', '', '');
          client.wsdl.definitions.xmlns.con = 'http://www.nextway.pt/externalintegration/ConnectFiles';
          client.wsdl.definitions.xmlns.vor = 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA';
          // eslint-disable-next-line no-underscore-dangle
          client.wsdl.xmlnsInEnvelope = client.wsdl._xmlnsMap();
          resolve();
        })
        .catch(reject);
    });
  }
  sendProcess(process) {
    return new Promise((resolve, reject) => {
      this.autenticate()
        .then(() => this.eventualClient)
        .then(client => client.CreateProcedure(process))
        .then(resolve)
        .catch(reject);
    });
  }
  downloadDocument(docId) {
    return new Promise((resolve, reject) => {
      this.autenticate()
        .then(() => this.eventualClient)
        .then(client => client.DownloadDocument({ DocumentUniqueIdentifier: docId }))
        .then(resolve)
        .catch(reject);
    });
  }
  static translate() {
    // const tenderBaseTenderConstant = constants.TENDER_BASE_TENDER;
    return {
      'con:BuyerDossierData': {
        'con:AcquisitionFromAnnualPurchasingPlan': true,
        'con:AdditionalCategory': {
          'vor:NewEntities': {
            'vor:Items': {
              'con:AdditionalCategorizationExternalIntegrationCreate': [
                {
                  'con:MainCategory': {
                    'con:Code': '50192700',
                    'con:Norm': 'UNSPSC',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                },
                {
                  'con:MainCategory': {
                    'con:Code': '50193000',
                    'con:Norm': 'UNSPSC',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                },
                {
                  'con:MainCategory': {
                    'con:Code': '78131800',
                    'con:Norm': 'UNSPSC',
                    targetNSAlias: 'tns',
                    targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                  },
                },
              ],
              targetNSAlias: 'q7',
              targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary',
          },
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        'con:Category': {
          'con:Code': '39121000',
          'con:Norm': 'UNSPSC',
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        'con:CommercialAgreement': false,
        'con:Description': 'Prestación de servicios para la atención alimentaria a población escolar',
        'con:Duration': 90,
        'con:DurationType': 'Days',
        'con:EstimatedValue': 49145656234,
        'con:EstimatedValueCurrency': 'COP',
        'con:IsEstimatedValueExact': true,
        'con:IsRelatedToBuyerDossier': false,
        'con:JustificationTypeOfContractCode': 'Law1150of2007',
        'con:Location': {
          'con:LocationCode': 'CO-ANT-05001',
          'con:StreetAddress': 'Calle 44 Número 52-165 Centro Administrativo Municipal Medellín Antioquia COLOMBIA',
          'con:ZipCode': '050015',
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        'con:Name': 'Prestación de servicios para la atención alimentaria a población escolar',
        'con:OperationReference': '21221',
        'con:Reference': `7000_19_11_20_${moment()}`,
        'con:SameAddressOfOperation': false,
        'con:TypeOfContractCode': 'ServicesProvisioning',
        targetNSAlias: 'tns',
        targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
      },
      'con:EProcurementProfileIdentifier': 'CCE-02-Licitacion_Publica',
      'con:ProcedureRequestData': {
        'con:AllowVisitsToThePlaceOfWork': false,
        'con:BidMaintenanceTerm': 30,
        'con:BidMaintenanceTermType': 'Days',
        'con:Dates': {
          'vor:NewEntities': {
            'vor:Items': {
              'con:DateExternalIntegrationCreate': [
                {
                  'con:DateUniqueIdentifier': 'LegalAnnouncementPublishingDate',
                  'con:Value': '2019-12-24T04:40:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'PublicAnnouncementPublishingDate',
                  'con:Value': '2019-12-24T04:41:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DraftDocumentsPublishingDate',
                  'con:Value': '2019-12-24T04:42:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DeadlineToSubmitClarificationsAboutReplies',
                  'con:Value': '2019-12-24T04:43:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DeadlineToRequireSMELimitation',
                  'con:Value': '2019-12-24T04:44:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DeadlineToReplyClarificationsAboutDraftSpecifications',
                  'con:Value': '2019-12-24T04:45:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'FinalSpecificationsPublishingDateEstimate',
                  'con:Value': '2019-12-24T04:46:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'OfficialStartDateForSelectionProcess',
                  'con:Value': '2019-12-24T04:47:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'RiskAssessmentMeetingDate',
                  'con:Value': '2019-12-24T04:48:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'Deadline2SubmitClarificationsAboutFinalSpecs',
                  'con:Value': '2019-12-24T04:49:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'Deadline2ReplyClarificationsAboutFinalSpecs',
                  'con:Value': '2019-12-24T04:50:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DeadlineToMakeAmendments',
                  'con:Value': '2019-12-24T04:51:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DueDateForReceivingReplies',
                  'con:Value': '2019-12-24T04:52:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'OpeningRepliesDate',
                  'con:Value': '2019-12-24T04:53:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'RepliesListPublishingDate',
                  'con:Value': '2019-12-24T04:54:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'EvaluationReportPublishingDate',
                  'con:Value': '2019-12-24T04:55:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'DeadlineToSubmitObjectionsToEvaluationReport',
                  'con:Value': '2019-12-24T04:56:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'AwardDecisionMeetingDate',
                  'con:Value': '2019-12-24T04:57:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'AwardDecisioPublishingDate',
                  'con:Value': '2019-12-24T04:58:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'ContractSignatureDate',
                  'con:Value': '2019-12-24T04:59:00',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:DateUniqueIdentifier': 'ContractWarrantyDeliveryDate',
                  'con:Value': '2019-12-24T05:00:00',
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
        'con:DefineAdvancedSettings': false,
        'con:DefineLots': true,
        'con:DefinePriceBoundariesPerLot': true,
        'con:Evaluation': {
          'con:DefineEvaluation': true,
          'con:DefinitionType': 'MostEconomicallyAdvantageousTender',
          'con:EvaluationMethod': 'Automatic_Semi_Automatic',
          'con:PublishEvaluationSystemToBidders': true,
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        'con:FinancialSettings': {
          'con:CivilLiability': true,
          'con:CivilLiabilityMinWages': 0,
          'con:CivilLiabilityMinWagesCheck': false,
          'con:CivilLiabilityPercentage': 5,
          'con:CivilLiabilityPercentageCheck': true,
          'con:CivilLiabilityValue': 500,
          'con:CivilLiabilityValueCheck': false,
          'con:Compliance': true,
          'con:ComplianceContract': true,
          'con:ComplianceContractEndDate': '2019-12-24T05:01:00',
          'con:ComplianceContractPercentage': 10,
          'con:ComplianceContractStartDate': '2019-12-24T05:00:00',
          'con:ComplianceGoodsEndDate': '2019-12-24T05:03:00',
          'con:ComplianceGoodsPercentage': 10,
          'con:ComplianceGoodsQuality': true,
          'con:ComplianceGoodsStartDate': '2019-12-24T05:02:00',
          'con:ComplianceWages': true,
          'con:ComplianceWagesEndDate': '2019-12-24T05:05:00',
          'con:ComplianceWagesPercentage': 5,
          'con:ComplianceWagesStartDate': '2019-12-24T05:04:00',
          'con:DefinePaymentPlan': false,
          'con:Seriousness': true,
          'con:SeriousnessMinWages': 100,
          'con:SeriousnessMinWagesCheck': false,
          'con:SeriousnessPercentage': 10,
          'con:SeriousnessPercentageCheck': true,
          'con:Warranties': true,
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        'con:LimitRepliesToSmallCompanies': false,
        'con:Lots': {
          'vor:NewEntities': {
            'vor:Items': {
              'con:LotExternalIntegrationCreate': [
                {
                  'con:BasePrice': 100,
                  'con:LotNumber': 1,
                  'con:Name': 'Lote 1',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:BasePrice': 200,
                  'con:LotNumber': 2,
                  'con:Name': 'Lote 2',
                  targetNSAlias: 'tns',
                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                },
                {
                  'con:BasePrice': 300,
                  'con:LotNumber': 3,
                  'con:Name': 'Lote 3',
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
        'con:Questionnaires': {
          'vor:NewEntities': {
            'vor:Items': {
              'con:QuestionnaireExternalIntegrationCreate': [
                {
                  'con:Questions': {
                    'vor:NewEntities': {
                      'vor:Items': {
                        'con:QuestionExternalIntegrationCreate': [
                          {
                            'con:IsMandatoryQuestion': true,
                            'con:QuestionContent': 'Adjunte Carta de presentación debidamente diligenciado, de acuerdo al anexo, encontrado en el documento adicional de los documentos del proceso',
                            'con:QuestionType': 'SingleAttachmentQuestion',
                            targetNSAlias: 'tns',
                            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                          },
                          {
                            'con:AnswerMaxLength': 100,
                            'con:IsMandatoryQuestion': true,
                            'con:LotNumber': 2,
                            'con:QuestionContent': 'What is your name?',
                            'con:QuestionType': 'SingleOpenQuestion',
                            'con:RequiresEvidence': false,
                            'con:SingleLineAnswer': true,
                            targetNSAlias: 'tns',
                            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                          },
                          {
                            'con:IsMandatoryQuestion': true,
                            'con:LotNumber': 2,
                            'con:QuestionContent': 'What is your age?',
                            'con:QuestionType': 'SingleNumberQuestion',
                            targetNSAlias: 'tns',
                            targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                          },
                          {
                            'con:AddExtraSpecification': false,
                            'con:AllLinesAreMandatory': true,
                            'con:DefineSpecificCategory': true,
                            'con:HelpText': 'Question 111',
                            'con:IsMandatoryQuestion': true,
                            'con:Lines': {
                              'vor:NewEntities': {
                                'vor:Items': {
                                  'con:LineQuestionExternalIntegrationCreate': [
                                    {
                                      'con:CategoryCode': '22101600',
                                      'con:CeilingPrice': 50,
                                      'con:CostPrice': 5,
                                      'con:Description': 'Mouses',
                                      'con:LineType': 'Item',
                                      'con:Quantity': 20,
                                      'con:Reference': 'Mous',
                                      'con:Unit': 'NXTWY.UMT.3',
                                      targetNSAlias: 'tns',
                                      targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                                    },
                                  ],
                                  targetNSAlias: 'q21',
                                  targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                                },
                                targetNSAlias: 'tns',
                                targetNamespace: 'http://schemas.datacontract.org/2004/07/Vortal.CommonLibrary.SOA',
                              },
                              targetNSAlias: 'tns',
                              targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
                            },
                            'con:LotNumber': 1,
                            'con:PriceListScreenConfiguration': 'BasePriceUNSPSCCfg',
                            'con:QuestionType': 'PriceListQuestion',
                            'con:RequiresEvidence': false,
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
        'con:SIIFIntegration': {
          'con:BudgetOrigin': 'OwnResources',
          'con:ExpenseType': 'Investment',
          'con:RegisteredInSIIF': false,
          targetNSAlias: 'tns',
          targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
        },
        targetNSAlias: 'tns',
        targetNamespace: 'http://www.nextway.pt/externalintegration/Connect',
      },
      'con:ProcedureTeamIntegrationUniqueIdentifier': 'CO1.PROC_TEAM.28701',
    };
  }
}
