<template>
  <div>
    <div class="descriptor">
      <div class="row">
        <div class="col">
          <h3>{{section.name}}</h3>
        </div>
        <div class="col-3 text-right">
          <button class="btn btn-secondary btn-large" @click="$emit('deleteSection', idx)">
            Eliminar sección <i class="fas fa-minus-square"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <question text="Enlazar a lote" :type="dataTypes.DROPDOWN" :list="lots"
                    :answer="section.lot" @change="linkLot"/>
        </div>
      </div>
      <div v-for="(sectionQuestion, questionIdx) in section.questions"
           :key="`question-${idx}-${questionIdx}`">
        <div class="row align-items-center" v-if="section.questions.length">
          <div class="col">
            <p><strong>Pregunta</strong>: {{sectionQuestion.text}}</p>
            <p><strong>Tipo</strong>: {{userDefinedDataTypes[sectionQuestion.type]}}</p>
            <p><strong>Pregunta obligatoria</strong>: {{sectionQuestion.mandatory ? 'Sí' : 'No'}}
            </p>
            <p><strong>Peso</strong>: {{sectionQuestion.weight}}</p>
          </div>
          <div class="col-3 text-right">
            <button class="btn btn-secondary btn-large" @click="deleteQuestion(questionIdx)">
              Eliminar pregunta <i class="fas fa-minus-square"></i>
            </button>
          </div>
        </div>
        <hr>
      </div>
      <div class="row" v-if="questionType">
        <div class="col">
          <question id="question" text="Pregunta" :type="dataTypes.TEXT_AREA"
                    v-model="question.text"/>
          <question id="weight" text="Peso" :type="dataTypes.NUMBER" v-model="question.weight"/>
          <question id="mandatory" text="¿Es obligatoria la pregunta?" :type="dataTypes.BOOLEAN"
                    v-model="question.mandatory"/>
          <button class="btn btn-secondary btn-large" @click="addQuestion">
            Agregar pregunta <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="row" v-show="!questionType">
        <div class="col">
          <question id="questionType" v-model="questionType" text="Tipo de pregunta"
                    :type="dataTypes.DROPDOWN" :list="userDefinedDataTypes"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import * as constants from '@/store/constants';
import _ from 'lodash';

import Question from '@/components/common/form/Question';
import PriceList from '@/components/tender/form/PriceList';

export default {
  name: 'QuestionnaireSection',
  props: {
    idx: {
      type: Number,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      userDefinedDataTypes: constants.TENDER_BASE_USER_DEFINED_DATA_TYPES,
      questionType: null,
      question: { ...constants.TENDER_BASE_QUESTION },
    };
  },
  computed: {
    ...mapState({
      realLots: state => state.Tender.tender.lots.map((lot, idx) => ({
        code: idx,
        text: lot.name,
      })),
    }),
    lots() {
      return _.concat(
        {
          code: null,
          text: 'Todos los lotes',
        },
        this.realLots,
      );
    },
    baseQuestion() { return constants.TENDER_BASE_QUESTION; },
    baseListOption() { return constants.TENDER_BASE_LIST_OPTION; },
  },
  methods: {
    ...mapMutations({
      addQuestionToSection: constants.TENDER_ADD_QUESTION_TO_SECTION,
      deleteQuestionFromSection: constants.TENDER_DELETE_QUESTION_FROM_SECTION,
      linkLotToSection: constants.TENDER_LINK_LOT,
    }),
    addQuestion() {
      const { question } = this;
      question.type = this.questionType;
      this.addQuestionToSection({
        idx: this.idx,
        question,
      });
      this.question = { ...constants.TENDER_BASE_QUESTION };
      this.questionType = false;
    },
    deleteQuestion(questionIdx) {
      this.deleteQuestionFromSection({
        idx: this.idx,
        questionIdx,
      });
    },
    linkLot(lotIdx) {
      this.linkLotToSection({
        sectionIdx: this.idx,
        lotIdx,
      });
    },
  },
  components: {
    Question,
    PriceList,
  },
};
</script>
